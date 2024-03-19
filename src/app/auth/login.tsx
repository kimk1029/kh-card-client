import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Stack,
  Heading,
  Text,
  FormErrorMessage,
  Box,
  Link,
} from "@chakra-ui/react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ onToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(JSON.stringify(data));
    // Here, replace 'your-login-api-endpoint' with your actual login API endpoint
    const loginEndpoint = "your-login-api-endpoint";

    // try {
    //   const response = await fetch(loginEndpoint, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Login failed");
    //   }

    //   const responseData = await response.json();
    //   console.log("Login success:", responseData);
    //   // Handle successful login, e.g., redirect to dashboard
    // } catch (error) {
    //   console.error("Login error:", error);
    //   // Handle login error, e.g., show error message
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl
          id="email"
          isInvalid={errors.email ? true : false}
          isRequired
        >
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id="password"
          isInvalid={errors.password ? true : false}
          isRequired
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          size={"lg"}
          mt={4}
          variant={"solid"}
          colorScheme="blue"
        >
          Log In
        </Button>

        <Link
          onClick={() => onToggle(true)}
          textAlign={"right"}
          fontSize={"sm"}
        >
          SignUp
        </Link>
      </Stack>
    </form>
  );
};

export default Login;
