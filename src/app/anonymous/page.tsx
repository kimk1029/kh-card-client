"use client";

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import PostList from "@/components/PostList";
import Layout from "@/components/Layout";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  anonymousId: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export default function AnonymousPage() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: posts, error, isLoading } = useSWR<Post[]>(
    "/api/anonymous",
    fetcher
  );

  const mappedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    author: `익명 ${post.anonymousId}`,
    date: post.createdAt,
    views: 0,
    comments: 0,
    content: post.content
  })) || [];

  const totalPages = Math.ceil(mappedPosts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = mappedPosts.slice(startIndex, startIndex + pageSize);

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
          {!isLoading && posts && (
            <PostList
              posts={currentPosts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
          {isLoading && <Text>로딩 중...</Text>}
          {error && <Text color="red.500">에러가 발생했습니다.</Text>}
        </VStack>
      </Container>
    </Layout>
  );
} 