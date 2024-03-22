import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box bg={bgColor} px={4} color={color}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Logo</Box>
        <Flex alignItems={"center"}>
          <Button variant={"ghost"} mr={4}>
            Home
          </Button>
          <Button variant={"ghost"} mr={4}>
            About
          </Button>
          <Button variant={"ghost"} mr={4}>
            Contact
          </Button>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant={"ghost"}
            aria-label={"Toggle Color Mode"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
