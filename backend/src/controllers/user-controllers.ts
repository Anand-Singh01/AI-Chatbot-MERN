import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User.js";
import { handleTokenAndCookie } from "../utils/token.js";

export const getAllUsers = async(req : Request, res : Response)=>
{
    try
    {
        const users = await User.find();
        return res.status(201).json({message:"ok", users});
    }
    catch(error : any)
    {
        console.log(error);
        return res.status(500).json({message:"Server error"});
    }
}

export const userSignup = async(req:Request, res: Response)=>
{
    try
    {
        const {name, email, password} = req.body;
        const hashedPassword = await hash(password, 10);
        const user = await User.create({name,email,password:hashedPassword});
        handleTokenAndCookie(res, user._id.toString(), user.email, "7d");
        return res.status(200).json({message:"ok", id:user._id.toString()});
    }
    catch(error : any)
    {
        console.log(error);
        if(error.code === 11000 && error.keyPattern.email)
        {
            return res.status(409).json({msg:"user already exists"});
        }else
        {
            return res.status(500).json({message:"Server error"});
        }
    } 
}

export const userLogin = async(req:Request, res: Response)=>
    {
        try
        {
            const {email, password} = req.body;
            const user = await User.findOne({email});

            // If the user does not exist, or if the password doesn't match
            if (!user || !(await compare(password, user.password))) {
                return res.status(401).json({ msg: "Invalid username or password" });
            }
            handleTokenAndCookie(res, user._id.toString(), user.email, "7d");
            return res.status(200).json({message:"ok", email, name:user.name});
        }
        catch(error : any)
        {
            console.log(error); 
            return res.status(500).json({message:"Server error"});
        } 
}

export const verifyUser = async(req:Request, res: Response)=>
{
    try
    {
        const {email} = res.locals.jwtData;
        console.log(email);
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({ msg: "Token malfunctioned" });
        }
        return res.status(200).json({message:"ok", email, name:user.name});
    }
    catch(error)
    {
        console.log(error); 
        return res.status(500).json({message:"Server error"});
    }
}
