"use client";
import {
  Flex,
  Heading,
  Text,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Icon,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { Menu } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Domain } from "@/lib/types";
import { User } from "firebase/auth";
import { getSubmittedTechnicalDomains, getSubmittedManagementDomains } from "@/lib/functions";

const domainMapping =  {
  ios: "iOS",
  design: "Design",
  android: "Android",
  blockchain: "Blockchain",
  ml: "Machine Learning",
  web: "Web Development",
  editorial: "Editorial",
  events: "Events",
  finance: "Finance",
 
}
const getSubmissions = async (
  user: User,
  setDomainsToBeGrayed: Dispatch<SetStateAction<"loading" | Domain[]>>
) => {
  const technicalDomains = await getSubmittedTechnicalDomains(user);
  const managementDomains = await getSubmittedManagementDomains(user);
  const allSubmittedDomains = [...technicalDomains, ...managementDomains];
  setDomainsToBeGrayed(allSubmittedDomains);
};

export default function NavBar() {
  
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [domainsToBeGrayed, setDomainsToBeGrayed] = useState<
      Domain[] | "loading">("loading");
      useEffect(() => {
        if (user === null) router.push("/");
        else if (user !== "loading") {
          getSubmissions(user, setDomainsToBeGrayed);
        }
      }, [user]);
console.log( domainsToBeGrayed);

  return user === null || user === "loading" ? (
    <></>
  ) : (
    <Flex
      p="1rem 2rem"
      bg="brand.blackAlpha"
      alignItems="center"
      color="brand.violet"
    >
      <Link textDecor="none" href="/dashboard">
        <Image w="4rem" src={"/ADG.jpg"} borderRadius="10px" />
      </Link>
      <Heading ml="1rem">{`ADG Domain Selections '25`}</Heading>
      <Flex
        p="0.5rem"
        _hover={{ bg: "brand.blackAlpha", transition: "all 100ms" }}
        cursor="pointer"
        borderRadius="8px"
        onClick={onOpen}
        ml="auto"
      >
        <Icon as={Menu} color="white" />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.menuBg" color="brand.menuTxt">
          <DrawerCloseButton mt="1.5rem" />
          <DrawerHeader mt="1rem">Menu</DrawerHeader>

          <DrawerBody p="0%">
            <Flex flexDir="column" w="100%" p="1rem" justifyContent="center">
              <Flex
                mt="1rem"
                alignItems="center"
                justifyContent="space-between"
                p="1rem"
                borderRadius="8px"
                bg="brand.violet"
                color="brand.gray"
              >
                <Text fontWeight="600">{user.displayName}</Text>
                <Avatar size="sm" src={user.photoURL || ""} />
              </Flex>
              <Flex flexDir="column" mt="1rem">
  <Text fontSize="lg" fontWeight="bold" mb="0.5rem">
    Selected Domains:
  </Text>
  <Flex flexWrap="wrap" gap="0.5rem">
    {domainsToBeGrayed === "loading" ? (
      <Text fontStyle="italic" color="gray.400">
        Loading...
      </Text>
    ) : domainsToBeGrayed.length > 0 ? (
      domainsToBeGrayed.map((domain, index) => (
        <Text
          key={index}
          px="1rem"
          py="1rem"
          bg="brand.violet"
          color="white"
          borderRadius="8px"
          fontWeight="medium"
          boxShadow="sm"
        >
          {domainMapping[domain as keyof typeof domainMapping] || domain}
        </Text>
      ))
    ) : (
      <Text fontStyle="italic" color="gray.400">
        None
      </Text>
    )}
  </Flex>
</Flex>


            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex flexDir="column" w="100%" gap="1rem">
              <Link textDecor="none" href="/dashboard">
                <Button
                  color="brand.menuTxt"
                  onClick={() => router.push("/dashboard")}
                  w="100%"
                  variant="outline"
                  _hover={{ bg: "brand.menuTxt", color: "black" }}
                >
                  Go to dashboard
                </Button>
              </Link>
              <Button onClick={logOut} w="100%" colorScheme="red">
                Log Out
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
