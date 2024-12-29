"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Flex,
  ButtonGroup,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Post } from "../api/posts/[id]/route";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GridFormatBoard: React.FC = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session } = useSession(); // 로그인 세션
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 게시글 데이터 불러오기
  const { data, error } = useSWR<Post[]>("/api/posts", fetcher);
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  const posts = data.map((p) => ({
    id: p.id,
    title: p.title,
    author: p.author?.username,
    date: p.created_at,
    views: p.views,
    // comments: p.comments,
    // tag: p.tag,
    content: p.content,
  }));

  // 페이지네이션
  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = posts.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (postId: number) => {
    router.push(`/board/${postId}`);
  };

  // 색상 모드에 따른 스타일
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const headerBgColor = colorMode === "light" ? "gray.200" : "gray.700";
  const hoverBgColor = colorMode === "light" ? "gray.100" : "gray.600";

  // 새글쓰기 버튼 클릭 시 이동
  const handleNewPost = () => {
    router.push("/board/new");
  };

  return (
    <Layout>
      <Container
        width="100%"
        mt="10"
        boxShadow="xl"
        p="5"
        rounded="md"
        bg={bgColor}
        color={textColor}
      >
        {/* 상단 영역에 새글쓰기 버튼 (로그인 상태에서만 표시) */}
        <Flex justifyContent="flex-end" mb={4}>
          {session && (
            <Button colorScheme="blue" onClick={handleNewPost}>
              새글쓰기
            </Button>
          )}
        </Flex>

        <Box p={4} overflowX="hidden">
          <Table variant="simple" layout="fixed" width="100%">
            <Thead bg={headerBgColor}>
              <Tr>
                <Th fontWeight="bold" width="100%">
                  게시글 목록
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPosts.map((post) => (
                <Tr
                  key={post.id}
                  cursor="pointer"
                  _hover={{ bg: hoverBgColor }}
                  transition="background-color 0.2s"
                  onClick={() => handleRowClick(post.id)}
                >
                  <Td whiteSpace="normal" wordBreak="break-word">
                    <Flex
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box flex="1">
                        <Text fontWeight="bold">{post.title}</Text>
                        <Text fontSize="sm" mt={1}>
                          {post.author} | {post.date}
                        </Text>
                      </Box>
                      <Box textAlign="right" minW="50px" ml={4}>
                        <Text fontSize="sm">조회수: {post.views || 0} </Text>
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 페이지네이션 */}
        <Flex justify="center" mt={4}>
          <ButtonGroup size="sm" isAttached variant="outline">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
      </Container>
    </Layout>
  );
};

export default GridFormatBoard;
