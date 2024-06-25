import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { logoutUser } from "../helpers/api-communicator";
import { chatAtom, currentMessageAtom } from "../store/chat-atom";
import { currentSectionAtom, isNewSectionAtom } from "../store/section-atoms";
import { currentUserAtom, isLoggedInAtom } from "../store/user-info-atom";
import Section from "./Section";
const SideBar = ({
  set_bg_disabled,
  bg_disabled,
}: {
  set_bg_disabled: (bg_disabled: boolean) => void;
  bg_disabled: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const setCurrentSection = useSetRecoilState(currentSectionAtom);
  const setChats = useSetRecoilState(chatAtom);
  const setIsNewSection = useSetRecoilState(isNewSectionAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const resetChat = useResetRecoilState(chatAtom);
  const resetCurrentUserAtom = useResetRecoilState(currentUserAtom);
  const resetCurrentMessageAtom = useResetRecoilState(currentMessageAtom);
  const resetIsLoggedInAtom = useResetRecoilState(isLoggedInAtom);
  // const setUpdateSectionList = useSetRecoilState(updateSectionListAtom);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!bg_disabled) {
      setIsOpen(false);
    }
  }, [bg_disabled]);

  const logout = async () => {
    // setAnchorEl(null);
    const response = await logoutUser();
    if (response.message === "OK") {
      resetChat();
      resetCurrentUserAtom();
      resetCurrentMessageAtom();
      resetIsLoggedInAtom();
      navigate("/login");
    }
  };

  const startNewSection_click = (options?: string) => {
    console.log(options);
    setCurrentSection({
      sectionName: "",
      createdAt: "",
      _id: null,
    });
    setIsNewSection(true);
    setChats([]);
    // setUpdateSectionList(false);
    set_bg_disabled(false);
    console.log(options === undefined);
    if (options === undefined) {
      toggleSidebar();
    }
  };

  const handleHamburger_click = () => {
    toggleSidebar();
    set_bg_disabled(!isOpen);
  };

  return (
    <div className="h-screen">
      <button
        onClick={handleHamburger_click}
        aria-controls="logo-sidebar"
        type="button"
        className={`hamburger ${isOpen ? "block" : "block"}`}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className={`hamburger-side-bar ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
        aria-label="Sidebar"
      >
        <div
          onClick={() => startNewSection_click()}
          title="New Chat"
          className="flex justify-end mt-[1rem]"
        >
          <button className="newChat-btn w-[50%]">New Chat</button>
          {/* <AddTwoToneIcon className="new-chat" /> */}
        </div>

        <div>
          <Section startNewSection_click={startNewSection_click} />
        </div>

        <div className="relative">
          {currentUser.email === process.env.REACT_APP_GUEST_EMAIL ? (
            <div className="absolute top-[-15rem] right-[2.3rem]">
              <div className="flex flex-col">
                <Link to={"/login"} type="button" className="sidebar-btn-login">
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  type="button"
                  className="sidebar-btn-signup"
                >
                  SignUp
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={logout}
              type="button"
              className="sidebar-btn-login"
            >
              Logout
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
