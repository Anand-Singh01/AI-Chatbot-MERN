// This component displays users queries, without waiting for response
import { useState } from "react";
import { Message, currentMessageType } from "../types";

interface ChatInputProps {
  setCurrentMessage: (prop: currentMessageType) => void;
  setChats: (updateFn: (prevChats: Message[]) => Message[]) => void;
}

// Takes query sent by user and list of current chats as an input.
// Adds a new query while keeping the response empty
// Sets query back to "" for better user experience.
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

  //cleans query
  const message = query.trim() === "";

  return (
    <div className="box-1">
      <div className="box-2">
        <div className="relative">
          <div className="input-box">
            {/* Send query on enter key press */}
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
              className="text-area"
              placeholder="Your message..."
            ></textarea>
            <button
              // Making sure that user is unable to send empty query
              disabled={message}
              onClick={submitQuery}
              type="submit"
              className={`baseButtonStyle ${
                message ? "disabledButtonStyle" : "enabledButtonStyle"
              }`}
            >
              <svg
                className="send-logo"
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
