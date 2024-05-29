import { z } from "zod";
export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "username should be minimum 1 characters long." })
    .max(20, { message: "username should be max 20 characters long." }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "password should be minimum 5 characters long." })
    .max(20, { message: "password should be maximum 20 characters long." }),
});

export const logInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "password should be minimum 5 characters long." }),
});

export const messageSchema = z.object({
  message: z.string().min(1, { message: "Invalid message" }),
});

export const updateCredentialSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "username should be minimum 2 characters long." }),
    currentPassword: z
      .string()
      .min(5, {
        message: "current password should be minimum 5 characters long.",
      }),
    newPassword: z
      .string()
      .min(5, { message: "new password should be minimum 5 characters long." }),
    confirmNewPassword: z
      .string()
      .min(5, {
        message: "confirmed password should be minimum 5 characters long.",
      }),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );
