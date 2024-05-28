import axios from "axios";
import { updateProfileInfoType } from "../types";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
      throw new Error("unable to login");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
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

export const signupUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const res = await axios.post("/user/signup", { email, password, name });
    if (res.status !== 200) {
      throw new Error("unable to signup");
    }
    const data = await res.data;
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

export const getSingleChat = async (message: string | null) => {
  try {
    const res = await axios.post("/chats/getOne", { message });
    if (res.status !== 200) {
      throw new Error("Error fetching chats");
    }
    const data = await res.data;
    return data.chat;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async (email : string | null) => {
  try {
    const res = await axios.post("/chats/getAll", {email});
    if (res.status !== 200) {
      throw new Error("Error fetching chats");
    }
    const data = await res.data;
    return data.chats;
  } catch (error) {
    console.log(error);
  }
};
