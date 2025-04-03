import { Box, Button, Textarea } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  sendMessage: (message: string) => void;
  writing: boolean;
}

function ChatInput({ sendMessage, writing }: ChatInputProps) {
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = useCallback(() => {
    sendMessage(userInput);
    setUserInput("");
  }, [sendMessage, userInput]);

  return (
    <Box
      backgroundColor="gray.800"
      borderRadius="xl"
      p="8px 16px"
      shadow="sm"
      maxWidth="680px"
      width="100%"
    >
      <Textarea
        autoresize
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        border="none"
        resize="none"
        focusRing="none"
        placeholder="Ask a question"
        p={0}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage();
            e.preventDefault();
          }
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          backgroundColor="white"
          color="black"
          height="36px"
          width="36px"
          padding={0}
          margin={0}
          disabled={userInput.length === 0 || writing}
          borderRadius="full"
          onClick={handleSendMessage}
        >
          <ArrowUp size="24px" />
        </Button>
      </Box>
    </Box>
  );
}

export default ChatInput;
