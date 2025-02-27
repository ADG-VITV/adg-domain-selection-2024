"use client";
import Loader from "@/app/components/Loader";
import NavBar from "@/app/components/NavBar";
import TextInput from "@/app/components/TextInput";
import { UserAuth } from "@/app/context/AuthContext";
import useCheckTest from "@/app/hooks/useCheckTest";
import { domainToName, domainToTaskLink } from "@/lib/data";
import {
  getSubmittedTechnicalDomains,
  getSubmittedManagementDomains,
  writeDataToDatabase,
} from "@/lib/functions";
import { Domain } from "@/lib/types";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  ListItem,
  OrderedList,
  Text,
  useToast,
  Box,
  Heading,
  Icon,
  VStack,
  Badge,
  Divider,
  useColorModeValue,
  keyframes,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { FaGithub, FaGoogleDrive, FaLink, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";

const getSubmissions = async (
  user: User,
  setDomainsToBeGrayed: Dispatch<SetStateAction<"loading" | Domain[]>>
) => {
  const technicalDomains = await getSubmittedTechnicalDomains(user);
  const managementDomains = await getSubmittedManagementDomains(user);
  const allSubmittedDomains = [...technicalDomains, ...managementDomains];
  setDomainsToBeGrayed(allSubmittedDomains);
};

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
  100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
`;

export default function DomainPage({ params }: { params: { domain: string } }) {
  const { user } = UserAuth();
  const router = useRouter();
  const domain = params.domain as Domain;
  // console.log( domain);
  const domainString = params.domain as string;


  const managementDomains = new Set(["editorial", "events", "finance"]);
  const technicalDomains = new Set(["android", "blockchain", "ios", "ml", "web", "design"]);

  const domainToPlatform = (domain: string) => {
    if (domain === "ios") {
      return "Google Drive or GitHub";
    }
    return managementDomains.has(domain) ? "Google Drive" : "GitHub";
  };

  const assignmentPlatform = domainToPlatform(domain);

  
  const [assignmentLink, setAssignmentLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [domainsToBeGrayed, setDomainsToBeGrayed] = useState<
    Domain[] | "loading"
  >("loading");
  const [linkError, setLinkError] = useState({ status: false, message: "" });
  const toast = useToast();

  // check for ongoing test
  // const { testStatus } = useCheckTest();
  // useEffect(() => {
  //   if (
  //     testStatus === "loading" ||
  //     testStatus === null ||
  //     testStatus.isTestCompleted
  //   )
  //     return;
  //   if (testStatus.isGivingTest) router.push("/management/test");
  //   else router.push("/dashboard");
  // }, [testStatus]);

  // useEffect(() => {
  //   if (!(domain in Domain)) router.push("/dashboard");
  // }, []);

  useEffect(() => {
    if (user === null) router.push("/");
    else if (user !== "loading") {
      getSubmissions(user, setDomainsToBeGrayed);
    }
  }, [user]);
  
  useEffect(() => {
    if (domainsToBeGrayed !== "loading" && domainsToBeGrayed.includes(domain)) {
      toast({
        title: "Domain Already Submitted",
        description: "You have already submitted a solution for this domain.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      router.push("/dashboard");
    }
  }, [domainsToBeGrayed, domain, router]);
  
  
//   console.log("Fetched Domains:", domainsToBeGrayed);
// console.log("Current Domain:", domain);


  const handleInputChange = (value: string) => {
    if (linkError.status) setLinkError({ status: false, message: "" });
    setAssignmentLink(value);
  };

  const handleSubmitTask = async () => {
    if (domainsToBeGrayed !== "loading" && domainsToBeGrayed.includes(domain)) {
      toast({
        title: "Domain Already Submitted",
        description: "You have already submitted a solution for this domain.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (assignmentLink.length === 0) {
      setLinkError({ status: true, message: `${assignmentPlatform} link is required.` });
      return;
    }
    if (user === null || user === "loading") return;
    setSubmitLoading(true);
    try {
      const domainType = managementDomains.has(domain) ? 'managementDomain' : 'technicalDomain';
      const submissionPath = `/users/${user.displayName}/responses/${domainType}/${domain}`;
      
      await writeDataToDatabase(submissionPath, { assignmentLink });
      toast({
        title: "Submission Successful",
        description: `Your ${managementDomains.has(domain) ? 'management' : 'technical'} domain solution has been submitted successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your solution. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(err);
    }
    setSubmitLoading(false);
  };

  // return user === "loading" ||
  //   user === null ||
  //   !(domain in Domain) ||
  //   domainsToBeGrayed === "loading" ||
  //   domainsToBeGrayed.includes(domain) ||
  //   testStatus === "loading" ||
  //   (testStatus !== null && testStatus.isGivingTest) ? (
  //   <Loader />
  // ) : (

  if( user === null){
    return <p>Error</p>
  }
  return<>

    <Box
      minH="100vh"
      bg="black"
      bgImage="/background.png"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
      overflow="hidden"
    >
      <NavBar />
      
      {/* Animated background elements */}
      <MotionBox
        position="absolute"
        top="20%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="purple.500"
        opacity="0.1"
        filter="blur(80px)"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <MotionBox
        position="absolute"
        bottom="10%"
        right="5%"
        width="250px"
        height="250px"
        borderRadius="full"
        bg="blue.400"
        opacity="0.15"
        filter="blur(60px)"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <MotionFlex
        direction={["column", "column", "row"]}
        p={[4, 6, 8]}
        gap={8}
        maxW="1400px"
        mx="auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        position="relative"
        zIndex="1"
      >
        {/* Left Section - Submission Form */}
        <VStack
          flex="1"
          spacing={6}
          align="stretch"
          bg="rgba(13, 16, 27, 0.8)"
          p={8}
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(16px)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.3)"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative element */}
          <Box
            position="absolute"
            top="-20px"
            right="-20px"
            width="100px"
            height="100px"
            borderRadius="full"
            bg="purple.500"
            opacity="0.2"
            zIndex="0"
          />
          
          <Flex align="center" gap={3}>
            <Badge 
              colorScheme={managementDomains.has(domain) ? "green" : "purple"}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
            >
              {managementDomains.has(domain) ? "Management" : "Technical"}
            </Badge>
            <Heading color="white" size="lg" fontWeight="bold">
              {domainToName[domain]} Task
            </Heading>
          </Flex>
          
          <Divider borderColor="whiteAlpha.300" />
          
          <Box>
            <Heading size="sm" color="whiteAlpha.800" mb={4} fontWeight="medium">
              Submission Guidelines
            </Heading>
            <OrderedList color="whiteAlpha.800" spacing={4} pl={4}>
              <ListItem>
                <Text>Review the task description carefully and ensure you understand all requirements.</Text>
              </ListItem>
              <ListItem>
                <Text>{`Upload your solution to ${assignmentPlatform} and paste the link below.`}</Text>
              </ListItem>
              <ListItem>
                <HStack spacing={2} align="flex-start">
                  <Icon as={FaExclamationTriangle} color="yellow.300" mt={1} />
                  <Text>
                    <Text as="span" color="yellow.300" fontWeight="bold">
                      Important: 
                    </Text>
                    {" Make sure the link is accessible to evaluators. Only one submission is allowed."}
                  </Text>
                </HStack>
              </ListItem>
            </OrderedList>
          </Box>

          <FormControl isInvalid={linkError.status} mt={4}>
            <Flex align="center" gap={2} mb={2}>
              <Icon 
                as={assignmentPlatform.includes("GitHub") ? FaGithub : FaGoogleDrive} 
                color="whiteAlpha.900" 
                fontSize="xl"
              />
              <Text color="whiteAlpha.900" fontWeight="500">
                {`${assignmentPlatform} Link`}
              </Text>
              <Tooltip 
                label={`Paste your ${assignmentPlatform} link here. Make sure it's accessible to the evaluators.`} 
                placement="top"
              >
                <Box as="span" cursor="help">
                  <Icon as={FaInfoCircle} color="whiteAlpha.600" />
                </Box>
              </Tooltip>
            </Flex>
            <TextInput handleInputChange={handleInputChange} />
            <FormErrorMessage>{linkError.message}</FormErrorMessage>
          </FormControl>

          <Button
            leftIcon={submitLoading ? undefined : <FaLink />}
            colorScheme="purple"
            isLoading={submitLoading}
            loadingText="Submitting..."
            onClick={handleSubmitTask}
            size="lg"
            w="full"
            mt={4}
            borderRadius="xl"
            fontWeight="bold"
            boxShadow="0 4px 10px rgba(124, 58, 237, 0.3)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 6px 15px rgba(124, 58, 237, 0.4)",
            }}
            _active={{
              transform: "translateY(0)",
              boxShadow: "0 2px 5px rgba(124, 58, 237, 0.4)",
            }}
            transition="all 0.2s"
            animation={!submitLoading ? `${pulse} 2s infinite` : undefined}
          >
            Submit Solution
          </Button>
        </VStack>

        {/* Right Section - Task Description */}
        <Box
          flex="1.2"
          bg="rgba(13, 16, 27, 0.8)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          overflow="hidden"
          backdropFilter="blur(16px)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.3)"
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            py={3}
            px={5}
            bg="rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(5px)"
            zIndex="1"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="white" fontWeight="medium">Task Description</Text>
            <HStack>
              <Icon as={FaCheckCircle} color="green.400" />
              <Text color="green.400" fontSize="sm">Ready to view</Text>
            </HStack>
          </Box>
          
          <Box pt="50px" height="100%">
            <iframe
              src={domainToTaskLink[domain]}
              width="100%"
              height="100%"
              style={{ minHeight: "600px", border: "none" }}
              allow="autoplay"
            />
          </Box>
        </Box>
      </MotionFlex>
    </Box>
    </>

}
