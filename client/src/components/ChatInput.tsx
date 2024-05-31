import { useState } from "react";
import { Message, currentMessageType } from "../types";

interface ChatInputProps {
  setCurrentMessage: (prop: currentMessageType) => void;
  setChats: (updateFn: (prevChats: Message[]) => Message[]) => void;
}

export const ChatInput = ({ setCurrentMessage, setChats }: ChatInputProps) => {
  const [query, setQuery] = useState("");
  const submitQuery = () => {
    if (query.trim() !== "") {
      const time: number = Date.now();
      setCurrentMessage({
        message: query,
        timestamp: time,
      });
      setChats((prevChats: Message[]) => [
        ...prevChats,
        { message: query, response: "" }, // Add user's message without waiting for response
      ]);
      setQuery("");
    }
  };

  const message = query.trim() === "";
  const baseButtonStyle =
    "inline-flex justify-center items-center p-2 rounded-full cursor-pointer";
  const enabledButtonStyle = "text-blue-500 hover:bg-blue-100";
  const disabledButtonStyle = "text-gray-300 cursor-not-allowed";

  return (
    <div className="w-[80%] bg-white fixed bottom-0 z-0">
      <div className="max-w-[800px] mx-auto">
        <label className="mb-2 text-sm font-medium text-black sr-only">
          Search
        </label>
        <div className="relative">
          <div className="flex items-center px-3 mb-5 py-2 rounded-lg bg-[#F4F4F4]">
            <textarea
              onKeyDown={(e) => {
                if (e.key === "Enter" && !message) {
                  e.preventDefault();
                  submitQuery();
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
              required
              value={query}
              id="default-search"
              rows={1}
              className="block mx-4 p-2.5 resize-none w-full focus:outline-none text-md text-black bg-white rounded-lg border border-gray-300 dark:placeholder-gray-400"
              placeholder="Your message..."
            ></textarea>
            <button
              disabled={message}
              onClick={submitQuery}
              type="submit"
              className={`${baseButtonStyle} ${
                message ? disabledButtonStyle : enabledButtonStyle
              }`}
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
