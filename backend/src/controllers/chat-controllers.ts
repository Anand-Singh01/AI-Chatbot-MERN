interface sections {
  sectionName: String;
  createdAt: String;
}

import { NextFunction, Request, Response } from "express";
import OpenAI from "openai";
import { configureOpenAi } from "../config/openai-config.js";
import { Chat, Section, User } from "../models/User.js";

export const deleteSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sectionId } = req.body;
    const section = await Section.findById(sectionId);
    if (section) {
      await section.deleteOne({ _id: section._id });
      await Chat.deleteMany({ section: section._id });
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ msg: "section not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateSectionName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sectionId, newName } = req.body;
    const section = await Section.findById(sectionId);
    console.log(section);
    if (section) {
      await Section.updateOne(
        { _id: section._id },
        {
          sectionName: newName,
        }
      );
      return res.status(200).json({ sectionName: newName });
    } else {
      return res.status(404).json({ msg: "section not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.jwtData;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    if (user.email === "test123@gmail.com") {
      return res.status(200).json({ sections: [] });
    } else {
      const projection = {
        _id: 1,
        sectionName: 1,
        createdAt: 1,
      };
      const sections = await Section.find({ user: user._id }, projection);
      if (sections.length > 0) {
        const sortedSections = filteredSections(sections);
        return res.json({ chatSections: sortedSections });
      } else {
        return res.json({ chatSections: [] });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSingleChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, isNewSection } = req.body;
    let { sectionId } = req.body;
    const { email } = res.locals.jwtData;
    let sectionName = "";
    let createdAt = "";

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
    if (user.email === "test123@gmail.com") {
      return res.status(200).json({
        chat: { message, response: chatResponse.choices[0].message.content },
      });
    } else {
      if (isNewSection) {
        const section = await Section.create({
          user: user._id,
          createdAt: new Date().toISOString().slice(0, 10),
          sectionName: "chat - " + new Date().toISOString().slice(0, 10),
        });
        sectionId = section._id;
        sectionName = section.sectionName;
        createdAt = section.createdAt;
      } else {
        sectionName = req.body.sectionName;
      }
      const chat = await Chat.create({
        user: user._id,
        section: sectionId,
        message,
        response: chatResponse.choices[0].message.content,
      });
      return res.status(200).json({
        chat: {
          message: chat.message,
          response: chat.response,
          sectionId: sectionId,
          sectionName: sectionName,
          createdAt: createdAt,
        },
      });
    }
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
    const { email } = res.locals.jwtData;
    const { sectionId } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    if (user.email === "test123@gmail.com") {
      return res.status(200).json({ chats: [] });
    } else {
      const projection = {
        message: 1,
        response: 1,
        _id: 0,
      };
      const chats = await Chat.find(
        { user: user._id, section: sectionId },
        projection
      );
      return res.status(200).json({ chats });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const filteredSections = (sections: sections[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  const past7days = new Date(today);

  yesterday.setDate(today.getDate() - 1);
  past7days.setDate(yesterday.getDate() - 7);

  const todayDate = today.toISOString().slice(0, 10);
  const yesterdayDate = yesterday.toISOString().slice(0, 10);
  const past7daysDate = past7days.toISOString().slice(0, 10);
  const Today = sections.filter((s) => {
    return s.createdAt === todayDate;
  });

  const Yesterday = sections.filter((s) => {
    return s.createdAt === yesterdayDate;
  });

  const Past7days = sections.filter((s) => {
    return s.createdAt >= past7daysDate && s.createdAt < yesterdayDate;
  });

  const final: { [key: string]: sections[] } = { Today, Yesterday, Past7days };
  let res: { [key: string]: sections[] } = {};
  Object.keys(final).forEach((key) => {
    if (final[key].length > 0) {
      res[key] = final[key];
    }
  });

  return res;
};
