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
  List,
  ListItem,
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
    window.location.href = session ? "/" : "/auth";
  };

  const handleLogout = (): void => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Box
      position="sticky"
      top="0"
      bg={useColorModeValue("white", "gray.900")}
      zIndex="150"
      boxShadow="sm"
      minH={"61px"}
    >
      <Box
        as="header"
        minH={{ base: "61px", lg: "80px" }}
        mx="auto"
        height={{ base: "80px", lg: "80px" }}
        borderBottom={{ base: "0", lg: "1px solid #d4d4d4" }}
        position="relative"
      >
        <Box
          maxW="1140px"
          position="relative"
          height={"100%"}
          m={"0 auto"}
          sx={{
            "::after": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            },
          }}
        >
          {/* Logo */}
          <HStack
            spacing={4}
            position="absolute"
            top="50%"
            left="20px"
            transform={"translateY(-50%)"}
            zIndex={10}
          >
            <Link href="/" display="flex" alignItems="center">
              <Text>KHCARD</Text>
            </Link>
          </HStack>

          {/* Navigation */}
          <HStack
            as="nav"
            spacing={8}
            display={{ base: "block" }}
            padding={{ base: "0 100px 0 100px", md: "0 190px 0 160px" }}
            position={"relative"}
            border={"none"}
            w={"auto"}
            h={"100%"}
            overflow={"hidden"}
          >
            <Flex
              alignItems={"center"}
              m={0}
              height={"inherit"}
              overflow={"hidden"}
            >
              <Box m={{ base: "0 15px 0 10px" }}>
                <List
                  as="ul"
                  position={"relative"}
                  w={"100%"}
                  h={"100%"}
                  zIndex={1}
                  display={"flex"}
                  listStyleType={"none"}
                  p={0}
                  m={0}
                >
                  <ListItem
                    pt={0}
                    position={"relative"}
                    cursor={"pointer"}
                    mr={"22px"}
                    fontSize={"20px"}
                    fontWeight={"normal"}
                    wordBreak={"keep-all"}
                  >
                    <Link
                      href="/"
                      fontSize={{ base: "sm", lg: "md" }}
                      _hover={{ color: "gray.600" }}
                      display={"inline-block"}
                      p={"4px"}
                      textDecoration={"none"}
                      cursor={"pointer"}
                    >
                      홈
                    </Link>
                  </ListItem>
                  <ListItem
                    pt={0}
                    position={"relative"}
                    cursor={"pointer"}
                    mr={"22px"}
                    fontSize={"20px"}
                    fontWeight={"normal"}
                    wordBreak={"keep-all"}
                  >
                    <Link
                      href="/board"
                      fontSize={{ base: "sm", lg: "md" }}
                      _hover={{ color: "gray.600" }}
                      display={"inline-block"}
                      p={"4px"}
                      textDecoration={"none"}
                      cursor={"pointer"}
                    >
                      토픽
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Flex>
          </HStack>
          {/* Search and Actions */}
          <HStack
            spacing={4}
            position={"absolute"}
            top="50%"
            right="20px"
            pl={0}
            zIndex={100}
            transform={"translateY(-50%)"}
          >
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

            {/* Theme Toggle */}
            <IconButton
              aria-label="테마 변경"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />

            {/* User Section */}
            {session ? (
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
            ) : (
              <Button onClick={handleLogin} colorScheme="blue">
                로그인
              </Button>
            )}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
