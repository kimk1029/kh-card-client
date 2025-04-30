"use client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Grid,
  GridItem,
  Stack,
  HStack,
  Flex,
  Text,
  Button,
  Badge,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import YouTubeBackground from "./YouTubeBackground";
import { Topic } from "@/type";
import CategoryPosts from "@/components/CategoryPosts";
import PopularPosts from "@/components/PopularPosts";
const Home = () => {
  const { data: session } = useSession();
  const categories: Topic[] = [
    'technology',
    'science',
    'health',
    'business',
    'entertainment',
  ];
  const [activeCategories, setActiveCategories] = useState<Topic[]>(categories);

  // Chakra UI breakpoint-based mobile check
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  const toggleCategory = (category: Topic) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  return (
    <Layout>
      {/* Main content */}
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }} py={6}>
        {/* Banner */}
        <Box
          h={{ base: 32, md: 48 }}
          bgGradient="linear(to-r, blue.600, #4F46E5)"
          borderRadius="lg"
          mb={6}
          position="relative"
          overflow="hidden"
        >
          <Flex
            position="absolute"
            inset={0}
            align="center"
            justify="space-between"
            px={{ base: 6, md: 10 }}
          >
            <Box color="white">
              <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold">
                Portal Pulse Community
              </Text>
              <Text fontSize={{ base: 'xs', md: 'md' }}>
                Join the conversation today
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Category filter buttons */}
        <HStack
          spacing={2}
          overflowX="auto"
          mb={6}
          py={2}
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={activeCategories.includes(category) ? 'solid' : 'outline'}
              onClick={() => toggleCategory(category)}
              borderRadius="full"
              textTransform="capitalize"
              fontSize="xs"
              whiteSpace="nowrap"
            >
              {category}
            </Button>
          ))}
        </HStack>

        {/* Two column layout */}
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={{ base: 4, md: 6 }}>
          {/* Left column */}
          <Stack spacing={{ base: 4, md: 6 }}>
            {activeCategories.map((category) => (
              <CategoryPosts key={category} category={category} />
            ))}
          </Stack>

          {/* Right column */}
          <Box>
            <Box
              borderWidth="1px"
              borderRadius="md"
              shadow="sm"
              position={isMobile ? 'static' : 'sticky'}
              top={isMobile ? undefined : '5rem'}
              overflow={isMobile ? undefined : 'hidden'}
            >
              <Box px={4} py={3} borderBottomWidth="1px">
                <HStack>
                  <Badge colorScheme="red" fontSize="10px">
                    HOT
                  </Badge>
                  <Text fontSize="sm" fontWeight="bold">
                    Real-time Popular Posts
                  </Text>
                </HStack>
              </Box>
              <Box p={0}>
                {isMobile ? (
                  <Box p={4}>
                    <PopularPosts />
                  </Box>
                ) : (
                  <Box h="360px" overflowY="auto" pr={2}>
                    <PopularPosts />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
