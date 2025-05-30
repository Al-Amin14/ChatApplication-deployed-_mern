import React, { useEffect, useState } from "react";
import useConversation from "../statemanagent/useConversation";

const getMessages = () => {
   const [loading, setLoading] = useState(false);
   const {selectedConversation,messages,setMessages}=useConversation()
   

   useEffect(() => {
    let sendvalue
    if(selectedConversation==null){
        sendvalue=localStorage.getItem('id')
    }
    setLoading(true)

    fetch(`http://localhost:3000/message/allmessage/${selectedConversation==null?sendvalue:selectedConversation._id}`,{
        method:"get",
        headers:{
            "content-type":"application/json",
            "authorization":"Bearer "+localStorage.getItem('jwt')
        }
    }).then(res=>res.json()).then(result=>{
        console.log(result.messages)
        setMessages(result.messages)
        setLoading(false)
    })

   }, [selectedConversation,setMessages]);

  return {
    messages,
    loading
  }
}

export default getMessages
