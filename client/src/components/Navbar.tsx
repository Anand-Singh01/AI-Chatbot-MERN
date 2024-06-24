import React from "react";
import ToggleMenu from "./Menu";
interface Navprops {
  text: string;
  subText: string;
}
const Navbar: React.FC<Navprops> = ({ text, subText }) => {
  return (
    <div className="nav-bar-box-1 relative">
      <div className="nav-bar-box-2">
        <div className="relative mr-5">
          <p className="nav-bar-text">{text}</p>
          <p className="nav-bar-sub-text">{subText}</p>
        </div>
        {/* <div className="flex justify-end bg-orange-300">
          <ToggleMenu />
        </div> */}
      </div>
      <div className="absolute top-6 right-0">
        <ToggleMenu />
      </div>
    </div>
  );
};
export default Navbar;
