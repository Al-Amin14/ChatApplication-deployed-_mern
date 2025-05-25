import jwt from 'jsonwebtoken'

import mongoose from 'mongoose'

const userjwt=(req,res,next)=>{
    const {authorization}=req.headers

    if(!authorization){
        res.status(422).json({error:"Not valid"})
    }else{
        const token= authorization.replace("Bearer ","")
        jwt.verify(token,process.env.jwt_secreat,(err,payload)=>{
            if(err){
                res.status(422).json({error:"logout"})
            }else{
                const {_id}=payload
                users.findById(_id).then(saveuser=>{
                    if(!saveuser){
                        res.status(422).json({error:"logout"})
                    }else{
                        res.json(saveuser)
                        next()
                    }
                });
            }
        })
    }
}


export default userjwt