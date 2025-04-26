"use client";

import { Container, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import useSWR from "swr";
import axios from "axios";
import { useParams } from "next/navigation";
import PostContent from "@/components/post/PostContent";
import { Post } from "@/app/api/posts/[id]/route";


const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export default function AnonymousPostPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: session } = useSession();
  const { data: post, error, isLoading } = useSWR<Post>(
    `/api/anonymous/${id}`,
    fetcher
  );

  if (isLoading) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Text>로딩 중...</Text>
        </Container>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Text color="red.500">게시글을 불러오는데 실패했습니다.</Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <PostContent post={post} isAnonymous={true} backUrl="/anonymous" />
      </Container>
    </Layout>
  );
}
