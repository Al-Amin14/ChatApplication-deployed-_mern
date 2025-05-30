import React, { useState } from 'react'
import useConversation from '../statemanagent/useConversation.js'
import getMessages from '../context/getMessages.jsx'

const sendMessage = () => {

  const [loadingMsg, setLoadingMsg] = useState(false);
  const {setMessages,selectedConversation}=useConversation()

  const sendMessageuser=(messagetxt)=>{
    setLoadingMsg(true)
    console.log(selectedConversation._id)
    fetch(`http://localhost:3000/message/send/${selectedConversation._id}`,{
      method:"post",
      headers:{
        "content-type":"application/json",
        "authorization":"Bearer "+localStorage.getItem('jwt'),
      },
      body:JSON.stringify({
              message:messagetxt
          })
    }).then(res=>res.json()).then(result=>{
      fetch(`http://localhost:3000/message/allmessage/${selectedConversation==null?sendvalue:selectedConversation._id}`,{
        method:"get",
        headers:{
            "content-type":"application/json",
            "authorization":"Bearer "+localStorage.getItem('jwt')
        }
    }).then(res=>res.json()).then(result=>{
        setMessages(result.messages)
        setLoadingMsg(false)
    })
    })
  }

  return {
    loadingMsg,sendMessageuser
  }
}

export default sendMessage
