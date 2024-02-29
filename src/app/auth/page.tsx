"use client";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Mock API call
    console.log("Form submitted:", { email, password, nickname });
    // Here, replace the console.log with your actual API call
    // For example, using fetch to interact with your backend:
    /*
    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(isSignup && { nickname }),
        }),
      });
      const data = await response.json();
      console.log(data);
      // Handle response
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    */
  };

  return (
    <Box my={8} textAlign="left" w={"400px"} >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {isSignup && (
            <FormControl id="nickname" isRequired>
              <FormLabel>Nickname</FormLabel>
              <Input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {isSignup && (
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          )}
          <Button type="submit" width="full" mt={4}>
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </Stack>
      </form>
      <Text mt={4}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link color="teal.500" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </Text>
    </Box>
  );
};

export default AuthForm;
