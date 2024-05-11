var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hash } from "bcrypt";
import User from "../models/User.js";
export const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
});
export const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = yield hash(password, 10);
        const user = yield User.create({ name, email, password: hashedPassword });
        return res.status(200).json({ message: "ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(200).json({ msg: "email already exists" });
        }
        else {
            return res.status(200).json({ message: "ERROR", cause: error.message });
        }
    }
});
