import express, { Router } from 'express'
const router=express.Router()
import mongoose from 'mongoose'
import Message from '../model/message.js'
import Conversation from '../model/conversation.js'
import userjwt from '../moddleware/usertoken.js'

router.post('/send/:id',userjwt,async (req,res)=>{
    try {
        const {message}=req.body
        const {id:receiverid}=req.params;
        const sender=req.user._id
        console.log(sender,receiverid)
        let conversation= await Conversation.findOne(
            {participants :{$all:[sender,receiverid]}}
        )
        console.log(conversation)
        
        if(!conversation){
            conversation=await Conversation.create({
                participants:[sender,receiverid]
            })
        }
        const newMessage=Message.create({
            sender:sender,
            receiver:receiverid,
            message:message
        }).then(async(result)=>{
            console.log(result._id)
            conversation.messages.push(result._id)
            await conversation.save()
            res.json(conversation)
        })
    } catch (error) {
        res.status(422).json(error)
    }
})



router.get('/allmessage/:id',userjwt,async (req,res)=>{

    const {id:recerver}=req.params
    const sender=req.user._id
    let conversation=await Conversation.findOne({participants:{$all:[recerver,sender]}}).populate("messages")
    if(!conversation){
        return res.json([])
    }
    res.json(conversation)
})


export default router