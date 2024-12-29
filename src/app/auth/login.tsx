"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Link,
  useColorModeValue, // useColorModeValue 훅 임포트
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
  const { data: session, status } = useSession();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 색상 모드에 따라 동적으로 색상 정의
  const boxBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("gray.700", "white");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.400");
  const socialButtonBg = useColorModeValue("red.500", "red.300");
  const socialButtonHoverBg = useColorModeValue("red.600", "red.400");
  const logoutButtonBg = useColorModeValue("gray.200", "gray.600");
  const logoutButtonHoverBg = useColorModeValue("gray.300", "gray.700");
  const inputBg = useColorModeValue("gray.100", "gray.600");
  const inputFocusBg = useColorModeValue("white", "gray.700");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(result);
      console.log("--------------");
      if (result?.error) {
        setServerError(result.error);
      } else {
        // 로그인 성공 시 리디렉션 (예: 대시보드로 이동)
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setServerError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async () => {
    await signIn("google");
    onToggle(true);
  };

  return (
    <Box
      bg={boxBg} // 동적 배경 색상 사용
      boxShadow="lg"
      p={8}
      rounded="lg"
      w="100%"
      maxW="md"
      mx="auto"
      mt={10}
    >
      <Heading mb={6} textAlign="center" color={headingColor}>
        로그인
      </Heading>
      {serverError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>에러!</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="email" isInvalid={!!errors.email} isRequired>
            <FormLabel color={textColor}>이메일 주소</FormLabel>
            <Input
              type="email"
              bg={inputBg}
              _focus={{
                bg: inputFocusBg,
                borderColor: "blue.500",
              }}
              {...register("email", { required: "이메일은 필수 입력입니다." })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password} isRequired>
            <FormLabel color={textColor}>비밀번호</FormLabel>
            <Input
              type="password"
              bg={inputBg}
              _focus={{
                bg: inputFocusBg,
                borderColor: "blue.500",
              }}
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
              })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            type="submit"
            size="lg"
            colorScheme="blue"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            isLoading={isLoading}
            loadingText="로그인 중..."
          >
            로그인
          </Button>
          <Button
            onClick={handleSocialSignIn}
            colorScheme="red"
            bg={socialButtonBg}
            _hover={{ bg: socialButtonHoverBg }}
          >
            Google으로 로그인
          </Button>
          <Stack direction="row" justifyContent="center">
            <Text color={textColor}>아직 계정이 없으신가요?</Text>
            <Link
              color={linkColor}
              onClick={() => onToggle(true)}
              cursor="pointer"
            >
              회원가입
            </Link>
          </Stack>
          {session && (
            <Button
              onClick={() => signOut()}
              colorScheme="gray"
              bg={logoutButtonBg}
              _hover={{ bg: logoutButtonHoverBg }}
            >
              로그아웃
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
