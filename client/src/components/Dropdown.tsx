import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import { deleteSection } from "../helpers/api-communicator";
import { currentSectionAtom, sectionUpdateAtom } from "../store/section-atoms";

const options = ["Rename", "Delete"];

const ITEM_HEIGHT = 30;

export default function Dropdown({
  startNewSection_click,
  _id,
  setEditingSection,
}: {
  startNewSection_click: () => void;
  _id: string;
  setEditingSection: (id: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const setCurrentSection = useSetRecoilState(currentSectionAtom);
  const setSectionUpdate = useSetRecoilState(sectionUpdateAtom);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const option_click = async (option: string) => {
    if (option === "Rename") {
      setEditingSection(_id);
      handleClose();
    } else if (option === "Delete") {
      const res = await deleteSection(_id);
      if (res.success) {
        setCurrentSection({
          sectionName: "",
          createdAt: "",
          _id: null,
        });
        startNewSection_click();
        setSectionUpdate((new Date()).toString());
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => option_click(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
