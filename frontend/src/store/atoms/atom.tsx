import { atom, atomFamily, selector } from "recoil";
import { getAllChats, getSingleChat } from "../../helpers/api-communicator";
import { Message } from "../../types";

export const isLoggedInAtom = atom({
  key: "isLoggedInAtomKey",
  default: false,
});

export const currentUserAtom = atom({
  key: "currentUserIdAtomKey",
  default: { name: null, email: null },
});

// Define an atom to store the current message ID
export const currentMessageAtom = atom<string | null>({
  key: "currentMessageAtomKey",
  default: null,
});

// Define an atom family to store individual chat messages
export const messageAtomFamily = atomFamily<Message, number>({
  key: "messageAtomFamilyKey",
  default: { message: "", response: "" }, // Default message structure
});

// Define a selector to fetch the entire chat message list
export const chatListSelector = selector<Message[]>({
  key: "chatListSelectorKey",
  get: async () => {
    try {
      const messages = await getAllChats();
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  },
});

// Define a selector to fetch a single chat message based on its ID
export const singleChatSelector = selector<Message | null>({
  key: "singleChatSelectorKey",
  get: async ({ get }) => {
    const currentMessageId = get(currentMessageAtom);
    if (currentMessageId !== null && currentMessageId.trim() != "") {
      try {
        const message = await getSingleChat(currentMessageId);
        console.log(message);
        return message;
      } catch (error) {
        console.error("Error fetching single chat message:", error);
        return null;
      }
    }
    return null;
  },
});