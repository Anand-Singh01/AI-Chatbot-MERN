//Displays response fetched from Open AI's API.
import React from "react";
// import openAiImage from "../assets/AI.png";
interface response {
  text: string;
}
const Response: React.FC<response> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default Response;
