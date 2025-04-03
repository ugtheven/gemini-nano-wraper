import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Chat } from "../../App";
import { Plus } from "lucide-react";
import MoreButton from "../ui/more-button";

interface SidebarProps {
  chats: Chat[];
  selectedChatId: number;
  setSelectedChatId: (chatId: number) => void;
  createChat: () => void;
  deleteChat: (chatId: number) => void;
}

function Sidebar({
  chats,
  selectedChatId,
  setSelectedChatId,
  createChat,
  deleteChat,
}: SidebarProps) {
  return (
    <Box width="248px" shadow="sm" backgroundColor="gray.950" p={4}>
      <Stack direction="column" flex={1} overflowY="auto" gap={2}>
        {chats.map((chat, index) => {
          return (
            <Button
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              border="none"
              onClick={() => setSelectedChatId(chat.id)}
              backgroundColor={
                selectedChatId === chat.id ? "gray.800" : "transparent"
              }
              _hover={{ backgroundColor: "gray.900" }}
              color="white"
              p="4px 12px"
              borderRadius="md"
              focusRing="none"
              transition="background-color 0.1s ease-in-out"
            >
              <Text
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {chat.messages[0]?.content ?? "New chat"}
              </Text>
              <MoreButton onDelete={() => deleteChat(chat.id)} />
            </Button>
          );
        })}
        <Button
          color="white"
          backgroundColor="gray.800"
          _hover={{ backgroundColor: "gray.900", border: "none" }}
          transition="background-color 0.1s ease-in-out"
          border="none"
          focusRing="none"
          onClick={createChat}
        >
          <Plus />
          <Text>Create new chat</Text>
        </Button>
      </Stack>
    </Box>
  );
}

export default Sidebar;
