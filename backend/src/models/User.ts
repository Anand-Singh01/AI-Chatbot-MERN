import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  section: { type: Schema.Types.ObjectId, ref: "Section" },
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
});

const sectionSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  sectionName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
});

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);
const Section = mongoose.model("Section", sectionSchema);
export { Chat, Section, User };
