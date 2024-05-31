//Displays response fetched from Open AI's API.
import React from "react";
// import openAiImage from "../assets/AI.png";
interface response {
  text: string;
}
const Response: React.FC<response> = ({ text }) => {
  return (
    <div className="">
      {/* <img
        className=" self-start w-[2.5rem] mt-1 border-[1px] rounded-full p-2"
        src={openAiImage}
        alt=""
      /> */}
      <p>{text}</p>
    </div>
  );
};

export default Response;
