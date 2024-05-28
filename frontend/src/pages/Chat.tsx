import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import OpenAiImage from "../assets/AI.png";
import { ChatInput } from "../components/ChatInput";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import ProfileSettings from "../components/ProfileSettings";
import Query from "../components/Query";
import Response from "../components/Response";
import Suggestions from "../components/Suggestions";
import {
  chatAtom,
  chatListSelector,
  currentMessageAtom,
  profileToggleAtom,
  singleChatSelector,
} from "../store/atom";
import { Message } from "../types";

const Chat = () => {
  const [chats, setChats] = useRecoilState(chatAtom);
  const isProfileVisible = useRecoilValue(profileToggleAtom);
  const chatList = useRecoilValueLoadable(chatListSelector);
  const [currentMessage, setCurrentMessage] =
    useRecoilState(currentMessageAtom);
  const singleChatMessage = useRecoilValueLoadable(singleChatSelector);

  const [isLoading, setIsPageLoading] = useState(true);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (chatList.state === "hasValue") {
      setChats(chatList.contents);
      setIsPageLoading(false);
    } else if (chatList.state === "loading") {
      setIsPageLoading(true);
    }
  }, [chatList.state, chatList.contents, setChats]);

  useEffect(() => {
    if (currentMessage.message && currentMessage.message.trim() !== "") {
      const handleResponse = () => {
        if (singleChatMessage.state === "loading") {
          setIsResponseLoading(true);
        } else if (singleChatMessage.state === "hasValue") {
          setIsResponseLoading(false);
          const response = singleChatMessage.contents;
          if (response) {
            const time: number = Date.now();
            const updatedResponse = { ...response, timestamp: time };
            setChats((prevChats) => [
              ...prevChats.slice(0, -1),
              updatedResponse,
            ]);
          }
        } else if (singleChatMessage.state === "hasError") {
          setIsResponseLoading(false);
        }
      };

      handleResponse();
    }
  }, [
    currentMessage,
    singleChatMessage.state,
    singleChatMessage.contents,
    setChats,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {chats.length === 0 ? <Suggestions /> : ""}
      <div className="relative">
        {isProfileVisible && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div
              className="fixed w-[18rem] left-1/2 top-1/2 
          transform -translate-x-1/2 -translate-y-1/2 border p-5 
          rounded-md bg-[#F4F4F4] z-50"
            >
              <ProfileSettings />
            </div>
          </>
        )}
        <div
          className={`mt-3 scroll-m-0 ${isProfileVisible ? "blur-[4px]" : ""}`}
        >
          <Navbar text="Knowledge Pro!" subText="Powered by GPT 3.5" />
          <div className="mt-[8rem] flex flex-col items-center gap-[3rem]">
            {chats.map(({ message, response }: Message, index: number) => (
              <div
                key={index}
                ref={messageEndRef}
                className="flex w-full justify-center"
              >
                <div className="w-[80%]">
                  <p className="h-fit px-5 flex justify-end">
                    <Query text={message} />
                  </p>
                  <p className="mt-[10px] flex items-center gap-5 px-5">
                    <img
                      className="self-start w-[2.5rem] mt-2 
                    border-[1px] rounded-full p-2"
                      src={OpenAiImage}
                      alt=""
                    />
                    {isResponseLoading && index === chats.length - 1 ? (
                      <Typography
                        className="min-w-[10rem] mb-[10rem]"
                        variant="h3"
                      >
                        {<Skeleton />}
                      </Typography>
                    ) : (
                      <Response text={response} />
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex w-full justify-center mt-[5rem]">
              <ChatInput
                setCurrentMessage={setCurrentMessage}
                setChats={setChats}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
