"use client";

import React, { useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
  useColorMode,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import useSWR, { mutate } from "swr";
import { Post } from "@/app/api/posts/[id]/route";
import { Comment } from "@/type";
import { useSession } from "next-auth/react";

const PostDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session, status } = useSession();
  const id = Number(params.id);
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  // 게시글 데이터 가져오기
  const { data, error } = useSWR<Post>(`/api/posts/${id}`, fetcher);
  const post = data;

  // 댓글 데이터 가져오기
  const { data: comments, error: commentsError } = useSWR<Comment[]>(
    `/api/posts/${id}/comments`,
    fetcher
  );

  // 새 댓글 상태
  const [newComment, setNewComment] = useState("");

  // 색상 모드 설정
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
          method: "DELETE",
        });
        if (!res.ok) throw new Error("삭제에 실패했습니다.");
        router.push("/board");
      } catch (err) {
        console.error(err);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 댓글 추가 핸들러
  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (!res.ok) throw new Error("댓글 추가에 실패했습니다.");
      setNewComment("");
      mutate(`/api/posts/${id}/comments`); // 댓글 데이터 갱신
    } catch (err) {
      console.error(err);
      alert("댓글 추가 중 오류가 발생했습니다.");
    }
  };

  // 오류 처리
  if (error) {
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
            <Text>게시글을 불러오는 중 오류가 발생했습니다.</Text>
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
        bg={bgColor}
        color={textColor}
      >
        {/* 작성자와 로그인 사용자가 동일할 경우 삭제 및 수정 버튼 표시 */}
        {session?.user && Number(session?.user.id) === post.author.id && (
          <Flex justifyContent="flex-end" mb={4}>
            <Button colorScheme="red" mr={2} onClick={handleDelete}>
              삭제
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => router.push(`/board/${id}/edit`)}
            >
              수정
            </Button>
          </Flex>
        )}

        {/* 게시글 제목 */}
        <Box mb={4}>
          <Heading as="h2" size="lg" wordBreak="break-word">
            {post.author.username && post.title
              ? `[${post.author.username}] ${post.title}`
              : post.title}
          </Heading>
        </Box>

        {/* 게시글 메타 정보 */}
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="sm">
            글쓴이: {post.author.username} |{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </Text>
          <Text fontSize="sm">조회수: {post.views}</Text>
        </Flex>
        <Divider mb={4} borderColor={dividerColor} />

        {/* 게시글 내용 */}
        <Box whiteSpace="pre-wrap" wordBreak="break-word" mb={4}>
          {post.content}
        </Box>
        <Divider mb={4} borderColor={dividerColor} />

        {/* 댓글 섹션 */}
        <Box mt={8}>
          <Heading as="h3" size="md" mb={4}>
            댓글
          </Heading>

          {/* 댓글 작성 폼 */}
          <Box as="form" onSubmit={handleAddComment} mb={6}>
            <VStack spacing={4} align="stretch">
              <Textarea
                placeholder="댓글을 작성하세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                isRequired
              />
              <Button type="submit" colorScheme="blue">
                댓글 남기기
              </Button>
            </VStack>
          </Box>

          {/* 댓글 표시 */}
          {commentsError && (
            <Text color="red.500">댓글을 불러오는 중 오류가 발생했습니다.</Text>
          )}
          {!comments && !commentsError && <Text>댓글을 불러오는 중...</Text>}
          {comments && comments.length === 0 && (
            <Text>현재 작성된 댓글이 없습니다.</Text>
          )}
          {comments && comments.length > 0 && (
            <VStack spacing={4} align="stretch">
              {comments
                .sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                )
                .map((comment) => (
                  <Box
                    key={comment.id}
                    p={4}
                    bg={colorMode === "light" ? "gray.100" : "gray.700"}
                    rounded="md"
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Box>
                        <Text fontWeight="bold">{comment.author.username}</Text>
                        <Text whiteSpace="pre-wrap" wordBreak="break-word">
                          {comment.content}
                        </Text>
                      </Box>
                      <Text fontSize="sm" color="gray.500" textAlign="right">
                        {new Date(comment.created_at).toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                ))}
            </VStack>
          )}
        </Box>

        <Divider mt={8} mb={4} borderColor={dividerColor} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">댓글수: {comments ? comments.length : 0}</Text>
          <Button colorScheme="blue" onClick={() => router.push("/board")}>
            목록으로 돌아가기
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
};

export default PostDetailPage;
