import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export const Aside = () => {
  return (
    <Box
      as="aside"
      w={{ base: "300px", md: "300px" }}
      ml={{ base: "58px", md: "58px" }}
    >
      <Box
        p={"22px 23px"}
        border={"1px solid #eee"}
        fontSize={"14px"}
        lineHeight={"1.25em"}
        sx={{
          a: {
            display: "block",
            position: "relative",
            marginTop: "11px",
            paddingLeft: "14px",
            fontSize: "14px",
            lineHeight: "1.43em",
            textDecoration: "none",
            color: "#222",
            cursor: "pointer",
            touchAction: "manipulation",
          },
          "a:first-of-type": {
            marginTop: "17px", // 첫 번째 자식의 a 태그에만 적용
          },
        }}
      >
        <Heading as="h1" fontWeight={"bold"} fontSize={"16px"}>
          추천 글
        </Heading>
        <Text as="a" href="/kr/post/example-link" variant="link">
          인기글 1번입니다요
        </Text>
        <Text as="a" href="/kr/post/example-link" variant="link">
          인기글 2번입니다요
        </Text>
      </Box>
    </Box>
  );
};
