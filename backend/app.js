import express from "express"
import { app ,server } from "./Socketio/server.js"

import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotnev from 'dotenv'
dotnev.config();

import authentication from './routes/auth.js'
import userbasic from './routes/user_basic.js'
import messaging from './routes/sending_messages.js'

const port = 3000;

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/auth",authentication)
app.use("/users",userbasic)
app.use("/message",messaging)

mongoose.connect(process.env.MONGO_URL_AT)
mongoose.connection.on("connected",()=>{
    console.log(`Database have been connected`)
})

mongoose.connection.on("error",()=>{
    console.log(`error on ${process.env.MONGO_URL_AT}`)
})

// try{
//   mongoose.connect(process.env.MONGO_URL_AT)
//   console.log("MongoDb atlas")
// }catch(error){
//   console.log(error)
// }

app.get("/", (req, res) => {
  res.send("Is gonna be my new project ");
});

server.listen(port, () => {
  console.log(`app is conneceted on port ${port} `);
});