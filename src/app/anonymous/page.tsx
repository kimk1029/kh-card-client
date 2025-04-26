"use client";

import { Box, Container, Heading, Text, VStack, Button, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import PostList from "@/components/PostList";
import Layout from "@/components/Layout";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import PostModal from "@/components/post/PostModal";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  anonymousId: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const generateAnonymousId = () => {
  return Math.floor(1000 + Math.random() * 9000); // 1000~9999 사이의 랜덤 숫자
};

export default function AnonymousPage() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: posts, error, isLoading, mutate } = useSWR<Post[]>(
    "/api/anonymous",
    fetcher
  );

  const mappedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    author: `익명 ${post.anonymousId || generateAnonymousId()}`,
    date: post.created_at,
    views: 0,
    comments: 0,
    content: post.content
  })) || [];

  const totalPages = Math.ceil(mappedPosts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = mappedPosts.slice(startIndex, startIndex + pageSize);

  const handleSuccess = () => {
    mutate();
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h1" size="xl" mb={4}>
              익명 게시판
            </Heading>
            <Text color="gray.600" mb={4}>
              {session ? "익명 사용자" : "로그인 후 글 작성이 가능합니다."}
            </Text>
          </Box>
          <Flex justifyContent="flex-end">
            {session && (
              <Button colorScheme="blue" onClick={onOpen}>
                새글쓰기
              </Button>
            )}
          </Flex>
          {!isLoading && posts && (
            <PostList
              posts={currentPosts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isAnonymous={true}
            />
          )}
          {isLoading && <Text>로딩 중...</Text>}
          {error && <Text color="red.500">에러가 발생했습니다.</Text>}
        </VStack>
      </Container>
      <PostModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={handleSuccess}
        apiEndpoint="/api/anonymous"
        modalTitle="새 익명 게시글 작성"
      />
    </Layout>
  );
} 