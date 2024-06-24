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
  sectionNameUpdateAtom,
} from "../store/section-atoms";
import { sectionType } from "../types";
import Dropdown from "./Dropdown";

const Section = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const sectionList = useRecoilValueLoadable(sectionListSelector);
  const [sections, setSections] = useRecoilState(sectionListAtom);
  const [currSection, setCurrentSection] = useRecoilState(currentSectionAtom);
  const [editingSection, setEditingSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setSectionNameUpdate = useSetRecoilState(sectionNameUpdateAtom);
  const [selectedSectionName, setSelectedSectionName] = useState("");
  const isNewSection = useSetRecoilState(isNewSectionAtom);
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
      setIsLoading(true);
    } else if (sectionList.state === "hasValue") {
      console.log(sectionList.contents);
      setSections(sectionList.contents);
      setIsLoading(false);
    }
    // setUpdateSectionList(false);
  }, [sectionList, setSections, sections]);

  // if (isLoading) {
  //   return <Loading />;
  // }

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
      // toggleSidebar();
    }
  };

  return (
    <div className="h-screen mt-10 overflow-y-auto">
      {Object.keys(sections.chatSections).length !== 0 &&
        Object.keys(sections.chatSections).map((sectionKey, index) => (
          <div className="m-2 cursor-pointer" key={index}>
            <h3 className="key-heading">{sectionKey}</h3>
            {sections.chatSections[sectionKey]?.map(
              (item: sectionType, index: number) => (
                <div className="flex items-center w-[15rem]">
                  <div
                    className="hover:bg-gray-100 rounded-lg w-full"
                    onClick={() =>
                      sectionOnClick(
                        item._id,
                        item.createdAt!,
                        item.sectionName
                      )
                    }
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
                        onChange={(e) => setSelectedSectionName(e.target.value)}
                      />
                    ) : (
                      <p
                        className={`${
                          item._id === currSection._id
                            ? "selected-section-bg"
                            : ""
                        } p-2`}
                      >
                        {item.sectionName}
                      </p>
                    )}
                  </div>
                  {item._id === currSection._id && (
                    <Dropdown
                      _id={item._id!}
                      setEditingSection={setEditingSection}
                    />
                  )}
                </div>
              )
            )}
          </div>
        ))}
    </div>
  );
};

export default Section;
