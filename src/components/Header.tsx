// "use client";
// import React from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   Button,
//   useColorMode,
//   useColorModeValue,
//   IconButton,
// } from "@chakra-ui/react";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// const Header = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const bgColor = useColorModeValue("gray.100", "gray.900");
//   const color = useColorModeValue("black", "white");

//   return (
//     <Box bg={bgColor} padding={"18px 24px"} color={color} opacity={0.5}>
//       <Flex alignItems={"center"} justifyContent={"space-between"}>
//         <Box>Logo</Box>
//         <Flex alignItems={"center"}>
//           <Button variant={"ghost"} mr={4}>
//             Home
//           </Button>
//           <Button variant={"ghost"} mr={4}>
//             About
//           </Button>
//           <Button variant={"ghost"} mr={4}>
//             Contact
//           </Button>
//           <IconButton
//             icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//             onClick={toggleColorMode}
//             variant={"ghost"}
//             aria-label={"Toggle Color Mode"}
//           />
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default Header;
"use client";

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

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
