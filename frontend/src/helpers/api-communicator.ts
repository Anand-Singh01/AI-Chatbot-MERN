import axios from "axios";

export const loginUser = async(email: string, password: string)=>
{
    try
    {
        const res = await axios.post("/user/login", {email, password})
        if (res.status !== 200) 
        {
            throw new Error("unable to login");
        }
        const data = await res.data;
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}

export const checkAuthStatus = async()=>
{
    try
    {
        const res = await axios.get("/user/auth-status")
        if (res.status !== 200) 
        {
            throw new Error("Session end.");
        }
        const data = await res.data;
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getSingleChat = async(message: string | null)=>
{
    try
    {
        const res = await axios.post("/chats/getOne", {message});
        if (res.status !== 200) 
        {
            throw new Error("Error fetching chats");
        }
        const data = await res.data;
        return data.chat;
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getAllChats = async()=>
    {
        try
        {
            const res = await axios.get("/chats/getAll");
            if (res.status !== 200) 
            {
                throw new Error("Error fetching chats");
            }
            const data = await res.data;
            return data.chats;
        }
        catch(error)
        {
            console.log(error);
        }
    }