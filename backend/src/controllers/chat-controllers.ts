import { NextFunction, Request, Response } from "express";
import OpenAI from "openai"; // Importing the OpenAI class
import { configureOpenAi } from "../config/openai-config.js";
import { User } from "../models/User.js";

export const generateChat = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    const { email } = res.locals.jwtData;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const config = configureOpenAi();

    const openai = new OpenAI(config);

    const chatResponse = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
    });
    console.log(chatResponse);
};
