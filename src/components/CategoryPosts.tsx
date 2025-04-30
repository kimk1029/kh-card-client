import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Icon,
    List,
    ListItem,
    HStack,
} from '@chakra-ui/react';

// mockAllPosts 데이터는 기존 코드에서 그대로 가져오시면 됩니다
import { Topic } from '@/type';
import mockAllPosts from '@/app/data/mockAllPosts';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FaComment, FaThumbsUp } from 'react-icons/fa';

interface CategoryPostsProps {
    category: Topic;
}

const CategoryPosts = ({ category }: CategoryPostsProps) => {
    const posts = mockAllPosts;

    return (
        <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="sm"
            overflow="hidden"
        >
            {/* 헤더 */}
            <Flex
                bg="white"
                borderBottom="1px"
                borderColor="gray.200"
                px={4}
                py={2}
                align="center"
                justify="space-between"
            >
                <Heading as="h3" size="sm" textTransform="capitalize" color="gray.800">
                    {category}
                </Heading>
                <Button
                    variant="ghost"
                    size="sm"
                    fontSize="xs"
                    color="gray.500"
                    _hover={{ color: 'sky.600', bg: 'transparent' }}
                    rightIcon={<Icon as={ChevronRightIcon} boxSize={2.5} />}
                >
                    More
                </Button>
            </Flex>

            {/* 콘텐츠 리스트 */}
            <Box>
                <List spacing={0}>
                    {posts.map((post) => (
                        <ListItem
                            key={post.id}
                            px={3}
                            py={2}
                            _hover={{ bg: 'gray.50' }}
                            borderBottom="1px"
                            borderColor="gray.100"
                            _last={{ borderBottom: '0' }}
                        >
                            <Flex
                                direction={{ base: 'column', sm: 'row' }}
                                justify="space-between"
                            >
                                <Box flex="1">
                                    <Box as="a" href="#" _hover={{ textDecoration: 'none' }}>
                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            color="gray.900"
                                            _hover={{ color: 'sky.600' }}
                                            noOfLines={1}
                                        >
                                            {post.title}
                                        </Text>
                                        <HStack spacing={1} mt={1} fontSize="10px" color="gray.400">
                                            <Text>{post.author?.username}</Text>
                                            <Text>•</Text>
                                            <Text>{post.created_at}</Text>
                                        </HStack>
                                    </Box>
                                </Box>

                                <HStack spacing={3} mt={{ base: 1, sm: 0 }} align="center">
                                    <HStack spacing={1} fontSize="10px" color="gray.400">
                                        <Icon as={FaThumbsUp} boxSize={2.5} />
                                        <Text>{post.likeCount}</Text>
                                    </HStack>
                                    <HStack spacing={1} fontSize="10px" color="gray.400">
                                        <Icon as={FaComment} boxSize={2.5} />
                                        <Text>{post.commentCount}</Text>
                                    </HStack>
                                </HStack>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default CategoryPosts;
