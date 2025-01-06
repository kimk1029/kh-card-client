"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  VStack,
  Divider,
  Button,
  Input,
  FormControl,
  FormLabel,
  Container,
  useColorMode,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";

// Account(전체), User, Post, Comment 타입들
interface Account {
  user: UserType;
  posts: PostType[];
  comments: CommentType[];
}
interface UserType {
  id: number;
  username: string;
  email: string;
  created_at: string;
}
interface PostType {
  id: number;
  title: string;
  created_at: string;
}
interface CommentType {
  id: number;
  content: string;
  created_at: string;
  post: {
    id: number;
    title: string;
  };
}

// SWR용 fetcher

export default function AccountPage() {
  const { data: session } = useSession();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";

  // 1) 유저 정보 + 게시물 + 댓글을 한꺼번에 가져오기
  const {
    data: account,
    error: userError,
    isLoading: userLoading,
    mutate: mutateAccount,
  } = useSWR<Account>(session ? `/api/account/${session.user.id}` : null, {
    fetcher: async (url) => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
      });
      if (!res.ok) throw new Error("Fetch error");
      return res.json();
    },
  });

  // --- 유저 정보 수정 상태
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // --- 유저네임 변경
  const handleChangeUsername = async () => {
    if (!newUsername.trim() || !account) return;
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });
      if (!res.ok) throw new Error("Username update failed");

      // 변경 후 정보 다시 불러오기
      mutateAccount();
      setNewUsername("");
      alert("유저네임이 변경되었습니다!");
    } catch (err) {
      console.error(err);
      alert("유저네임 변경 실패");
    }
  };

  // --- 패스워드 변경
  const handleChangePassword = async () => {
    if (!newPassword.trim() || !account) return;
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!res.ok) throw new Error("Password update failed");

      setNewPassword("");
      alert("비밀번호가 변경되었습니다!");
    } catch (err) {
      console.error(err);
      alert("비밀번호 변경 실패");
    }
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
        {/* 1) 세션이 없으면 로그인 필요 */}
        {!session ? (
          <Box p={5}>
            <Text>로그인이 필요합니다.</Text>
          </Box>
        ) : userLoading ? (
          // 2) 유저 정보 로딩 중
          <Box p={5} display="flex" alignItems="center">
            <Spinner />
            <Text ml={2}>유저 정보를 불러오는 중...</Text>
          </Box>
        ) : userError ? (
          // 3) 유저 정보 불러오기 오류
          <Box p={5}>
            <Text color="red.500">유저 정보 불러오기 오류</Text>
          </Box>
        ) : (
          // 4) 정상적으로 유저 정보를 받아왔다면 메인 콘텐츠 표시
          account && (
            <Grid
              templateRows="repeat(2, auto)" // 2행
              templateColumns="repeat(2, 1fr)" // 2열
              gap={6}
            >
              {/* 첫 번째 행, 첫 번째 열: 내 정보 수정 섹션 */}
              <GridItem rowSpan={1} colSpan={1}>
                <Box>
                  <Heading mb={4} fontSize="xl">
                    내 정보 수정
                  </Heading>
                  <Text>아이디: {account.user.id}</Text>
                  <Text>유저네임: {account.user.username}</Text>
                  <Text>이메일: {account.user.email}</Text>
                  <Divider my={4} />

                  {/* 유저네임 변경 */}
                  <FormControl mb={3}>
                    <FormLabel>새 유저네임</FormLabel>
                    <Input
                      placeholder="새 유저네임 입력"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    onClick={handleChangeUsername}
                    mb={4}
                  >
                    유저네임 변경
                  </Button>

                  <Divider my={4} />

                  {/* 비밀번호 변경 */}
                  <FormControl mb={3}>
                    <FormLabel>새 비밀번호</FormLabel>
                    <Input
                      type="password"
                      placeholder="새 비밀번호 입력"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormControl>
                  <Button colorScheme="blue" onClick={handleChangePassword}>
                    비밀번호 변경
                  </Button>
                </Box>
              </GridItem>

              {/* 첫 번째 행, 두 번째 열: (비워두거나 다른 용도 가능) */}
              <GridItem rowSpan={1} colSpan={1}>
                {/* 필요하다면 다른 컴포넌트 추가 */}
              </GridItem>

              {/* 두 번째 행, 첫 번째 열: 내가 쓴 게시물 */}
              <GridItem rowSpan={1} colSpan={1}>
                <Box>
                  <Heading as="h2" size="md" mb={2}>
                    내가 작성한 게시물
                  </Heading>
                  {account.posts && account.posts.length > 0 ? (
                    <VStack align="stretch" spacing={3}>
                      {account.posts.map((post) => (
                        <Box key={post.id} p={3} borderWidth={1} rounded="md">
                          <Text fontWeight="bold">{post.title}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(post.created_at).toLocaleString()}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Text>작성한 게시물이 없습니다.</Text>
                  )}
                </Box>
              </GridItem>

              {/* 두 번째 행, 두 번째 열: 내가 쓴 댓글 */}
              <GridItem rowSpan={1} colSpan={1}>
                <Box>
                  <Heading as="h2" size="md" mb={2}>
                    내가 작성한 댓글
                  </Heading>
                  {account.comments && account.comments.length > 0 ? (
                    <VStack align="stretch" spacing={3}>
                      {account.comments.map((comment) => (
                        <Box
                          key={comment.id}
                          p={3}
                          borderWidth={1}
                          rounded="md"
                        >
                          <Text whiteSpace="pre-wrap">{comment.content}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(comment.created_at).toLocaleString()}
                          </Text>
                          <Text fontSize="sm" mt={1}>
                            게시글: #{comment.post.id} / {comment.post.title}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Text>작성한 댓글이 없습니다.</Text>
                  )}
                </Box>
              </GridItem>
            </Grid>
          )
        )}
      </Container>
    </Layout>
  );
}
