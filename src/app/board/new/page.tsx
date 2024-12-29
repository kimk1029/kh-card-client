"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";

const NewPostPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { colorMode } = useColorMode();

  // NextAuth 세션에서 로그인 여부 확인
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 로그인 안 된 상태라면 접근 제한
  if (!session && typeof window !== "undefined") {
    router.push("/auth");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 쿠키 기반 인증 (NextAuth)
      // 서버는 getServerSession 등으로 세션 검증
      const response = await fetch(
        "http://kimk1029.synology.me:50000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            // 필요한 필드 (tag, imageUrl 등) 추가 가능
          }),
          // 쿠키 자동 전송 (브라우저 기본 동작)
          // credentials: "include" 등을 추가로 쓰는 경우도 있음 (CORS 상황에 따라)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      toast({
        title: "게시글 작성 완료",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      router.push("/board"); // 작성 후 목록 페이지로 이동
    } catch (error) {
      toast({
        title: "작성 실패",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 다크 모드에 따른 색상 설정
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";

  return (
    <Layout>
      <Box
        maxW="600px"
        mx="auto"
        mt={10}
        p={6}
        rounded="md"
        boxShadow="xl"
        bg={bgColor}
        color={textColor}
      >
        <Heading mb={6}>새글 쓰기</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>제목</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>내용</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={6}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            작성하기
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default NewPostPage;
