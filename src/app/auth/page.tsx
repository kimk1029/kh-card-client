"use client";
import React, { useState } from "react";
import Login from "./login";
import SignUp from "./sign-up";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const AuthForm: React.FC = () => {
  const [toggleLogin, setToggleLogin] = useState<boolean>(false);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {toggleLogin ? (
            <SignUp onToggle={setToggleLogin} />
          ) : (
            <Login onToggle={setToggleLogin} />
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default AuthForm;
