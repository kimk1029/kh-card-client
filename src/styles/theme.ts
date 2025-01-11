import { extendTheme } from "@chakra-ui/react";
import { ThemeConfig } from "@chakra-ui/theme";
import { buttonTheme } from "./Button"; // buttonTheme의 경로가 올바른지 확인하세요.

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    body: "NanumSquare, Source Sans Pro, sans-serif",
    heading: "NanumSquare, Source Sans Pro, sans-serif",
    mono: "NanumSquare, Source Sans Pro, monospace",
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // 여기에 필요한 추가 색상들을 정의하세요.
    },
  },
  styles: {
    global: {
      "@font-face": [
        {
          fontFamily: "NanumSquare",
          src: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareR.eot),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareR.eot?#iefix) format("embedded-opentype"),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareR.woff) format("woff"),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareR.ttf) format("truetype")`,
        },
        {
          fontFamily: "NanumSquareBold",
          src: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareB.eot),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareB.eot?#iefix) format("embedded-opentype"),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareB.woff) format("woff"),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareB.ttf) format("truetype")`,
        },
        {
          fontFamily: "NanumSquareExtraBold",
          src: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareEB.eot),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareEB.eot?#iefix) format("embedded-opentype"),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareEB.woff) format("woff"),
                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquare/NanumSquareEB.ttf) format("truetype")`,
        },
        // 추가 폰트 정의
      ],
      body: {
        fontFamily: "NanumSquare, Source Sans Pro, sans-serif",
      },
      heading: {
        fontFamily: "NanumSquare, Source Sans Pro, sans-serif",
      },
    },
  },
  components: {
    Button: buttonTheme,
  },
});
