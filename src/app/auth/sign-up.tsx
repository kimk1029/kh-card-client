import React, { Dispatch, SetStateAction, Fragment, useState } from "react";
import { useSession } from "next-auth/react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface SignUpProps {
  onToggle: Dispatch<SetStateAction<boolean>>;
  email?: string;
}

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC<SignUpProps> = ({ onToggle, email }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: email || "",
    },
  });

  const { data: session } = useSession();

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);
    try {
      const response = await axios.post(
        "http://kimk1029.synology.me:50000/api/auth/register",
        data
      );

      if (response.status === 201) {
        setSuccessMessage("회원가입이 성공적으로 완료되었습니다!");
        reset();
        // 필요 시 로그인 페이지로 리디렉션 또는 자동 로그인 처리
      } else {
        setServerError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message);
      } else {
        setServerError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLogin = () => {
    onToggle(false);
  };

  return (
    <Fragment>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={8}
        rounded="lg"
        w="100%"
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          회원가입
        </Heading>
        {serverError && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>에러!</AlertTitle>
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>성공!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} mt={4}>
            <FormControl id="nickname" isRequired isInvalid={!!errors.username}>
              <FormLabel>닉네임</FormLabel>
              <Input
                type="text"
                {...register("username", {
                  required: "닉네임은 필수 입력입니다.",
                })}
              />
              {errors.username && (
                <Text color="red.500" mt={1}>
                  {errors.username.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="email" isRequired isInvalid={!!errors.email}>
              <FormLabel>이메일 주소</FormLabel>
              <Input
                type="email"
                disabled={Boolean(session?.user?.email)}
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                })}
              />
              {errors.email && (
                <Text color="red.500" mt={1}>
                  {errors.email.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!!errors.password}>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                  })}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500" mt={1}>
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              mt={4}
              isLoading={isLoading}
              loadingText="가입 중..."
              _hover={{
                bg: "blue.500",
              }}
            >
              회원가입
            </Button>
            <Stack pt={6} direction={"row"} justifyContent={"center"}>
              <Text align={"center"}>이미 회원이신가요?</Text>
              <Text
                color={"blue.400"}
                onClick={toggleLogin}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
              >
                로그인
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Fragment>
  );
};

export default SignUp;
