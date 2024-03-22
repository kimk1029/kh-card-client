"use client";
import { Container, Grid, GridItem, Text, Box } from "@chakra-ui/react";
import postsData from "../../../public/posts.json"; // Adjust the path as necessary
import Layout from "@/components/Layout";

const GridFormatBoard = () => {
  return (
    <Layout>
      <Container
        maxW="800px"
        mt="10"
        boxShadow="xl"
        p="5"
        rounded="md"
        bg="white"
      >
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {postsData.posts.map((post, index) => (
            <GridItem
              key={post.id}
              bg="gray.50"
              p={4}
              rounded="md"
              boxShadow="md"
            >
              <Text fontWeight="bold">Index: {index + 1}</Text>
              <Text>Title: {post.title}</Text>
              <Text>Author: {post.author}</Text>
              <Text>Date: {post.date}</Text>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};
export default GridFormatBoard;
