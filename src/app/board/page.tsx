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
  useColorMode, // 추가
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import DB from "../../../public/db.json";

const GridFormatBoard: React.FC = () => {
  const router = useRouter();
  const { colorMode } = useColorMode(); // 현재 색상 모드(light/dark) 가져오기

  const data = DB;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (!data) return <div>Loading...</div>;

  const posts = data.posts.map((p) => ({
    id: p.id,
    title: p.title,
    author: p.author,
    date: p.date,
    views: p.views,
    comments: p.comments,
    tag: p.tag,
    content: p.content,
  }));

  const totalPages = Math.ceil(data.posts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = posts.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (postId: number) => {
    router.push(`/board/${postId}`);
  };

  // 색상 모드에 따른 스타일 변수
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const headerBgColor = colorMode === "light" ? "gray.200" : "gray.700";
  const hoverBgColor = colorMode === "light" ? "gray.100" : "gray.600";

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
                        <Text fontWeight="bold">
                          [{post.tag}] {post.title} [{post.comments}]
                        </Text>
                        <Text fontSize="sm" mt={1}>
                          {post.author} | {post.date}
                        </Text>
                      </Box>
                      <Box textAlign="right" minW="50px" ml={4}>
                        <Text fontSize="sm">조회수 {post.views}</Text>
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

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
