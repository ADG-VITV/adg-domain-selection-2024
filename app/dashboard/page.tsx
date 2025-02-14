"use client";

import {
  Button,
  Flex,
  Heading,
  Link,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserAuth } from "../context/AuthContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { Domain } from "@/lib/types";
import { getSubmittedTechnicalDomains } from "@/lib/functions";
import { User } from "firebase/auth";
import useCheckTest from "../hooks/useCheckTest";
import { motion, AnimatePresence } from "framer-motion";
import { FaHtml5, FaApple, FaAndroid, FaPython } from "react-icons/fa";
import { SiSolidity, SiFigma } from "react-icons/si";
import { MdEdit, MdAttachMoney, MdEvent } from "react-icons/md";
import { DomainCard, DomainInfo } from "../components/DomainCard";



const getSubmissions = async (
  user: User,
  setDomainsToBeGrayed: Dispatch<SetStateAction<"loading" | Domain[]>>
) => {
  const technicalDomains = await getSubmittedTechnicalDomains(user);
  setDomainsToBeGrayed(technicalDomains);
};

const MotionBox = motion(Box);


export default function Dashboard() {
  const { user } = UserAuth();
  const router = useRouter();
  const [domainsToBeGrayed, setDomainsToBeGrayed] = useState<Domain[] | "loading">("loading");
  const { testStatus } = useCheckTest();
  const [hoveredDomain, setHoveredDomain] = useState<Domain | null>(null);  
  // console.log( hoveredDomain);
  // useEffect(() => {
  //   if (testStatus === "loading" || testStatus === null) return;
  //   if (testStatus.isGivingTest) router.push("/management/test");
  //   else router.push("/dashboard");
  // }, [testStatus]);

  const headingColor = useColorModeValue("white", "white");

  // useEffect(() => {
  //   if (testStatus === "loading" || testStatus === null) return;
  //   if (testStatus.isGivingTest) router.push("/management/test");
  //   else router.push("/dashboard");
  // }, [testStatus]);

  useEffect(() => {
    if (user === null) {
      router.push("/");
      return;
    }
    if (user !== "loading") getSubmissions(user, setDomainsToBeGrayed);
  }, [user]);

  if (
    user === "loading" ||
    user === null ||
    domainsToBeGrayed === "loading" ||
    testStatus === "loading" ||
    (testStatus !== null && testStatus.isGivingTest)
  ) {
    return <Loader />;
  }
  const domains: DomainInfo[] = [  // Added explicit typing
    {
      icon: FaHtml5,
      label: "Web" as Domain,  // Type assertion to Domain
      tech: "HTML, CSS, JavaScript",
      color: "linear(to-r, #f7b42c, #fc575e)",
    },
    {
      icon: FaApple,
      label: "iOS" as Domain,
      tech: "Swift, SwiftUI",
      color: "linear(to-r, #ffffff, #ffffff)",
    },
    {
      icon: FaAndroid,
      label: "Android" as Domain,
      tech: "Kotlin, Java",
      color: "linear(to-r, #00c9ff, #92fe9d)",
    },
    {
      icon: FaPython,
      label: "ML" as Domain,
      tech: "Python, TensorFlow",
      color: "linear(to-r, #ff7e5f, #feb47b)",
    },
    {
      icon: SiSolidity,
      label: "Blockchain" as Domain,
      tech: "Solidity, Web3",
      color: "linear(to-r, #8e2de2, #4a00e0)",
    },
    {
      icon: SiFigma,
      label: "Design" as Domain,
      tech: "UI/UX, Figma",
      color: "linear(to-r, #6a11cb, #2575fc)",
    },
    
  ];

  const marketingDomain: DomainInfo[] = [  // Added explicit typing
    {
      icon: MdEdit,
      label: "Editorial" as Domain,
      tech: "Content Writing, Editing",
      color: "linear(to-r, #ff6b6b, #ff8e8e)",
    },
    {
      icon: MdAttachMoney,
      label: "Finance" as Domain,
      tech: "Financial, Planning",
      color: "linear(to-r, #4ecdc4, #45b7af)",
    },
    {
      icon: MdEvent,
      label: "Events" as Domain,
      tech: "Event , Management",
      color: "linear(to-r, #a8e6cf, #90d4be)",
    }
  ];

  return (
    <Box
      minH="100vh"
      bg="black"
      bgImage="url('/background.png')"
      bgSize="cover"
      bgPosition="center"
      position="relative"
      overflow="hidden"
    >
      <NavBar />

      <Box position="relative" zIndex="1" px="8" py="12">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          mb="16"
        >
          <Heading
            color={headingColor}
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            mb="8"
            bgGradient="linear(to-r, #fff, #a8b2d1)"
            bgClip="text"
          >
            Technical Domains
          </Heading>

          <Flex
            gap="6"
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <AnimatePresence>
              {domains.map((domain, index) => (
                <DomainCard
                  key={domain.label}
                  {...domain}
                  index={index}
                  isGrayed={domainsToBeGrayed.includes(domain.label)}
                  setHovered={setHoveredDomain}
                  isHovered={hoveredDomain === domain.label}
                />
              ))}
            </AnimatePresence>
          </Flex>
        </MotionBox>


  

          {/* <Link href="/management" textDecoration="none" display="inline-block">
            <Button
              as={motion.button}
              isDisabled={testStatus?.isTestCompleted ?? false}
              bg="rgba(123, 31, 162, 0.9)"
              color="white"
              leftIcon={<ManageAccountsIcon />}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(123, 31, 162, 1)",
              }}
              whileTap={{ scale: 0.98 }}
              size="lg"
              px="8"
              py="7"
              fontSize="lg"
              fontWeight="500"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              boxShadow="0 4px 20px rgba(123, 31, 162, 0.4)"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 6px 25px rgba(123, 31, 162, 0.5)",
              }}
              transition="all 0.3s"
            >
              Start Management Task
            </Button>
          </Link> */}

<MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          mb="16"
        >
                  <Heading
            color={headingColor}
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            mb="8"
            bgGradient="linear(to-r, #fff, #a8b2d1)"
            bgClip="text"
          >
            Management Domain
          </Heading>
          <Flex
            gap="6"
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <AnimatePresence>
              {marketingDomain.map((domain, index) => (
                <DomainCard
                  key={domain.label}
                  {...domain}
                  index={index}
                  isGrayed={domainsToBeGrayed.includes(domain.label)}
                  setHovered={setHoveredDomain}
                  isHovered={hoveredDomain === domain.label}
                />
              ))}
            </AnimatePresence>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}