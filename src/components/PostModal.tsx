import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!session) return;

    try {
      setIsSubmitting(true);
      await axios.post(
        "/api/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>새 게시글 작성</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                rows={10}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              isDisabled={!title || !content}
            >
              작성하기
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
} 