// PostDetailPage.tsx
"use client";

import React, { useState, FormEvent, useEffect, useMemo } from "react";
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
  Spinner,
  HStack,
  Tag,
  VisuallyHidden,
  Input,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import useSWR, { mutate } from "swr";
import { Post } from "@/app/api/posts/[id]/route";
import { Comment } from "@/type";
import { useSession } from "next-auth/react";
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { IconText } from "@/components/post/IconText";
import { Aside } from "@/components/post/Aside";
import Comments from "@/components/post/Comments";
import { FaRegCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useApi } from "@/hooks/useApi";
import PostContent from "@/components/post/PostContent";

const URL_LIKE_POST = (id: number | string) => `/api/posts/${id}/like`;
const URL_POST_POST = (id: number | string) => `/api/posts/${id}`;

const PostDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { get, post, del } = useApi();
  const { colorMode } = useColorMode();
  const { data: session, status } = useSession();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 상태 관리
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 상태 관리
  const [showForm, setShowForm] = useState(false);
  const id = Number(params.id);
  const { data: postData, error } = useSWR<Post>(URL_POST_POST(id), get);
  const toast = useToast();

  useEffect(() => {
    if (postData?.likeCount && postData?.likeCount > 0) {
      setLikeCount(postData?.likeCount);
    }
    if (postData?.liked) setIsLiked(true);
  }, [postData]);

  // --- 색상 모드
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

  // --- 게시글 삭제
  const handleDelete = async () => {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
      try {
        const response = await del(URL_POST_POST(id));
        if (!response) throw new Error("삭제에 실패했습니다.");
        toast({
          title: "게시글 삭제 완료",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.push("/board");
      } catch (err) {
        console.error(err);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // Handle like action
  const handleLike = async () => {
    try {
      if (status === "unauthenticated") {
        alert("로그인 후 사용해주세요.");
        router.push("/auth");
        return;
      }
      const response = await post(URL_LIKE_POST(id),{});
      if (!response) throw new Error("좋아요 실패했습니다.");
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked(!isLiked);

      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      return response;
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
  };
  const handleCommentForm = () => {
    if (status === "unauthenticated") {
      alert("로그인 후 사용해주세요.");
      router.push("/auth");
      return;
    }
    setShowForm(!showForm);
  };

  // --- 일반 댓글 추가

  // --- 오류 처리
  if (error) {
    return (
      <Layout>
        <Container
          maxW="1140px"
          mt={10}
          color={textColor}
          bg={bgColor}
          boxShadow="xl"
          p="5"
          rounded="md"
          borderTop="1px solid #d4d4d4"
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          padding={{ base: "20px 10px", lg: "40px 20px 0" }}
          margin="0 auto"
          boxSizing="border-box"
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

  if (!postData) {
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <PostContent post={postData} backUrl="/board" />
      </Container>
    </Layout>
  );
};

export default PostDetailPage;
