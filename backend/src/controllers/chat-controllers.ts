import { NextFunction, Request, Response } from "express";
import OpenAI from "openai";
import { configureOpenAi } from "../config/openai-config.js";
import { Chat, User } from "../models/User.js";

export const getSingleChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const { email } = res.locals.jwtData;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const config = configureOpenAi();
    const openai = new OpenAI(config);

    const chatResponse = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    const chat = await Chat.create({
      user: user._id,
      message,
      response: chatResponse.choices[0].message.content,
    });
    return res
      .status(200)
      .json({ chat: { message: chat.message, response: chat.response } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const projection = {
      message: 1,
      response: 1,
      _id: 0, // Exclude the _id field
    };

    const chats = await Chat.find({user: user._id}, projection);

    return res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
