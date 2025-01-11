// PostDetailPage.tsx
"use client";

import React, { useState, FormEvent, useEffect } from "react";
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
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PostDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 상태 관리
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 상태 관리
  const id = Number(params.id);
  const { data: post, error } = useSWR<Post>(`/api/posts/${id}`, fetcher);
  const { mutate } = useSWR<any>(
    `/api/posts/${id}/like`,
    (url: string) =>
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
      }).then((res) => res.json()),
    {
      revalidateOnMount: false, // 처음 렌더링 시 자동 요청 방지
      suspense: false,
    }
  );
  useEffect(() => {
    if (post?.likeCount && post?.likeCount > 0) {
      setLikeCount(post?.likeCount);
    }
  }, [post]);

  // --- 색상 모드
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

  // --- 게시글 삭제
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
  const handleLike = async () => {
    try {
      const response = await mutate(); // 클릭 시 요청 트리거
      if (response) {
        // 좋아요 수 업데이트
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsLiked(!isLiked);

        // 애니메이션 트리거
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300); // 애니메이션 지속 시간
      }
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
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

  if (!post) {
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
      <Flex
        className="container wrapped"
        direction={{ base: "column", lg: "row" }}
        borderTop={{ base: "1px solid #d4d4d4", lg: "none" }}
        p={{ base: "20px 10px", lg: "40px 20px 0" }}
        maxW="1140px"
        mx="auto"
        boxSizing="border-box"
        mt={10}
        boxShadow="xl"
        rounded="md"
        bg={bgColor}
        color={textColor}
      >
        {/* Main Content */}
        <Box flex="3" mr={{ lg: "20px" }}>
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
          <Box zIndex={10} p={{ base: "0 0 12px" }}>
            {/* 게시글 제목 */}
            <Heading
              as="h2"
              size="lg"
              wordBreak="break-word"
              fontSize={{ base: "24px" }}
              lineHeight={{ base: "32px" }}
              mt={{ base: "15px", lg: "15px" }}
              fontWeight={"bold"}
            >
              {post.title}
            </Heading>
            <Text
              fontSize="14px"
              display={"flex"}
              alignItems={"center"}
              mt={"16px"}
              lineHeight={"16px"}
            >
              소속 - {post.author.username}{" "}
            </Text>
            {/* 게시글 메타 정보 */}
            <Flex w={{ base: "100%" }} fontSize={{ base: "14px" }} mt={"8px"}>
              <IconText icon={ViewIcon} text={post.views} />
              <IconText
                icon={TimeIcon}
                text={new Date(post.created_at).toLocaleString()}
              />
            </Flex>
          </Box>
          <Divider mb={4} borderColor={dividerColor} />
          {/* 게시글 내용 */}
          <Box whiteSpace="pre-wrap" wordBreak="break-word" mb={4} minH="300px">
            {post.content}
          </Box>
          <Divider mb={4} borderColor={dividerColor} />
          <ButtonGroup gap={4}>
            {/* 좋아요 버튼 */}
            <Button
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              p={0}
              onClick={handleLike}
            >
              <IconText
                icon={isAnimating || isLiked ? FaThumbsUp : FaRegThumbsUp}
                text={likeCount}
                fontSize="16px"
                color={textColor}
                animation={isAnimating ? "pop 0.3s ease-in-out" : undefined}
              />
            </Button>

            {/* 댓글 버튼 */}
            <Button bg={"transparent"} _hover={{ bg: "transparent" }} p={0}>
              <IconText
                icon={FaRegCommentDots}
                text={post.commentCount}
                fontSize="16px"
                color={textColor}
              />
            </Button>
          </ButtonGroup>
          {/* 태그 */}
          <HStack spacing={2} mb={8}>
            {/* {post.tags.map((tag, index) => (
              <Tag key={index} variant="solid" colorScheme="teal">
                {tag}
              </Tag>
            ))} */}
          </HStack>
          {/* 정보 기능 */}
          <HStack spacing={4} mb={8}>
            <Button variant="ghost">
              <VisuallyHidden>북마크</VisuallyHidden>
              북마크
            </Button>
            <Button variant="ghost">
              <VisuallyHidden>링크복사</VisuallyHidden>
              링크복사
            </Button>
            <Button variant="ghost">
              <VisuallyHidden>퍼가기</VisuallyHidden>
              퍼가기
            </Button>
          </HStack>
          {/* 댓글 섹션 */}
          <Comments postId={id} />
        </Box>

        {/* Sidebar */}
        {/* 추천 글 */}
        <Aside />

        {/* 추가 사이드바 섹션들 (예: 광고, 추천 위젯 등) 필요 시 추가 */}
      </Flex>
    </Layout>
  );
};

export default PostDetailPage;
