// Shows query suggestions
import { useSetRecoilState } from "recoil";
import OpenAiImage from "../assets/AI.png";
import { chatAtom, currentMessageAtom } from "../store/chat-atom";
import { Message } from "../types";
import SuggestionCards from "./SuggestionCards";
const Suggestions = () => {
  const setCurrentMessage = useSetRecoilState(currentMessageAtom);
  const setChats = useSetRecoilState(chatAtom);
  const submitQuery = (q: string) => {
    const time = Date.now();
    setCurrentMessage({
      message: q,
      timestamp: time,
    });
    setChats((prevChats: Message[]) => [
      ...prevChats,
      { message: q, response: "" }, // Add user's message without waiting for response
    ]);
  };
  const queries = [
    {
      q: "Tell me a riddle about a bicycle and a fish",
    },
    {
      q: "Tell me a joke about a cow in school.",
    },
  ];
  return (
    <div className="suggestion-page-box">
      <div className="openAi-image-box">
        <img src={OpenAiImage} alt="" />
      </div>
      <div className="suggestion-queries-box">
        {queries.map(({ q }, key) => {
          return (
            <div
              key={key}
              className="cursor-pointer"
              onClick={() => submitQuery(q)}
            >
              <SuggestionCards text={q} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;
