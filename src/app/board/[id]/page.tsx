"use client";

import React from "react";
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
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import useSWR from "swr";
import { Post } from "@/app/api/posts/[id]/route";

const PostDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const id = Number(params.id);
  console.log(`/api/posts/${id}`, id);

  const fetcher = async (url: string) => {
    console.log("Fetching URL:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    console.log("Fetched Data:", json);
    return json;
  };

  const { data, error } = useSWR<Post>(`/api/posts/${id}`, fetcher);

  console.log("data, error", data, error);
  const post = data;

  // 색상 모드에 따른 색상 설정
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

  if (error) {
    console.error("Error fetching post:", error);
    return (
      <Layout>
        <Container
          maxW="container.md"
          mt={10}
          color={textColor}
          bg={bgColor}
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
          color={textColor}
          bg={bgColor}
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
        <Box mb={4}>
          <Heading as="h2" size="lg" wordBreak="break-word">
            {post.author.username && post.title
              ? `[${post.author.username}] ${post.title}`
              : post.title}
          </Heading>
        </Box>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="sm">
            글쓴이: {post.author.username} |{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </Text>
          <Text fontSize="sm">조회수: {post.views}</Text>
        </Flex>
        <Divider mb={4} borderColor={dividerColor} />
        <Box whiteSpace="pre-wrap" wordBreak="break-word" mb={4}>
          {post.content}
        </Box>
        <Divider mb={4} borderColor={dividerColor} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">댓글수: {post.comments || 0}</Text>
          <Button colorScheme="blue" onClick={() => router.push("/board")}>
            목록으로 돌아가기
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
};

export default PostDetailPage;
