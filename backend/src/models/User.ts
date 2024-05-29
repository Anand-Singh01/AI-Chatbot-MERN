import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:20,
        minLength:1
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
})

const chatSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message:{
        type: String,
        required: true
    },
    response:{
        type:String
    }
    
})

const User =  mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);
export { Chat, User };
