import { extendTheme } from "@chakra-ui/react";
import { ThemeConfig } from "@chakra-ui/theme";
import { buttonTheme } from "./Button"; // buttonTheme의 경로가 올바른지 확인하세요.

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  fonts: {
    body: "Source Sans Pro",
    heading: "Source Sans Pro",
    mono: "Source Sans Pro",
  },
  config,
  colors: {
    brand: {
      100: "#f7fafc",
      // 여기에 필요한 추가 색상들을 정의하세요.
    },
  },
  // 여기에 다른 사용자 정의 설정(예: 글꼴, 기본 스타일 등)을 추가하세요.
  components: {
    Button: buttonTheme,
  },
});
