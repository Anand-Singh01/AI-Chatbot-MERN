// Contains Functions to connect to Express Server
import axios from "axios";
import { response, sectionData, updateProfileInfoType } from "../types";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    const { status } = res;
    const data: response = await res.data;
    return { ...data, status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { ...error.response.data, status: error.response.status };
    }
  }
};

export const signupUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const res = await axios.post("/user/signup", { email, password, name });
    const { status } = res;
    const data: response = await res.data;
    return { ...data, status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { ...error.response.data, status: error.response.status };
    }
  }
};

export const updateProfileInfo = async ({
  credentials,
}: {
  credentials: updateProfileInfoType;
}) => {
  try {
    const { name, currentPassword, newPassword, confirmNewPassword } =
      credentials;
    const response = await axios.post("/user/update-credentials", {
      name,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    if (response.status !== 200) {
      throw new Error("unable to signup");
    }
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("unable to logout");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
      throw new Error("Session end.");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    // console.log(error);
  }
};

export const getSingleChat = async (
  message: string | null,
  sectionId: string | null,
  isNewSection: boolean
) => {
  try {
    const res = await axios.post("/chats/getOne", {
      message,
      isNewSection,
      sectionId,
    });

    if (res.status !== 200) {
      throw new Error("Error fetching chats");
    }
    const data = await res.data;
    return data.chat;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async (sectionId: string) => {
  try {
    const res = await axios.post(`/chats/getAll/${sectionId}`);
    if (res.status !== 200) {
      throw new Error("Error fetching chats");
    }
    const data = await res.data;
    return data.chats;
  } catch (error) {
    console.log(error);
  }
};

export const getSectionList = async (): Promise<sectionData> => {
  try {
    const res = await axios.post("/chats/getCategories");
    if (res.status !== 200) {
      throw new Error("Error fetching chats");
    }
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return { chatSections: {} };
  }
};

export const updateSectionName = async (
  newName: string,
  sectionId: string
): Promise<{ sectionName: string } | null> => {
  try {
    const res = await axios.post("/chats/updateSectionName", {
      newName,
      sectionId,
    });
    if (res.status !== 200) {
      throw new Error("Error updateing section name");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
