// Menu component for logout and show profile features.
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import { Menu } from "@mui/material";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { logoutUser } from "../helpers/api-communicator";
import { chatAtom, currentMessageAtom } from "../store/chat-atom";
import { currentUserAtom, isLoggedInAtom } from "../store/user-info-atom";

export default function ToggleMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const resetChat = useResetRecoilState(chatAtom);
  const resetCurrentUserAtom = useResetRecoilState(currentUserAtom);
  const resetCurrentMessageAtom = useResetRecoilState(currentMessageAtom);
  const resetIsLoggedInAtom = useResetRecoilState(isLoggedInAtom);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const openProfile = () => {
  //   setAnchorEl(null);
  //   setIsProfileVisible(true);
  // };

  //Clean up all atoms and redirect user to '/login'
  //If user is logged in as a guest then also works the same.
  const logout = async () => {
    setAnchorEl(null);
    const response = await logoutUser();
    if (response.message === "OK") {
      resetChat();
      resetCurrentUserAtom();
      resetCurrentMessageAtom();
      resetIsLoggedInAtom();
      navigate("/login");
    }
  };

  return (
    <div>
      <Button
        sx={{
          padding: "0px",
        }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-label="Open Menu"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertTwoToneIcon sx={{ color: "blue-300" }} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
      >
        {/* <MenuItem onClick={openProfile}>Profile</MenuItem> */}

        {/* User will see login button if they haven't logged in - vice versa */}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
