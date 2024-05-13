import { NextFunction, Request, Response } from "express";
import { logInSchema, messageSchema, signUpSchema } from "./zod/validation.js";

export const validateSignUp = (req : Request, res : Response, next: NextFunction)=>
{
    const {name, email, password} = req.body;
    const obj = {name, email, password}
    const result = signUpSchema.safeParse(obj);
    if(!result.success)
    {
        const errors = result.error.issues.map(({ message }) => ({ msg: message }));
        res.status(401).json({errors:errors});
        return;
    }
    next();
}

export const validateLogin = (req : Request, res : Response, next: NextFunction)=>
{
        const {email, password} = req.body;
        const obj = {email, password}
        const result = logInSchema.safeParse(obj);
        if(!result.success)
        {
            const errors = result.error.issues.map(({ message }) => ({ msg: message }));
            res.status(401).json({errors:errors});
            return;
        }
        next();
}

export const validateMessage = (req : Request, res : Response, next: NextFunction)=>
{
    const {message} = req.body;
    const obj = {message}
    const result = messageSchema.safeParse(obj);
    if(!result.success)
    {
        const errors = result.error.issues.map(({ message }) => ({ msg: message }));
        res.status(401).json({errors:errors});
        return;
    }
    next();
}
