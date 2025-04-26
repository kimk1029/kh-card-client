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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  apiEndpoint: string;
  modalTitle: string;
}

export default function PostModal({
  isOpen,
  onClose,
  onSuccess,
  apiEndpoint,
  modalTitle,
}: PostModalProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = async () => {
    if (!session) return;

    try {
      setIsSubmitting(true);
      await axios.post(
        apiEndpoint,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      toast({
        title: "게시글 작성 성공",
        description: "게시글이 성공적으로 작성되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("게시글 작성 실패:", error);
      toast({
        title: "게시글 작성 실패",
        description: error.response?.data?.error || "게시글 작성 중 오류가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
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