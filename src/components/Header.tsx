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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

  // session?.user 정보가 있다면 로그인 상태로 간주
  const username = session?.user?.name || session?.user?.email || "Guest";
  const userImage =
    session?.user?.image ||
    "https://avatars.dicebear.com/api/male/username.svg";

  // (1) 로그인 버튼 클릭 시 로직
  // 세션이 이미 있다면 "/"로 리디렉션(= 자동 로그인)
  // 세션이 없다면 "/auth" 페이지로 이동(= 수동 로그인)
  const handleLogin = () => {
    if (session) {
      window.location.href = "/";
    } else {
      window.location.href = "/auth";
    }
  };

  // (2) 로그아웃
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  // (3) 로그인 여부에 따라 로그인 버튼 or 아바타(Menu)를 표시
  const renderUserSection = () => {
    if (!session) {
      // 로그인 이력이 없다면 => Login 버튼
      return (
        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      );
    }
    // 세션이 있다면 => 아바타(Menu)
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
          <MenuItem>Account Settings</MenuItem>
          <MenuItem onClick={handleLogout} isDisabled={!session}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Logo</Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {/* 라이트/다크 모드 토글 버튼 */}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {/* 로그인 이력(세션)에 따라 다른 컴포넌트 렌더링 */}
            {renderUserSection()}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
