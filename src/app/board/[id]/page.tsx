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
  useColorMode, // 추가
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import DB from "../../../../public/db.json";
import useSWR from "swr";

const PostDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { colorMode } = useColorMode(); // 추가: 현재 테마 모드 가져오기
  const id = Number(params.id);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/posts/${id}`, fetcher);
  const post = data.posts.find((p: any) => p.id === id);

  // 색상 모드에 따른 색상 설정
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

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
        bg={bgColor} // 테마 색상 적용
        color={textColor} // 테마 색상 적용
      >
        <Box mb={4}>
          <Heading as="h2" size="lg" wordBreak="break-word">
            [{post.tag}] {post.title}
          </Heading>
        </Box>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="sm">
            글쓴이: {post.author} | {post.date}
          </Text>
          <Text fontSize="sm">조회수: {post.views}</Text>
        </Flex>
        <Divider mb={4} borderColor={dividerColor} />{" "}
        {/* 테마에 맞는 구분선 색상 적용 */}
        <Box whiteSpace="pre-wrap" wordBreak="break-word" mb={4}>
          {post.content}
        </Box>
        <Divider mb={4} borderColor={dividerColor} /> {/* 구분선 색상 적용 */}
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">댓글수: {post.comments}</Text>
          <Button colorScheme="blue" onClick={() => router.push("/board")}>
            목록으로 돌아가기
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
};

export default PostDetailPage;
