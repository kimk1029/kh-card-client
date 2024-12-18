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
} from "@chakra-ui/react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import DB from "../../../public/db.json";

// API 응답 구조에 맞는 인터페이스 정의

// 실제 화면에서 표시할 Post 타입 (필요한 정보만)
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GridFormatBoard: React.FC = () => {
  // const { data, error } = useSWR("/api/posts", fetcher);
  const data = DB;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // API로부터 받아온 데이터를 화면 표시용 Post 타입으로 매핑
  const posts: Post[] = data.posts.map((p) => ({
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
    console.log("Clicked post:", postId);
  };

  return (
    <Layout>
      <Container
        width="100%"
        mt="10"
        boxShadow="xl"
        p="5"
        rounded="md"
        bg="white"
      >
        <Box p={4} overflowX="hidden">
          <Table variant="simple" layout="fixed" width="100%">
            <Thead bg="gray.200">
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
                  _hover={{ bg: "gray.100" }}
                  transition="background-color 0.2s"
                  onClick={() => handleRowClick(post.id)}
                >
                  <Td whiteSpace="normal" wordBreak="break-word">
                    <Flex
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      {/* 왼쪽 영역 */}
                      <Box flex="1">
                        {/* 첫번째 줄: 글의종류(태그) 제목 [댓글수] */}
                        <Text fontWeight="bold">
                          [{post.tag}] {post.title} [{post.comments}]
                        </Text>
                        {/* 두번째 줄: 글쓴이 날짜 */}
                        <Text fontSize="sm" mt={1}>
                          {post.author} | {post.date}
                        </Text>
                      </Box>
                      {/* 오른쪽 영역: 조회수(오른쪽 정렬) */}
                      <Box textAlign="right" minW="50px" ml={4}>
                        <Text fontSize="sm" color="gray.600">
                          조회수 {post.views}
                        </Text>
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
