"use client";
import { Button, Flex, Heading, Image, Text, Box, keyframes, useBreakpointValue } from "@chakra-ui/react";
import { UserAuth } from "./context/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

export default function App() {
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  // Responsive video layout
  const videoWidth = useBreakpointValue({ base: "100%", md: "40%" });
  const videoPosition = useBreakpointValue({ 
    base: "absolute", 
    md: "relative" 
  });
  const videoZIndex = useBreakpointValue({ base: -1, md: 1 });

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
    <Flex h="100vh" w="100%" bg="black" overflow="hidden" position="relative">
      {/* Video Background - Now always in background */}
      <Box
        as="video"
        width="100%" // Cover the entire screen
        height="100%"
        autoPlay
        loop
        muted
        playsInline
        position="absolute"
        zIndex={-1}
        sx={{
          objectFit: "cover",
          transition: "transform 0.5s ease-in-out",
          transform: isHovering ? "scale(1.05)" : "scale(1)",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        src="/test.mp4"
      />

      {/* Overlay for better readability */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.700"
        zIndex="0"
      />

      {/* Content Area */}
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex="1"
      >
        <Flex
          animation={`${fadeIn} 0.6s ease-out`}
          bg="rgba(13, 16, 27, 0.7)"
          borderRadius="2xl"
          p={["6", "8", "10"]}
          flexDir="column"
          alignItems="center"
          position="relative"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          boxShadow="0 10px 30px rgba(0, 0, 0, 0.5)"
          maxW="400px"
          w="90%"
          zIndex="2"
          transition="all 0.3s ease"
          _hover={{ 
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
            transform: 'translateY(-5px)'
          }}
        >
          <Image 
            w="24"
            h="24"
            src="/ADG.jpg"
            borderRadius="xl"
            mb="6"
            transition="transform 0.3s ease"
            _hover={{ transform: 'rotate(5deg) scale(1.05)' }}
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.4)"
          />
          
          <Heading 
            color="white" 
            fontSize={["2xl", "3xl"]}
            mb="2"
            bgGradient="linear(to-r, #3182ce, #805ad5)"
            bgClip="text"
            letterSpacing="tight"
          >
            ADGVIT
          </Heading>
          
          <Text 
            color="whiteAlpha.800" 
            mb="8" 
            textAlign="center"
            fontSize="lg"
            fontWeight="medium"
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
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)"
            }}
            _active={{
              transform: "translateY(0)",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.4)"
            }}
            transition="all 0.3s ease"
            fontSize="md"
            fontWeight="semibold"
            px="8"
            borderRadius="xl"
            boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              backgroundImage: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
              animation: `${shimmer} 2s infinite linear`,
            }}
          >
            Sign in with Google
          </Button>
          
          <Text 
            mt="6" 
            color="whiteAlpha.700" 
            fontSize="sm" 
            textAlign="center"
            fontWeight="medium"
          >
            Please Sign in with your VIT email.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}