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
import NextLink from "next/link";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

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
          Login
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
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box as="a" href="/">
          <Text fontSize="lg" fontWeight="bold">
            LOGO
          </Text>
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7} alignItems="center">
            {/* <Box as="a" href="/wedding">
              <Button variant="ghost">Wedding</Button>
            </Box> */}
            <Box as="a" href="/board">
              <Button variant="ghost">Board</Button>
            </Box>

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {renderUserSection()}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
