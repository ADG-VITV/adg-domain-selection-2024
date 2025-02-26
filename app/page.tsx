"use client";
import { Button, Flex, Heading, Image, Text, Box, keyframes } from "@chakra-ui/react";
import { UserAuth } from "./context/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./components/Loader";


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function App() {
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user !== null && user !== "loading") router.push("/dashboard");
  }, [user]);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  return user === "loading" || user !== null ? (
    <Loader />
  ) : (
    <Flex h="100vh" w="100%" bg="gray.900" overflow="hidden">
      <video
  width="40%"
  height="100%"
  autoPlay
  loop
  muted
  playsInline
  style={{
    objectFit: "cover",
    
   
  }}
  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
>
  <source src="/test.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <Flex
        w={["100%", "100%", "60%"]}
        h="100%"
        bgImage="/background.png"
        bgSize="cover"
        bgPosition="center"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {/* Background Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
        />
        
        <Flex
          animation={`${fadeIn} 0.6s ease-out`}
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="xl"
          p={["6", "8", "10"]}
          flexDir="column"
          alignItems="center"
          position="relative"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          boxShadow="2xl"
          maxW="400px"
          w="90%"
          transition="transform 0.3s ease"
          _hover={{ transform: 'translateY(-5px)' }}
        >
          <Image 
            w="24"
            h="24"
            src="/ADG.jpg"
            borderRadius="xl"
            mb="6"
            transition="transform 0.3s ease"
            _hover={{ transform: 'rotate(5deg)' }}
          />
          <Heading 
            color="white" 
            fontSize={["2xl", "3xl"]}
            mb="2"
          >
            ADGVIT
          </Heading>
          <Text 
            color="whiteAlpha.800" 
            mb="8" 
            textAlign="center"
            fontSize="lg"
          >
            Thank you for your interest in our club. All the best!
          </Text>
          <Button
            onClick={handleSignIn}
            leftIcon={<GoogleIcon />}
            size="lg"
            w="full"
            bg="linear-gradient(to right, #3182ce, #805ad5)"
            color="white"
            _hover={{
              bg: "linear-gradient(to right, #2c5282, #6b46c1)",
              transform: "translateY(-2px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            fontSize="md"
            fontWeight="semibold"
            px="8"
          >
            Sign in with Google
          </Button>
          <Text 
            mt="6" 
            color="whiteAlpha.600" 
            fontSize="sm" 
            textAlign="center"
          >
            Please Sign in with your VIT email.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}