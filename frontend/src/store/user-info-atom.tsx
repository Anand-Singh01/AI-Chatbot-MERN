import { atom } from "recoil";
import { currentUserStateType } from "../types";

export const isLoggedInAtom = atom({
    key: "isLoggedInAtomKey",
    default: false,
  });
  
  export const currentUserAtom = atom<currentUserStateType>({
    key: "currentUserIdAtomKey",
    default: { name: null, email: null },
  });
  