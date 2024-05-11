import { z } from "zod";
export const signUpSchema = z.object({
    name: z.string().min(2, { message: "username should be minimum 2 characters long." }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(5, { message: "password should be minimum 5 characters long." })
});
