import { hash } from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async(req : Request, res : Response)=>
{
    try
    {
        const users = await User.find();
        return res.status(200).json({message:"ok", users});
    }
    catch(error : any)
    {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
}

export const userSignup = async(req:Request, res: Response)=>
{
    try
    {
        const {name, email, password} = req.body;
        const hashedPassword = await hash(password, 10);
        const user = await User.create({name,email,password:hashedPassword});
        return res.status(200).json({message:"ok", id:user._id.toString()});
    }
    catch(error : any)
    {
        console.log(error);
        if(error.code === 11000 && error.keyPattern.email)
        {
            return res.status(200).json({msg:"email already exists"});
        }else
        {
            return res.status(200).json({message:"ERROR", cause:error.message});
        }
        
    }
    
}
