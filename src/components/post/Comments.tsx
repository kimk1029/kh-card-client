import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
  Textarea,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import useSWR, { mutate } from "swr";
import { Comment } from "@/type";

// 댓글 작성 컴포넌트
const CommentInput = ({
  content,
  setContent,
  onSubmit,
  onCancel,
}: {
  content: string;
  setContent: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}) => (
  <Box id="comment_apply" border="1px solid #d4d4d4" mt="21px">
    <form onSubmit={onSubmit}>
      <Box p="18px 20px" position="relative">
        <Box ml="36px">
          <Textarea
            placeholder="댓글을 남겨주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isRequired
            minHeight="96px"
            p="0 4px"
            fontSize="16px"
            lineHeight="1.5em"
            width="100%"
            border="none"
            resize="none"
            boxSizing="border-box"
          />
        </Box>
        <Box mt="20px" textAlign="right" position="relative">
          <Box
            position="absolute"
            top="50%"
            left="0"
            transform="translate(0,-50%)"
          >
            <List display="flex" alignItems="center" p="2px 0">
              <ListItem>
                <Box display="flex" gap="8px" alignItems="center">
                  <input type="checkbox" id="inpcp" name="hide_company" />
                  <label htmlFor="inpcp">
                    <Text>비공개</Text>
                  </label>
                </Box>
              </ListItem>
            </List>
          </Box>
          <ButtonGroup>
            <Button onClick={onCancel} fontSize="16px">
              취소
            </Button>
            <Button type="submit" colorScheme="blue" fontSize="16px">
              등록
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </form>
  </Box>
);

// 댓글 아이템 컴포넌트
const CommentItem = ({
  comment,
  colorMode,
  onReply,
}: {
  comment: Comment;
  colorMode: string;
  onReply: (id: number) => void;
}) => (
  <Box
    p="12px 20px 20px"
    bg="transparent"
    rounded="md"
    borderBottom="1px solid #eee"
  >
    <Flex justifyContent="space-between" alignItems="center" mb={2}>
      <HStack spacing={2}>
        <Avatar size="sm" name={comment.author.username} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{comment.author.username}</Text>
          <Text fontSize="xs" color="gray.500">
            {new Date(comment.created_at).toLocaleString()}
          </Text>
        </VStack>
      </HStack>
    </Flex>
    <Text whiteSpace="pre-wrap" wordBreak="break-word" mb={2}>
      {comment.content}
    </Text>
    <Button size="sm" variant="link" onClick={() => onReply(comment.id)}>
      대댓글 작성
    </Button>
    {comment.replies.length > 0 && (
      <VStack
        align="stretch"
        spacing={2}
        mt={4}
        pl={8}
        borderLeft="2px solid #e2e8f0"
      >
        {comment.replies.map((reply) => (
          <Box
            key={reply.id}
            p={3}
            bg={colorMode === "light" ? "gray.50" : "gray.600"}
            rounded="md"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={1}>
              <HStack spacing={2}>
                <Avatar size="xs" name={reply.author.username} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" fontSize="sm">
                    {reply.author.username}
                  </Text>
                </VStack>
              </HStack>
              <Text fontSize="xs" color="gray.500">
                {new Date(reply.created_at).toLocaleString()}
              </Text>
            </Flex>
            <Text whiteSpace="pre-wrap" wordBreak="break-word">
              {reply.content}
            </Text>
          </Box>
        ))}
      </VStack>
    )}
  </Box>
);

// 댓글 목록 컴포넌트
const Comments: React.FC<{ postId: number }> = ({ postId }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [replyParentId, setReplyParentId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { colorMode } = useColorMode();

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const { data: comments, error } = useSWR<Comment[]>(
    `/api/posts/${postId}/comments`,
    fetcher
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          content,
          parentId: replyParentId || undefined,
        }),
      });
      if (!res.ok) throw new Error("댓글 추가에 실패했습니다.");
      setContent("");
      setReplyParentId(null);
      setShowForm(false);
      mutate(`/api/posts/${postId}/comments`);
    } catch (err) {
      console.error(err);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box mb={8}>
      <Heading as="h3" size="md" mb={4}>
        댓글
      </Heading>
      <Box>
        {!showForm ? (
          <Button
            mt="21px"
            width="100%"
            height="64px"
            pl="60px"
            bg="transparent"
            textAlign="left"
            fontSize="16px"
            onClick={() => setShowForm(true)}
          >
            댓글을 남겨주세요.
          </Button>
        ) : (
          <CommentInput
            content={content}
            setContent={setContent}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setReplyParentId(null);
            }}
          />
        )}
      </Box>
      {error && (
        <Text color="red.500">댓글을 불러오는 중 오류가 발생했습니다.</Text>
      )}
      {!comments && !error && <Spinner color="blue.500" />}
      {comments?.length === 0 && <Text>현재 작성된 댓글이 없습니다.</Text>}
      {comments && (
        <VStack align="stretch" spacing={4}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              colorMode={colorMode}
              onReply={(id) => {
                setReplyParentId(id);
                setShowForm(true);
              }}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Comments;
