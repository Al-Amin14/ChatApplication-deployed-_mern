import React, { useState ,useRef , useEffect } from 'react';
import getMessages from '../context/getMessages';
import message from '../../../backend/model/message';
import LoadingScreen from './loading';
import useConversation from '../statemanagent/useConversation';
import sendMessage from '../context/sendMessage';
import { IoSend } from "react-icons/io5";
import { useSocketContext } from '../context/socketcontent';

const ChatBubble = ({ text, isSender , isreceive,scrolling }) => (
  <div ref={scrolling} className={`flex ${isSender==localStorage.getItem('id') ? 'justify-start' : isreceive==localStorage.getItem('id')? 'justify-start' :'justify-end'} my-1`}>
    <div
      className={`px-4 py-2 rounded-lg text-white max-w-xs ${isSender==localStorage.getItem('id') ? 'bg-blue-500' : isreceive==localStorage.getItem('id')? 'bg-blue-500' :'bg-green-500'}`}
    >
      {text}
    </div>
  </div>
);

const Allchat = () => {



    const {loading}=getMessages()
    const {messages,selectedConversation}=useConversation()
    const [txtMsg, setTxtMsg] = useState("");
    const { loadingMsg,sendMessageuser } =sendMessage()
    const {socket,Onlineuser}=useSocketContext()


    const lastMsgRef = useRef()

    useEffect(() => {
      console.log("________-----------------------____")
      setTimeout(() => {
        if(lastMsgRef.current){
          lastMsgRef.current.scrollIntoView({behavior:"smooth"})
        }
      }, 10);
    }, [messages]);
  
  return (
    <div>
      <div  className="w-full bg-gray-900 text-white min-h-screen flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center">
              <img
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                alt="Profile"
                className="rounded-full mr-3 w-12"
              />
              <div>
                <div className="font-semibold">{selectedConversation?.fullname}</div>
                <div className="text-sm text-green-400">{Onlineuser.includes(selectedConversation?._id)? "Online":"Offline"}</div>
              </div>
            </div>
            <div  className="flex-1 p-4 overflow-y-auto">
              {loading==true? <LoadingScreen/>: messages!=null && messages.map((msg, index) => (
                <ChatBubble  key={index} scrolling={lastMsgRef} text={msg.message} isSender={msg.isSender} isreceive={msg.receiver} />
              ))}
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-700">
              <input
                type="text"
                value={txtMsg}
                onChange={(e)=>setTxtMsg(e.target.value)}
                placeholder="Type here"
                className="w-[90%] px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
              />
              <IoSend onClick={()=>{
                sendMessageuser(txtMsg)
                setTxtMsg("")
              }} className='m-2 h-7 w-[5%]' />
            </div>
          </div>
    </div>
  )
}

export default Allchat
 