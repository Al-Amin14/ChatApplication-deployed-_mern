import mongoose from "mongoose"
const {ObjectId}= mongoose.Schema.Types


const conversationSchema= new mongoose.Schema({
    participants:[{
        type:ObjectId,
        ref:'users'
    }],
    messages:[{
        type:ObjectId,
        ref:'message', 
        default:[]
    }]
})

const conversation=mongoose.model('conversation',conversationSchema)

export default conversation