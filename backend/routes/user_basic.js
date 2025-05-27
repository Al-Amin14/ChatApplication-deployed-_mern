import express from 'express'
const router = express.Router()
const mongoose= express('mongoose')
import userjwt from '../moddleware/usertoken.js'
import users from '../model/singup.js'

router.get('/alluser',userjwt,(req,res)=>{

    try{
        users.find({_id:{$ne:req.user._id}}).then(result=>{
                res.json(result)
        })
    }catch(err){
        res.status(433).json(err)
    }
})

export default router