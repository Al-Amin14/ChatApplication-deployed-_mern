import React, { useEffect } from "react";
import { useSocketContext } from "./socketcontent";
import useConversation from "../statemanagent/useConversation";

function useGetSocketMessage(){
    const {socket}=useSocketContext()
    const {messages,setMessages}=useConversation()

    useEffect(()=>{
        socket.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage])
        });
        return ()=>socket.off("newMessage")
    },[socket,messages,setMessages])

}

export default useGetSocketMessage