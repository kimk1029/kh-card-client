// pages/posts/[id]/edit.tsx

"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
  useColorMode,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Post } from "@/app/api/posts/[id]/route";

const EditPostPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const id = Number(params.id);

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  // 게시글 데이터 가져오기
  const { data: post, error } = useSWR<Post>(`/api/posts/${id}`, fetcher);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("게시글 수정에 실패했습니다.");

      const updatedPost = await res.json();
      router.push(`/posts/${updatedPost.id}`);
    } catch (err) {
      console.error(err);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  // 에러 처리
  if (error) {
    return (
      <Layout>
        <Container
          maxW="container.md"
          mt={10}
          bg={colorMode === "light" ? "white" : "gray.800"}
          boxShadow="xl"
          p="5"
          rounded="md"
        >
          <Box p={4}>
            <Text>게시글을 불러오는 중 오류가 발생했습니다.</Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => router.push("/board")}
            >
              목록으로 돌아가기
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <Container
          maxW="container.md"
          mt={10}
          bg={colorMode === "light" ? "white" : "gray.800"}
          boxShadow="xl"
          p="5"
          rounded="md"
        >
          <Box p={4}>
            <Text>해당 게시글을 찾을 수 없습니다.</Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => router.push("/board")}
            >
              목록으로 돌아가기
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  // 색상 모드 설정
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

  return (
    <Layout>
      <Container
        maxW="container.md"
        mt={10}
        boxShadow="xl"
        p="5"
        rounded="md"
        bg={bgColor}
        color={textColor}
      >
        {/* 게시글 수정 폼 */}
        <Heading as="h2" size="lg" mb={6}>
          게시글 수정
        </Heading>

        <Box as="form" onSubmit={handleUpdate}>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isRequired
            />
            <Textarea
              placeholder="내용을 입력하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              isRequired
              height="200px"
            />
            <Flex justifyContent="flex-end" mt={4}>
              <Button type="submit" colorScheme="yellow">
                수정 완료
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Layout>
  );
};

export default EditPostPage;
