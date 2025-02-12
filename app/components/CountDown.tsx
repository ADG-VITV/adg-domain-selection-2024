"use client";
// components/Countdown.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import useCheckTest from "../hooks/useCheckTest";
import { updateTestStatus } from "@/lib/functions";
import { User } from "firebase/auth";
import AvTimerIcon from "@mui/icons-material/AvTimer";

interface CountdownProps {
  startTime: number;
  user: User;
  timeLimit: number; // time limit in seconds
}

const CountDown: React.FC<CountdownProps> = ({
  startTime,
  timeLimit,
  user,
}) => {
  timeLimit = timeLimit * 60;
  const router = useRouter();
  const { testStatus, setTestStatus } = useCheckTest();
  const [remainingTime, setRemainingTime] = useState<number | "loading">(
    "loading"
  );

  const handleSubmit = async () => {
    if (testStatus === "loading" || testStatus === null) return;
    try {
      updateTestStatus(user, {
        ...testStatus,
        isGivingTest: false,
        isTestCompleted: true,
      });
      setTestStatus({
        ...testStatus,
        isGivingTest: false,
        isTestCompleted: true,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      const newRemainingTime = timeLimit - elapsedTime;

      if (newRemainingTime <= 0) {
        handleSubmit();
        clearInterval(interval);
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, timeLimit, router]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return remainingTime === "loading" ? (
    <></>
  ) : (
    <Flex w="100%" justifyContent="center" mt="2rem">
      <Flex
        color="white"
        gap="1rem"
        p="1rem"
        borderRadius="8px"
        border="1px solid white"
        bg="brand.blackAlpha"
      >
        <Icon as={AvTimerIcon} />
        <Text>Remaining time: {formatTime(remainingTime)}</Text>
      </Flex>
    </Flex>
  );
};

export default CountDown;
