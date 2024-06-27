import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../store/user-info-atom";
import ToggleMenu from "./Menu";
interface Navprops {
  text: string;
  subText: string;
}
const Navbar: React.FC<Navprops> = ({ text, subText }) => {
  const currUser = useRecoilValue(currentUserAtom);
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
      {currUser.email !== process.env.REACT_APP_GUEST_EMAIL && (
        <div className="absolute top-6 right-0">
          <ToggleMenu />
        </div>
      )}
    </div>
  );
};
export default Navbar;
