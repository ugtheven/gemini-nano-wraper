import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { Chat } from "../../App";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface MessagesListProps {
  chat: Chat;
  writing: boolean;
}

function MessagesList({ chat, writing }: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (!chat || chat.messages.length === 0) return null;
  return (
    <Stack
      direction="column"
      flex={1}
      overflowY="auto"
      maxWidth="680px"
      width="100%"
      p={4}
    >
      {chat.messages.map((message, index) => {
        if (message.role === "user") {
          return (
            <Box
              key={index}
              backgroundColor="#303030"
              p={2}
              borderRadius="md"
              width="fit-content"
              alignSelf="flex-end"
            >
              <Text color="white">{message.content}</Text>
            </Box>
          );
        }
        return (
          <Box
            key={index}
            p={2}
            borderRadius="md"
            width="fit-content"
            alignSelf="flex-start"
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {chat.messages.length === index + 1 && writing && <Spinner />}
          </Box>
        );
      })}
      <div ref={messagesEndRef} />
    </Stack>
  );
}

export default MessagesList;
