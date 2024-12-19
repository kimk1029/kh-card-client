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
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import DB from "../../../../public/db.json"; // 경로는 프로젝트 구조에 맞게 조정

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  views: number;
  comments: number;
  tag: string;
}

const PostDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  // URL 파라미터로부터 id 가져오기
  const id = Number(params.id);

  // DB에서 해당 포스트 찾기
  const post: Post | undefined = DB.posts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <Container maxW="container.md" mt={10}>
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
        bg="white"
      >
        {/* 게시글 제목 */}
        <Box mb={4}>
          <Heading as="h2" size="lg" wordBreak="break-word">
            [{post.tag}] {post.title}
          </Heading>
        </Box>

        {/* 글쓴이, 날짜, 조회수 */}
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="sm" color="gray.600">
            글쓴이: {post.author} | {post.date}
          </Text>
          <Text fontSize="sm" color="gray.600">
            조회수: {post.views}
          </Text>
        </Flex>

        <Divider mb={4} />

        {/* 게시글 내용 */}
        <Box whiteSpace="pre-wrap" wordBreak="break-word" mb={4}>
          {post.content}
        </Box>

        <Divider mb={4} />

        {/* 댓글수 및 뒤로가기 버튼 */}
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.600">
            댓글수: {post.comments}
          </Text>
          <Button colorScheme="blue" onClick={() => router.push("/board")}>
            목록으로 돌아가기
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
};

export default PostDetailPage;
