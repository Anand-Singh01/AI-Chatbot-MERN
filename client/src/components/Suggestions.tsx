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
      q: "Tell me a pun about a chicken in outer space.",
    },
    {
      q: "Write a short story on oranges and apples",
    },
    {
      q: "Tell me a random fact, but make it weird!",
    },
  ];
  return (
    <div className="h-[100vh] relative flex flex-col justify-center items-center">
      <div className="w-[3rem] pb-[2rem]">
        <img src={OpenAiImage} alt="" />
      </div>
      <div className="flex md:flex-row flex-col gap-3 mx-3">
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
