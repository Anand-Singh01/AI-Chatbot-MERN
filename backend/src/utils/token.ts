import { Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn:expiresIn });
    return token;
};

export const handleTokenAndCookie = (res : Response, id : string, email : string, expiresIn: string)=>
{
    res.clearCookie(COOKIE_NAME);
    const token = createToken(id, email, expiresIn);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {path:"/", domain:"localhost", expires, httpOnly:true, signed:true});
}