import React from 'react';
import { Flex, Box, Text, Stack, Icon } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '@chakra-ui/icons';

// Mock data for popular posts
type Post = {
    id: string;
    title: string;
    rank: number;
    company: string;
    trend: 'up' | 'down' | 'same';
};

const popularPosts: Post[] = [
    { id: 'p1', title: 'AI in Healthcare', rank: 1, company: 'MedTech', trend: 'same' },
    { id: 'p2', title: 'Remote Work Challenges', rank: 2, company: 'WorkCorp', trend: 'up' },
    { id: 'p3', title: 'Space Tech Innovations', rank: 3, company: 'SpaceTech', trend: 'down' },
    { id: 'p4', title: 'New Health Benefits', rank: 4, company: 'HealthCo', trend: 'down' },
    { id: 'p5', title: 'Software Engineering Trends', rank: 5, company: 'DevCorp', trend: 'same' },
    { id: 'p6', title: 'Investment Strategies', rank: 6, company: 'FinGroup', trend: 'up' },
    { id: 'p7', title: 'New Business Opportunities', rank: 7, company: 'BizCorp', trend: 'same' },
    { id: 'p8', title: 'Tech Start-up Funding', rank: 8, company: 'TechVenture', trend: 'up' },
    { id: 'p9', title: 'Marketing Insights 2025', rank: 9, company: 'MarketPro', trend: 'down' },
    { id: 'p10', title: 'Career Development Tips', rank: 10, company: 'CareerPath', trend: 'same' },
];

const PopularPosts: React.FC = () => {
    return (
        <Stack spacing={1}>
            {popularPosts.map((post) => (
                <Flex
                    key={post.id}
                    role="group"
                    align="center"
                    p={1}
                    borderBottomWidth="1px"
                    borderColor="gray.100"
                    _last={{ borderBottomWidth: 0 }}
                    _hover={{ bg: 'gray.50' }}
                >
                    <Box w={6} textAlign="center" fontSize="xs" color="gray.500" fontWeight="medium">
                        {post.rank}
                    </Box>

                    <Box ml={2} flex={1}>
                        <Text
                            fontSize="xs"
                            fontWeight="medium"
                            color="gray.900"
                            _groupHover={{ color: 'blue.600' }}
                            noOfLines={1}
                        >
                            {post.title}
                        </Text>
                        <Text fontSize="10px" color="gray.400">
                            {post.company}
                        </Text>
                    </Box>

                    <Box ml={1}>
                        {post.trend === 'up' && <Icon as={ArrowUpIcon} boxSize={3} color="red.500" />}
                        {post.trend === 'down' && <Icon as={ArrowDownIcon} boxSize={3} color="blue.500" />}
                        {post.trend === 'same' && <Icon as={MinusIcon} boxSize={3} color="gray.300" />}
                    </Box>
                </Flex>
            ))}
        </Stack>
    );
};

export default PopularPosts;
