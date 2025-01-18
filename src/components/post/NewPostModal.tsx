"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { data: session, status } = useSession();
  const { colorMode } = useColorMode();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 로딩 상태 처리 (선택 사항)
  if (status === "loading") {
    return null; // 로딩 스피너 등을 사용하셔도 됩니다.
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = (session as any)?.accessToken;
    if (!accessToken) {
      toast({
        title: "인증 오류",
        description: "로그인이 필요합니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(
        "http://kimk1029.synology.me:50000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "게시글 작성 실패");
      }

      toast({
        title: "게시글 작성 완료",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // ★ 게시글 작성 후, 모달 닫기 & 부모에게 알리기
      onClose(); // 모달 닫기
      onSuccess(); // 부모 컴포넌트가 리스트를 갱신하도록 콜백 호출

      router.push("/board");
    } catch (error) {
      toast({
        title: "작성 실패",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 다크 모드에 따른 색상
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader>새 글 쓰기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* form 태그에 id를 부여하고, submit 버튼에서 form 속성으로 연결 */}
          <Box as="form" id="new-post-form" onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>제목</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>내용</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                rows={6}
                required
              />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button form="new-post-form" type="submit" colorScheme="blue" mr={3}>
            작성하기
          </Button>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPostModal;
