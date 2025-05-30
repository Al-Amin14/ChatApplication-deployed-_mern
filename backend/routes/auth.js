import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import users from '../model/singup.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import createTokenAndSaveCookies from '../jwt/generatejwttoken.js'




router.post('/signup',(req,res)=>{
    const {fullname,email,conformPassword,password}=req.body

    users.findOne({$or:[{email:email,fullname:fullname}]}).then(saveuser=>{
        if(saveuser){
            res.status(422).json({error:"User already exists"})
        }else{

            bcrypt.hash(password,12).then((hashpass)=>{

                users.create(
                    {
                    fullname:fullname,
                    email:email,
                    password:hashpass,
                    conformPassword:conformPassword
                }
            ).then((users) => {
                // createTokenAndSaveCookies(users._id,res)
                res.json("SignUp Successfully")
            }).catch(error=>{
                console.log(error)
                res.status(422).json({error:"Please try again with unique details"})
            });
            })
        }
    })

})

router.post('/singin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(422).json({error:"There is an erro"})
    }else{
        users.findOne({email}).then(saveusers=>{
            if(!saveusers){
                res.json({error:"User not exists"})
            }else{
                bcrypt.compare(password,saveusers.password).then(match=>{
                    if(!match){
                        res.status(422).json({error:"There is a error"})
                    }else{
                       const token=jwt.sign({_id:saveusers._id},process.env.jwt_secreat)
                        res.json({id:saveusers._id,token:token})
                    }
                })
            }
        })
    }
})

router.get('/logout',(req,res)=>{
    try{
        res.clearCookie('jwt')
        res.status(200).json({message:"user logged out successfully "})
        }catch(err){
        console.log(err)
        res.status(500).json({error:"There is a error"})
    }
})

export default router