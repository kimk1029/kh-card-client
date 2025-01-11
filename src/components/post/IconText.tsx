import { Box } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

interface IconTextProps {
  icon: typeof ViewIcon; // Chakra UI 아이콘 타입
  text: string | number; // 텍스트는 문자열 타입
  fontSize?: string; // 선택적으로 전달받는 fontSize
  color?: string; // 선택적으로 전달받는 color
}

export const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  text,
  fontSize = "14px", // 기본값 설정
  color = "#94969b", // 기본값 설정
}) => {
  return (
    <Box
      as="span"
      mr="14px"
      color={color} // 전달받은 color 적용
      fontSize={fontSize} // 전달받은 fontSize 적용
      display="flex"
      alignItems="center"
    >
      <Icon
        style={{
          verticalAlign: "top",
          marginRight: "4px",
          marginBottom: "2px",
        }}
      />
      {text}
    </Box>
  );
};
