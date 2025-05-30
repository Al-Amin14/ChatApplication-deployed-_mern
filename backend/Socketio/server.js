import { Server } from 'socket.io'

import http from 'http'
import express from 'express'

const app=express()

const server =http.createServer(app)

const io =new Server(server,{
    cors:{
        origin:"https://chatapplication-deployed-mern-4l41.onrender.com",
        methods:["GET","POST"]
    }
})

export const getReciverid=(receiverid)=>{
    return usres[receiverid]
}

const usres={}
io.on("connection",(socket)=>{

    console.log('New Client connected ',socket.id)

    const userId=socket.handshake.query.useId
    if(userId){
        usres[userId]=socket.id
        console.log("heeloo ",usres)
    }

    io.emit("getOnlineuser",Object.keys(usres))

    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.id)
        delete usres[userId]
        io.emit("getOnlineuser",Object.keys(usres))
    })
})

export {app,io,server}