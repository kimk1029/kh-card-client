"use client";

import React from "react";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  useColorMode,
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { IconText } from "@/components/post/IconText";
import { timeAgo } from "@/lib/utils/time";
import { FaRegCommentDots } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  author?: string;
  date: string;
  views: number;
  comments: number;
  content: string;
}

interface PostListProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PostList({
  posts,
  currentPage,
  totalPages,
  onPageChange,
}: PostListProps) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const handleRowClick = (postId: number) => {
    if (postId) {
      router.push(`/board/${postId}`);
    }
  };

  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const headerBgColor = colorMode === "light" ? "gray.200" : "gray.700";
  const hoverBgColor = colorMode === "light" ? "gray.100" : "gray.600";

  return (
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
          {posts.length === 0 ? (
            <Tr>
              <Td colSpan={1}>
                <Text textAlign="center">게시글이 없습니다.</Text>
              </Td>
            </Tr>
          ) : (
            posts.map((post) => (
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
                      <IconText icon={FaRegCommentDots} text={post.comments} />
                      <IconText icon={TimeIcon} text={timeAgo(post.date)} />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* 페이지네이션 */}
      <Flex justify="center" mt={4}>
        <ButtonGroup size="sm" isAttached variant="outline">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
    </Box>
  );
} 