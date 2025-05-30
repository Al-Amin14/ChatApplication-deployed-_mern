import React, { useState } from 'react'
import useConversation from '../statemanagent/useConversation.js'
import getMessages from './getMessages.jsx'

const sendMessage = () => {

  const [loadingMsg, setLoadingMsg] = useState(false);
  const {setMessages,selectedConversation,messages}=useConversation()

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
    setMessages([...messages,result])
    setLoadingMsg(false)
    }
  )
  }

  return {
    loadingMsg,sendMessageuser
  }
}

export default sendMessage
