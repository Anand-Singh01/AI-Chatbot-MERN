import React from "react";
interface Navprops {
  text: string;
  subText: string;
}
const Navbar: React.FC<Navprops> = ({ text, subText }) => {
  return (
    <div className="nav-bar-box-1">
      <div className="nav-bar-box-2">
        <div className="relative">
          <p className="nav-bar-text">{text}</p>
          <p className="nav-bar-sub-text">{subText}</p>
        </div>
        {/* <ToggleMenu /> */}
      </div>
    </div>
  );
};
export default Navbar;
