import React from "react";
import { Box, Text, Link, Stack, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  return (
    <Box
      as="footer"
      width="100%"
      bg={bgColor}
      color={textColor}
      textAlign="center"
      py={4}
      mt="auto"
      position="absolute"
      bottom={0}
    >
      <Stack spacing={2} direction="row" justify="center">
        <Link
          href="/privacy"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
        >
          Terms of Service
        </Link>
        <Link
          href="/contact"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
        >
          Contact Us
        </Link>
      </Stack>
      <Text fontSize="sm" mt={2}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
