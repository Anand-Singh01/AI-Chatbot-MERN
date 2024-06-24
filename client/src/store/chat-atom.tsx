import { atom, selector } from "recoil";
import { getAllChats, getSingleChat } from "../helpers/api-communicator";
import { Message, currentMessageType } from "../types";
import { currentSectionAtom, isNewSectionAtom } from "./section-atoms";
import { currentUserAtom, isLoggedInAtom } from "./user-info-atom";

export const profileToggleAtom = atom<boolean>({
  key: "profileToggleAtomKey",
  default: false,
});

// Define an atom to store the current message ID
export const currentMessageAtom = atom<currentMessageType>({
  key: "currentMessageAtomKey",
  default: {
    message: null,
  },
});

// Define an atom family to store individual chat messages
export const chatAtom = atom<Message[]>({
  key: "messageAtomFamilyKey",
  default: [], // Default message structure
});

// Define a selector to fetch the entire chat message list
export const chatListSelector = selector<Message[]>({
  key: "chatListSelectorKey",
  get: async ({ get }) => {
    const isLoggedIn = get(isLoggedInAtom);
    const { email } = get(currentUserAtom);
    const { _id } = get(currentSectionAtom);

    if (
      isLoggedIn &&
      _id != null &&
      email &&
      email !== process.env.REACT_APP_GUEST_EMAIL
    ) {
      try {
        const messages = await getAllChats(_id);
        return messages;
      } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
      }
    } else {
      return [];
    }
  },
});

// Define a selector to fetch a single chat message based on its ID
export const singleChatSelector = selector<Message | null>({
  key: "singleChatSelectorKey",
  get: async ({ get }) => {
    const currentMessageId = get(currentMessageAtom);
    const isNewSection = get(isNewSectionAtom);
    const currSection = get(currentSectionAtom);
    if (
      currentMessageId.message !== null &&
      currentMessageId.message.trim() !== ""
    ) {
      try {
        const message = await getSingleChat(
          currentMessageId.message,
          currSection._id!,
          isNewSection
        );
        return message;
      } catch (error) {
        console.error("Error fetching single chat message:", error);
        return null;
      }
    }

    return null;
  },
});
