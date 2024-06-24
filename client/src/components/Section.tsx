import { useEffect, useRef, useState } from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { updateSectionName } from "../helpers/api-communicator";
import {
  currentSectionAtom,
  isNewSectionAtom,
  sectionListAtom,
  sectionListSelector,
  sectionUpdateAtom,
} from "../store/section-atoms";
import { sectionType } from "../types";
import Dropdown from "./Dropdown";

const Section = ({
  startNewSection_click,
}: {
  startNewSection_click: () => void;
}) => {
  const sectionList = useRecoilValueLoadable(sectionListSelector);
  const [sections, setSections] = useRecoilState(sectionListAtom);
  const [currSection, setCurrentSection] = useRecoilState(currentSectionAtom);
  const [editingSection, setEditingSection] = useState("");
  const setSectionNameUpdate = useSetRecoilState(sectionUpdateAtom);
  const [selectedSectionName, setSelectedSectionName] = useState("");
  const isNewSection = useSetRecoilState(isNewSectionAtom);
  const [hoverSectionId, setHoverSectionId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSectionNameUpdate = async () => {
    if (selectedSectionName.trim() !== "") {
      const sectionId = currSection._id;
      const newName = selectedSectionName;
      const data = await updateSectionName(newName, sectionId!);
      if (data != null) {
        setCurrentSection({ ...currSection, sectionName: data?.sectionName });
        setSectionNameUpdate(new Date().toString());
      }
    }
    setEditingSection("");
  };

  useEffect(() => {
    if (editingSection !== "" && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingSection]);

  useEffect(() => {
    setSelectedSectionName(currSection.sectionName);
  }, [currSection]);

  useEffect(() => {
    if (sectionList.state === "loading") {
    } else if (sectionList.state === "hasValue") {
      setSections(sectionList.contents);
    }
  }, [sectionList, setSections, sections]);

  const sectionOnClick = (
    _id: string | null,
    createdAt: string,
    sectionName: string
  ) => {
    if (_id) {
      if (currSection._id !== _id) {
        setEditingSection("");
        setCurrentSection({
          _id,
          createdAt,
          sectionName,
        });
      }
      isNewSection(false);
    }
  };

  return (
    <div className=" h-screen mt-10">
      <div className="h-[85%] overflow-y-auto">
        {Object.keys(sections.chatSections).length !== 0 &&
          Object.keys(sections.chatSections).map((sectionKey, index) => (
            <div className="m-2 pb-2 border-b-[1px] cursor-pointer" key={index}>
              <h3 className="key-heading">{sectionKey}</h3>
              {sections.chatSections[sectionKey]?.map(
                (item: sectionType, index: number) => (
                  <div className="flex items-center w-[15rem]">
                    <div
                      className="rounded-lg w-full flex"
                      // onMouseOver={() => setHoverSectionId(item._id!)}
                      // onMouseOut={() => setHoverSectionId("")}
                      key={index}
                    >
                      {editingSection === item._id ? (
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSectionNameUpdate();
                            }
                          }}
                          ref={inputRef}
                          type="text"
                          className="pl-2"
                          value={selectedSectionName}
                          onChange={(e) =>
                            setSelectedSectionName(e.target.value)
                          }
                        />
                      ) : (
                        <p
                          onClick={() =>
                            sectionOnClick(
                              item._id,
                              item.createdAt!,
                              item.sectionName
                            )
                          }
                          className={`${
                            item._id === currSection._id
                              ? "selected-section-bg"
                              : item._id === hoverSectionId
                              ? "hover-section-bg"
                              : ""
                          } p-2`}
                        >
                          {item.sectionName}
                        </p>
                      )}
                      {item._id === currSection._id && (
                        <Dropdown
                          startNewSection_click={startNewSection_click}
                          _id={item._id!}
                          setEditingSection={setEditingSection}
                        />
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Section;
