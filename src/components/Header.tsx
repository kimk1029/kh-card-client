"use client";
import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  const username = session?.user?.name || session?.user?.email || "Guest";
  const userImage =
    session?.user?.image ||
    "https://avatars.dicebear.com/api/male/username.svg";

  const handleLogin = (): void => {
    if (session) {
      window.location.href = "/";
    } else {
      window.location.href = "/auth";
    }
  };

  const handleLogout = (): void => {
    signOut({ callbackUrl: "/" });
  };

  const renderUserSection = () => {
    if (!session) {
      return (
        <Button onClick={handleLogin} colorScheme="blue">
          로그인
        </Button>
      );
    }
    return (
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} src={userImage} />
        </MenuButton>
        <MenuList alignItems={"center"}>
          <br />
          <Center>
            <Avatar size={"2xl"} src={userImage} />
          </Center>
          <br />
          <Center>
            <Text>{username}</Text>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>Your Servers</MenuItem>
          <MenuItem as={NextLink} href="/account">
            Account Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} isDisabled={!session}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Box
      position="sticky"
      top="0"
      bg={useColorModeValue("white", "gray.900")}
      zIndex="150"
      boxShadow="sm"
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        maxW="1140px"
        mx="auto"
        px={4}
        py={{ base: 3, lg: 4 }}
        minH={{ base: "61px", lg: "80px" }}
        borderBottom={{ base: "0", lg: "1px solid #d4d4d4" }}
        position="relative"
        sx={{
          "::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: "1px solid #d4d4d4",
            backgroundColor: "#fff",
            zIndex: 1,
          },
        }}
      >
        {/* Logo */}
        <HStack spacing={4}>
          <Link href="/kr/" display="flex" alignItems="center">
            <Text>blind</Text>
          </Link>
        </HStack>

        {/* Navigation */}
        <HStack
          as="nav"
          spacing={8}
          display={{ base: "none", lg: "flex" }}
          borderTop={{ base: "1px solid #dfe1e4", lg: "none" }}
          px={{ base: 0, lg: 8 }}
        >
          <Link
            href="/kr/"
            fontSize={{ base: "sm", lg: "md" }}
            _hover={{ color: "gray.600" }}
          >
            홈
          </Link>
          <Link
            href="/kr/company"
            fontSize={{ base: "sm", lg: "md" }}
            _hover={{ color: "gray.600" }}
          >
            기업 리뷰
          </Link>
          <Link
            href="/kr/topics/%EC%B1%84%EC%9A%A9-%EC%A0%84%EC%B2%B4"
            fontSize={{ base: "sm", lg: "md" }}
            _hover={{ color: "gray.600" }}
          >
            채용공고{" "}
            <Text as="sup" fontSize="xs">
              blind Hire
            </Text>
          </Link>
        </HStack>

        {/* Search and Actions */}
        <HStack spacing={4}>
          {/* Search */}
          <InputGroup display={{ base: "none", lg: "flex" }}>
            <VisuallyHidden>검색</VisuallyHidden>
            <Input
              placeholder="관심있는 내용을 검색해보세요!"
              name="keyword"
              type="search"
              autoComplete="off"
              variant="outline"
              size="sm"
            />
            <InputRightElement>
              <IconButton
                aria-label="검색"
                icon={<SearchIcon />}
                size="sm"
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>

          {/* Board Menu */}
          <Box as="a" href="/board">
            <Button variant="ghost">Board</Button>
          </Box>

          {/* Theme Toggle */}
          <IconButton
            aria-label="테마 변경"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />

          {/* User Section */}
          {renderUserSection()}
        </HStack>
      </Flex>
    </Box>
  );
}
