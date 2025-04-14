"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Flex,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Post } from "../api/posts/[id]/route";
import NewPostModal from "@/components/post/NewPostModal";
import PostList from "@/components/PostList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GridFormatBoard: React.FC = () => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, error, mutate } = useSWR<Post[]>("/api/posts", fetcher);
  const posts = data
    ? data.map((p) => ({
        id: p.id,
        title: p.title,
        author: p.author?.username,
        date: p.created_at,
        views: p.views,
        comments: p.comments,
        content: p.content,
      }))
    : [];

  if (!data) {
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Layout>
    );
  }

  const handleSuccess = () => {
    mutate();
  };

  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = posts.slice(startIndex, startIndex + pageSize);

  return (
    <Layout>
      <Container
        width="100%"
        mt="10"
        boxShadow="xl"
        p={{ base: 0, md: 4 }}
        rounded="md"
        maxWidth={"1100px"}
      >
        <Flex justifyContent="flex-end" mb={4}>
          {session && (
            <Button colorScheme="blue" onClick={onOpen}>
              새글쓰기
            </Button>
          )}
        </Flex>

        <PostList
          posts={currentPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
      <NewPostModal isOpen={isOpen} onClose={onClose} onSuccess={handleSuccess} />
    </Layout>
  );
};

export default GridFormatBoard;
