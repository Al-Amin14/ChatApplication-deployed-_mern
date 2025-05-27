import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import users from '../model/singup.js'

const userjwt=(req,res,next)=>{
    const {authorization}=req.headers

    if(!authorization){
        res.status(422).json({error:"Not valid"})
    }else{
        const token= authorization.replace("Bearer ","")
        jwt.verify(token,process.env.jwt_secreat,(err,payload)=>{
            if(err){
                console.log(err)
                res.status(422).json({error:"logout"})
            }else{
                const {_id}=payload
                users.findById(_id).then(saveuser=>{
                    if(!saveuser){
                        res.status(422).json({error:"logout"})
                    }else{
                        req.user=saveuser
                        next()
                    }
                });
            }
        })
    }
}


export default userjwt