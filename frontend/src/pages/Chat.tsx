import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import ChatItem from "../components/chat/ChatItem";
import {
  chatListSelector,
  currentMessageAtom,
  singleChatSelector,
} from "../store/atoms/atom";
import { Message } from "../types";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Message[]>([]);
  const [currentMessageId, setCurrentMessageId] =
    useRecoilState(currentMessageAtom);
  const chatMessages = useRecoilValueLoadable(chatListSelector);
  const singleChatMessage = useRecoilValueLoadable(singleChatSelector);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (chatMessages.state === "hasValue") {
      setChats(chatMessages.contents);
      setIsLoading(false);
    } else if (chatMessages.state === "loading") {
      setIsLoading(true);
    }
  }, [chatMessages]);

  const sendMessage = async () => {
    if (inputRef.current) {
      const userMessage = inputRef.current.value;
      inputRef.current.value = "";
      setCurrentMessageId(userMessage);
      setChats((prevChats) => [
        ...prevChats,
        { message: userMessage, response: "" }, // Add user's message without waiting for response
      ]);
    }
  };

  const handleDeleteChats = () => {
    setChats([]);
  };

  useEffect(() => {
    if (currentMessageId && currentMessageId.trim() !== "") {
      const handleResponse = () => {
        if (singleChatMessage.state === "loading") {
          setIsLoading(true); // Set loading state to true when fetching response
        } else if (singleChatMessage.state === "hasValue") {
          setIsLoading(false); // Set loading state to false when response is received
          const response = singleChatMessage.contents; // Get the response from singleChatMessage
          console.log(response);
          if (response) {
            // Check if response is not null
            if (Array.isArray(response)) {
              // If response is an array of messages
              setChats((prevChats) => [...prevChats.slice(0, -1), ...response]); // Add messages to chats
            } else {
              // If response is a single message
              setChats((prevChats) => [...prevChats.slice(0, -1), response]); // Add message to chats
            }
          }
        } else if (singleChatMessage.state === "hasError") {
          setIsLoading(false); // Set loading state to false if there's an error
          // Handle error if needed
        }
      };

      handleResponse();
    }
  }, [currentMessageId, singleChatMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        {/* Sidebar content */}

        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {/* {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]} */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "red[300]",
              ":hover": {
                bgcolor: "red.A400",
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Main chat area */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        {/* Chat header */}
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>

        {/* Chat messages */}
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chats.map((chat, index) => (
            <ChatItem
              message={chat.message}
              response={chat.response}
              key={index}
            />
          ))}
        </Box>
        <div>{isLoading ? <CircularProgress /> : ""}</div>

        {/* Input field and send button */}
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            placeholder="Ask anything..."
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={sendMessage} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
export default Chat;