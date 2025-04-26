"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
  useColorMode,
  HStack,
  Tag,
  VisuallyHidden,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { FaRegCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { IconText } from "@/components/post/IconText";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApi } from "@/hooks/useApi";
import Comments from "@/components/post/Comments";

interface Author {
  id: number;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author?: Author;
  anonymousId?: string;
  views: number;
  commentCount: number;
  likeCount: number;
  liked: boolean;
}

interface PostContentProps {
  post: Post;
  isAnonymous?: boolean;
  backUrl: string;
}

export default function PostContent({ post, isAnonymous = false, backUrl }: PostContentProps) {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const { post: postApi, del } = useApi();
  const toast = useToast();
  const [likeCount, setLikeCount] = useState<number>(post.likeCount || 0);
  const [isLiked, setIsLiked] = useState<boolean>(post.liked || false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);

  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const dividerColor = colorMode === "light" ? "gray.300" : "gray.600";

  const handleDelete = async () => {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
      try {
        const response = await del(`/api/posts/${post.id}`);
        if (!response) throw new Error("삭제에 실패했습니다.");
        toast({
          title: "게시글 삭제 완료",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.push(backUrl);
      } catch (err) {
        console.error(err);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleLike = async () => {
    try {
      if (!session) {
        alert("로그인 후 사용해주세요.");
        router.push("/auth");
        return;
      }
      const response = await postApi(`/api/posts/${post.id}/like`, {});
      if (!response) throw new Error("좋아요 실패했습니다.");
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked(!isLiked);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
  };

  const handleCommentForm = () => {
    if (!session) {
      alert("로그인 후 사용해주세요.");
      router.push("/auth");
      return;
    }
    setShowForm(!showForm);
  };

  return (
    <Flex
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
      <Box flex="3" mr={{ lg: "20px" }}>
        {session?.user && Number(session?.user.id) === post.author?.id && (
          <Flex justifyContent="flex-end" mb={4}>
            <Button colorScheme="red" mr={2} onClick={handleDelete}>
              삭제
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => router.push(`/board/${post.id}/edit`)}
            >
              수정
            </Button>
          </Flex>
        )}
        <Box zIndex={10} p={{ base: "0 0 12px" }}>
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
            소속 - {isAnonymous ? `익명 ${post.anonymousId}` : post.author?.username}
          </Text>
          <Flex w={{ base: "100%" }} fontSize={{ base: "14px" }} mt={"8px"}>
            <IconText icon={ViewIcon} text={post.views} />
            <IconText
              icon={TimeIcon}
              text={new Date(post.created_at).toLocaleString()}
            />
          </Flex>
        </Box>
        <Divider mb={4} borderColor={dividerColor} />
        <Box whiteSpace="pre-wrap" wordBreak="break-word" mb={4} minH="300px">
          {post.content}
        </Box>
        <Divider mb={4} borderColor={dividerColor} />
        <ButtonGroup gap={4}>
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
          <Button
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            p={0}
            onClick={handleCommentForm}
          >
            <IconText
              icon={FaRegCommentDots}
              text={post.commentCount}
              fontSize="16px"
              color={textColor}
            />
          </Button>
        </ButtonGroup>
        <HStack spacing={2} mb={8}>
          {/* 태그가 있다면 여기에 추가 */}
        </HStack>
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
        <Comments 
          postId={post.id} 
          showForm={showForm} 
          setShowForm={setShowForm} 
          isAnonymous={isAnonymous}
        />
      </Box>
    </Flex>
  );
} 