//Query asked by user
import React from "react";

interface query {
  text: string;
}
const Query: React.FC<query> = ({ text }) => {
  return <div className="query-div">{text}</div>;
};

export default Query;
