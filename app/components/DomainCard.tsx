"use client";
import { Domain } from "@/lib/types";
import { Box, Flex, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export interface DomainInfo {
  icon: IconType;
  label: Domain;
  tech: string;
  color: string;
}

interface DomainCardProps extends DomainInfo {
  index: number;
  isGrayed: Boolean;
  setHovered: (label: Domain | null) => void;
  isHovered: Boolean;
}

const MotionBox = motion(Box);

const toLowerCaseLabel = (label: Domain) => label.toLowerCase();

export const DomainCard = ({
  icon: IconComponent,
  label,
  tech,
  index,
  isGrayed,
  setHovered,
  isHovered,
  color,
}: DomainCardProps) => {
  const gradientColors = color.split(",")[1].split(")")[0].trim().split(" ");
  const startColor = gradientColors[0];
  const endColor = gradientColors[1];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: isGrayed ? 1 : 1.05 }}
      whileTap={{ scale: isGrayed ? 1 : 0.95 }}
      onHoverStart={() => setHovered(isGrayed ? null : label)}
      onHoverEnd={() => setHovered(null)}
    >
      <Link
        href={`/dashboard/${toLowerCaseLabel(label)}`}
        passHref
        legacyBehavior
      >
        <ChakraLink
          _hover={{ textDecoration: "none" }}
          pointerEvents={isGrayed ? "none" : "auto"}
        >
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="40"
            h="40"
            bg={
              isHovered
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.1)"
            }
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            cursor={isGrayed ? "not-allowed" : "pointer"}
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor={
              isHovered
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 255, 255, 0.1)"
            }
            opacity={isGrayed ? 0.3 : 1}
            filter={isGrayed ? "grayscale(100%) brightness(0.7)" : "none"}
            transition="all 0.3s"
          >
            <Box position="relative" mb="4">
              <Box
                as={IconComponent}
                fontSize="5xl"
                color={isGrayed ? "gray.500" : startColor}
                sx={{
                  filter: isGrayed
                    ? "grayscale(100%) brightness(0.8)"
                    : `drop-shadow(0 0 8px ${startColor}33)`,
                  transition: "all 0.3s",
                }}
                transform={isHovered && !isGrayed ? "scale(1.1)" : "scale(1)"}
              />
              {isHovered && !isGrayed && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  as={IconComponent}
                  fontSize="5xl"
                  sx={{
                    animation: "pulse 2s infinite",
                    color: endColor,
                    opacity: 0.5,
                    filter: `blur(8px) drop-shadow(0 0 8px ${endColor}66)`,
                  }}
                />
              )}
            </Box>

            <Text
              color={isGrayed ? "gray.400" : "white"}
              fontSize="xl"
              fontWeight="600"
              mb="2"
            >
              {isGrayed ? "Submitted" : label}
            </Text>

            <Text
              color={isGrayed ? "gray.500" : "whiteAlpha.700"}
              fontSize="sm"
              opacity={isHovered && !isGrayed ? 1 : 0}
              transform={
                isHovered && !isGrayed ? "translateY(0)" : "translateY(10px)"
              }
              transition="all 0.3s"
            >
              {tech}
            </Text>
          </Flex>
        </ChakraLink>
      </Link>
    </MotionBox>
  );
};
