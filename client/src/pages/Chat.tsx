import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import OpenAiImage from "../assets/AI.png";
import { ChatInput } from "../components/ChatInput";
import Navbar from "../components/Navbar";
import ProfileSettings from "../components/ProfileSettings";
import Query from "../components/Query";
import Response from "../components/Response";
import SideBar from "../components/Sidebar";
import Suggestions from "../components/Suggestions";
import {
  chatAtom,
  chatListSelector,
  currentMessageAtom,
  profileToggleAtom,
  singleChatSelector,
} from "../store/chat-atom";
import {
  currentSectionAtom,
  isNewSectionAtom,
  updateSectionListAtom,
} from "../store/section-atoms";
import { currentUserAtom } from "../store/user-info-atom";
import { Message } from "../types";

const Chat = () => {
  const [chats, setChats] = useRecoilState(chatAtom);
  const isProfileVisible = useRecoilValue(profileToggleAtom);
  const [bg_disabled, set_bg_disabled] = useState(false);
  const chatList = useRecoilValueLoadable(chatListSelector);
  const currentUser = useRecoilValue(currentUserAtom);
  const [currentMessage, setCurrentMessage] =
    useRecoilState(currentMessageAtom);
  const singleChatMessage = useRecoilValueLoadable(singleChatSelector);
  const [isNewSection, setIsNewSection] = useRecoilState(isNewSectionAtom);
  const setUpdateSectionList = useSetRecoilState(updateSectionListAtom);
  const setCurrentSection = useSetRecoilState(currentSectionAtom);
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
          setCurrentMessage({ message: "" });
          if (
            currentUser.email !== process.env.REACT_APP_GUEST_EMAIL &&
            isNewSection
          ) {
            setCurrentSection({
              _id: response!.sectionId!,
              createdAt: response?.createdAt,
              sectionName: response!.sectionName!,
            });
            setUpdateSectionList(true);
          }
          // setUpdateSectionList(false);
        } else if (singleChatMessage.state === "hasError") {
          setIsResponseLoading(false);
          setCurrentMessage({ message: "" });
        }
      };

      handleResponse();
    }
  }, [
    currentMessage,
    isNewSection,
    setUpdateSectionList,
    setIsNewSection,
    currentUser.email,
    singleChatMessage.state,
    singleChatMessage.contents,
    setCurrentMessage,
    setCurrentSection,
    setChats,
  ]);

  // useEffect(() => {
  //   if (updateSectionList) {
  //     setIsNewSection(false);
  //   }
  // }, [setIsNewSection, updateSectionList]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="">
      <div className="absolute top-0 z-[70]">
        <SideBar bg_disabled={bg_disabled} set_bg_disabled={set_bg_disabled} />
      </div>
      {bg_disabled && (
        <div
          onClick={() => set_bg_disabled(false)}
          className="disable-bg"
        ></div>
      )}
      {isLoading && <div></div>}

      <div className="relative flex xl:justify-end justify-center">
        {isProfileVisible && (
          <>
            {/* <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div> */}
            <div className="profile-settings-container">
              <ProfileSettings />
            </div>
          </>
        )}
        <div
          className={`mt-3 scroll-m-0 xl:w-[80%] ${
            isProfileVisible ? "blur-[4px]" : ""
          }`}
        >
          {chats.length === 0 ? <Suggestions /> : ""}
          <Navbar text="Knowledge Pro!" subText="Powered by GPT 3.5" />
          <div className="navbar-outer-container">
            {chats.map(({ message, response }: Message, key) => (
              <div
                key={key}
                ref={messageEndRef}
                className="query-message-container"
              >
                <div className="xl:w-[50%] w-[90%]">
                  {/* changed to p ---> div */}
                  <div className="query-outer-container">
                    <Query text={message} />
                  </div>
                  {/* changed p ---> div */}
                  <div className="response-aouter-container">
                    <img className="response-image" src={OpenAiImage} alt="" />
                    {isResponseLoading && key === chats.length - 1 ? (
                      <Typography
                        component={"span"}
                        className="skeleton-typography"
                        variant="h3"
                      >
                        {<Skeleton />}
                      </Typography>
                    ) : (
                      <Response text={response} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="chat-input-outer-container">
              <ChatInput
                setCurrentMessage={setCurrentMessage}
                setChats={setChats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
