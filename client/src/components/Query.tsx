//Query asked by user
import React from "react";

interface query {
  text: string;
}
const Query: React.FC<query> = ({ text }) => {
  return <div className="bg-[#F4F4F4] px-5 py-2 rounded-[1.1rem]">{text}</div>;
};

export default Query;
