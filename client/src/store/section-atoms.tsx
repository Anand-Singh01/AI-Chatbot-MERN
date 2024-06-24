import { atom, selector } from "recoil";
import { getSectionList } from "../helpers/api-communicator";
import { sectionData, sectionType } from "../types";
import { currentUserAtom, isLoggedInAtom } from "./user-info-atom";
export const currentSectionAtom = atom<sectionType>({
  key: "currentSectionAtomKey",
  default: {
    sectionName: "",
    createdAt: "",
    _id: null,
  },
});

export const sectionListAtom = atom<sectionData>({
  key: "sectionListAtomKey",
  default: { chatSections: {} },
});

export const sectionNameUpdateAtom = atom<string>({
  key:"sectionNameUpdateAtomKey",
  default:""
})

export const updateSectionListAtom = atom<boolean>({
  key: "updateSectionListAtom",
  default: false,
});

export const isNewSectionAtom = atom<boolean>({
  key: "isNewSectionAtom",
  default: true,
});

export const sectionListSelector = selector<sectionData>({
  key: "sectionListSelectorKey",
  get: async ({ get }) => {
    const isLoggedIn = get(isLoggedInAtom);
    const { email } = get(currentUserAtom);
    // const updateSectionList = get(updateSectionListAtom);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const currSection = get(currentSectionAtom);
    const sectionNameUpdate = get(sectionNameUpdateAtom);
    const isNewSection = get(isNewSectionAtom);
    if(email === process.env.REACT_APP_GUEST_EMAIL)
    {
      return { chatSections: {} };
    }
    if (
      (email && isLoggedIn) ||
      isNewSection || sectionNameUpdate
    ) {
      try {
        const categories = await getSectionList();
        return categories;
      } catch (error) {
        console.error("Error fetching section list:", error);
        return { chatSections: {} };
      }
    } else {
      return { chatSections: {} };
    }
  },
});
