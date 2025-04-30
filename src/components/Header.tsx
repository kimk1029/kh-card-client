"use client";
import {
  Box,
  Flex,
  HStack,
  Text,
  Link,
  Button,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => (
  <Box
    as="header"
    bg="white"
    borderBottomWidth="1px"
    position="sticky"
    top="0"
    zIndex="50"
  >
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
      {/* Secondary navigation */}
      <Flex
        justify="space-between"
        align="center"
        py={2}
        fontSize="xs"
        borderBottomWidth="1px"
      >
        <Link
          href="/"
          color="gray.600"
          _hover={{ color: "gray.900", textDecoration: "none" }}
          display="flex"
          alignItems="center"
        >
          <Text>Portal Services</Text>
          <Text as="span" ml={1}>→</Text>
        </Link>
        <HStack spacing={4}>
          <Link
            href="/help"
            color="gray.600"
            _hover={{ color: "gray.900", textDecoration: "none" }}
          >
            Help
          </Link>
          <Link
            href="/contact"
            color="gray.600"
            _hover={{ color: "gray.900", textDecoration: "none" }}
          >
            Contact
          </Link>
        </HStack>
      </Flex>

      {/* Main navigation */}
      <Flex py={3} align="center" justify="space-between">
        <HStack spacing={6}>
          <Link
            href="/"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize="xl" fontWeight="bold" color="blue.600">
              Portal Pulse
            </Text>
            <Badge
              ml={2}
              textTransform="uppercase"
              fontSize="10px"
              fontWeight="bold"
              borderWidth="1px"
              borderColor="blue.600"
            >
              TOPIC
            </Badge>
          </Link>

          {/* Desktop-only nav links */}
          <HStack spacing={2} display={{ base: "none", md: "flex" }}>
            {/* Topics dropdown */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                fontSize="sm"
                rightIcon={<ChevronDownIcon />}
              >
                Topics
              </MenuButton>
              <MenuList p={4} minW="400px">
                <SimpleGrid columns={2} spacing={2}>
                  {[
                    "Technology",
                    "Science",
                    "Health",
                    "Business",
                    "Entertainment",
                  ].map((topic) => (
                    <Link
                      key={topic}
                      href="/"
                      as={MenuItem}
                      borderRadius="md"
                      _hover={{ bg: "gray.50", textDecoration: "none" }}
                    >
                      {topic}
                    </Link>
                  ))}
                </SimpleGrid>
              </MenuList>
            </Menu>

            {["Home", "Company", "Career"].map((label) => (
              <Link
                key={label}
                href="/"
                px={4}
                py={2}
                fontSize="sm"
                color="gray.700"
                _hover={{ color: "blue.600", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/jobs"
              px={4}
              py={2}
              fontSize="sm"
              color="gray.700"
              _hover={{ color: "blue.600", textDecoration: "none" }}
              display="flex"
              alignItems="center"
            >
              <Text>Jobs</Text>
              <Badge ml={1} fontSize="10px" colorScheme="red">
                AD
              </Badge>
            </Link>
          </HStack>
        </HStack>

        {/* Action buttons */}
        <HStack spacing={2}>
          <Button size="sm" colorScheme="red" variant="solid">
            Write
          </Button>
          <Button size="sm" variant="outline">
            Login
          </Button>
        </HStack>
      </Flex>
    </Box>
  </Box>
);

export default Header;