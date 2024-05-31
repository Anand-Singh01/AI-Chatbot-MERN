import React from "react";
import ToggleMenu from "./Menu";
interface Navprops {
  text: string;
  subText: string;
}
const Navbar: React.FC<Navprops> = ({ text, subText }) => {
  return (
    <div className="px-3 fixed top-0 bg-white left-0 right-0 z-50">
      <div
        className="border-[1px] mt-3 shadow-xl rounded-xl flex 
      justify-between items-center px-2 py-4 bg-gray-100"
      >
        <div className="relative">
          <p className="font-semibold px-5 text-blue-800">{text}</p>
          <p
            className="text-[0.8rem] rounded-lg px-1 
          font-semibold text-gray-400 absolute 
          top-[-0.5rem] left-[8.5rem]  w-[8.3rem]"
          >
            {subText}
          </p>
        </div>
        <ToggleMenu />
      </div>
    </div>
  );
};
export default Navbar;
