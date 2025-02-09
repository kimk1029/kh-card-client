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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Post } from "../api/posts/[id]/route";
import { TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { IconText } from "@/components/post/IconText";
import { timeAgo } from "@/lib/utils/time";
import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa";
import NewPostModal from "@/components/post/NewPostModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GridFormatBoard: React.FC = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session } = useSession(); // 로그인 세션
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 게시글 데이터 불러오기
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
  // 리스트 갱신 함수 (게시글 작성 성공시 호출)
  const handleSuccess = () => {
    // 이 때 mutate("/api/posts")를 호출하여 해당 key의 데이터만 새로고침
    mutate();
    // 필요하다면 setCurrentPage(1) 등으로 페이지도 첫 페이지로 돌릴 수 있음
  };

  // 페이지네이션
  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = posts.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (postId: number) => {
    if (postId) {
      router.push(`/board/${postId}`);
    }
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
        p={{ base: 0, md: 4 }}
        rounded="md"
        bg={bgColor}
        color={textColor}
        maxWidth={"1100px"}
      >
        {/* 상단 영역에 새글쓰기 버튼 (로그인 상태에서만 표시) */}
        <Flex justifyContent="flex-end" mb={4}>
          {session && (
            <Button colorScheme="blue" onClick={onOpen}>
              새글쓰기
            </Button>
          )}
        </Flex>

        <Box p={{ base: 0, md: 4 }} overflowX="hidden">
          <Table variant="simple" layout="fixed" width="100%">
            <Thead bg={headerBgColor}>
              <Tr>
                <Th fontWeight="bold" width="100%">
                  게시글 목록
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPosts.length === 0 ? (
                <Tr>
                  <Td colSpan={1}>
                    <Text textAlign="center">게시글이 없습니다.</Text>
                  </Td>
                </Tr>
              ) : (
                currentPosts.map((post) => (
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
                        alignItems={{ base: "flex-start", md: "center" }}
                        flexDirection={{ base: "column", md: "row" }}
                        position={"relative"}
                      >
                        <Box flex="1">
                          <Text fontWeight="bold">{post.title}</Text>
                          <Text fontSize="sm" mt={2}>
                            소속 | {post.author}
                          </Text>
                        </Box>
                        <Box
                          textAlign="right"
                          minW="50px"
                          ml={{ base: 0, md: 4 }}
                          w={{ base: "100%", md: "10%" }}
                          display={"flex"}
                          flexDirection={{ base: "row", md: "column" }}
                        >
                          <IconText icon={ViewIcon} text={post.views} />
                          <IconText
                            icon={FaRegCommentDots}
                            text={post.comments}
                          />
                          <IconText icon={TimeIcon} text={timeAgo(post.date)} />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              )}
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
      <NewPostModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={handleSuccess}
      />
    </Layout>
  );
};

export default GridFormatBoard;
