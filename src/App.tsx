import { Stack, Text } from "@chakra-ui/react";
import ChatInput from "./components/ChatInput/ChatInput";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import MessagesList from "./components/MessagesList/MessagesList";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Chat {
  id: number;
  messages: Message[];
}

function App() {
  const [session, setSession] = useState<AILanguageModel | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number>(0);
  const [writing, setWriting] = useState<boolean>(false);

  const createSession = useCallback(async () => {
    const { available } = await window.ai.languageModel.capabilities();
    if (available === "no") {
      alert("Language model not available");
      setSession(null);
      return;
    }
    const s = await window.ai.languageModel.create({
      initialPrompts: [],
    });
    setSession(s);
  }, []);

  const createChat = useCallback(() => {
    setChats([...chats, { id: chats.length, messages: [] }]);
    setSelectedChatId(chats.length);
  }, [chats]);

  const deleteChat = useCallback(
    (chatId: number) => {
      setChats(chats.filter((chat) => chat.id !== chatId));
    },
    [chats]
  );

  const addMessage = useCallback(
    (chatId: number, message: Message) => {
      if (chats.length === 0) {
        createChat();
        setSelectedChatId(0);
      }
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
    },
    [chats.length, createChat, setSelectedChatId]
  );

  const updateLastMessage = useCallback((chatId: number, message: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!session || message.length === 0) return;
      const newMessage: Message = {
        role: "user",
        content: message,
      };
      addMessage(selectedChatId, newMessage);
      setWriting(true);
      try {
        const stream = session.promptStreaming(message);
        const reader = stream.getReader();

        let result = "";
        let previousValue = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const newChunk = value.startsWith(previousValue)
            ? value.slice(previousValue.length)
            : value;
          result += newChunk;
          previousValue = value;
          updateLastMessage(selectedChatId, {
            role: "assistant",
            content: result,
          });
        }
        setWriting(false);
      } catch (error) {
        console.error(error);
        alert("Error sending message");
      }
      setWriting(false);
    },
    [addMessage, selectedChatId, session, updateLastMessage]
  );

  useEffect(() => {
    createSession();
  }, [createSession]);

  return (
    <Stack
      direction="row"
      height="100vh"
      width="100vw"
      backgroundColor="gray.900"
    >
      <Sidebar
        chats={chats}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        createChat={createChat}
        deleteChat={deleteChat}
      />
      <Stack direction="column" flex={1} p={4}>
        <Text color="white" fontSize="xl" fontWeight="semibold" px={4}>
          Gemini Nano
        </Text>
        <Stack
          direction="column"
          flex={1}
          justifyContent="center"
          alignItems="center"
          overflowY="auto"
          gap={4}
        >
          <MessagesList chat={chats[selectedChatId]} writing={writing} />
          {(chats.length === 0 ||
            chats[selectedChatId]?.messages.length === 0) && (
            <Text color="white" fontSize="3xl" fontWeight="semibold">
              How can I help you today?
            </Text>
          )}
          <ChatInput sendMessage={sendMessage} writing={writing} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
