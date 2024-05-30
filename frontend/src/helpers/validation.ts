import { LoginUserType, SignupUserType, errorMessageType } from "../types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const loginValidation = ({ email, password }: LoginUserType) => {
  const errorMessage: errorMessageType = [];
  const emailTest = emailRegex.test(email);
  const passwordTest =
    password.trim().length >= 5 && password.trim().length <= 20;
  if (email.trim() === "") {
    errorMessage[1] = { email: "email is required." };
  } else if (!emailTest) {
    errorMessage[1] = { email: "invalid email format" };
  }
  if (password.trim() === "") {
    errorMessage[2] = { password: "Password is required." };
  } else if (!passwordTest) {
    errorMessage[2] = { password: "Password must be 5-20 character" };
  }
  return errorMessage;
};

export const signupValidation = ({ name, email, password }: SignupUserType) => {
  const errorMessage = loginValidation({ email, password });

  if (name.trim() === "") {
    errorMessage[0] = { name: "name is required" };
  } else if (name.trim().length > 20) {
    errorMessage[0] = { name: "name must be 1-20 characters" };
  }
  return errorMessage;
};
