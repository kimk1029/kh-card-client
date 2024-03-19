import React, { Dispatch, SetStateAction, Fragment } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface SignUpProps {
  onToggle: Dispatch<SetStateAction<boolean>>;
}

interface SignUpFormData {
  nickname: string;
  email: string;
  password: string;
}

const SignUp: React.FC<SignUpProps> = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // Handle signup submission here. Example: POST request to your signup API endpoint.
    // fetch('your-signup-api-endpoint', { method: 'POST', body: JSON.stringify(data), ... })
  };

  const toggleLogin = () => {
    onToggle(false);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="nickname" isRequired>
            <FormLabel>Nick Name</FormLabel>
            <Input
              type="text"
              {...register("nickname", { required: "Nickname is required" })}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            disabled={true}
            type="submit"
            colorScheme="teal"
            size="lg"
            mt={4}
            _hover={{
              bg: "blue.500",
            }}
          >
            Sign up!
          </Button>
          <Stack pt={6} direction={"row"} justifyContent={"center"}>
            <Text align={"center"}>Already a user?</Text>
            <Text color={"blue.400"} onClick={toggleLogin} cursor={"pointer"}>
              Login
            </Text>
          </Stack>
        </Stack>
      </form>
    </Fragment>
  );
};

export default SignUp;
