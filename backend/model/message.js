import mongoose from "mongoose"
const {ObjectId} = mongoose.Schema.Types
// import users from "./singup.js"

const messageSchema=new mongoose.Schema({
    sender:{
        type:ObjectId,
        ref:'users',
    },
    receiver:{
        type:ObjectId,
        ref:'users',
    },
    message:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    },
)

const message=mongoose.model('message',messageSchema)

export default message