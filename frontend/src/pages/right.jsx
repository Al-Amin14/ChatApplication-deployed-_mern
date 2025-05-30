import React from 'react';
import getMessages from '../context/getMessages';
import message from '../../../backend/model/message';
import LoadingScreen from './loading';
import useConversation from '../statemanagent/useConversation';
import Allchat from './allchat';

const ChatBubble = ({ text, isSender , isreceive }) => (
  <div className={`flex ${isSender==localStorage.getItem('id') ? 'justify-start' : isreceive==localStorage.getItem('id')? 'justify-start' :'justify-end'} my-1`}>
    <div 
      className={`px-4 py-2 rounded-lg text-white max-w-xs ${isSender==localStorage.getItem('id') ? 'bg-blue-500' : isreceive==localStorage.getItem('id')? 'bg-blue-500' :'bg-green-500'}`}
    >
      {text}
    </div>
  </div>
);

const ChatUI = () => {

  const {messages,loading}=getMessages()
  
  const {selectedConversation}=useConversation()
  if(selectedConversation == null) {
    return <div className='w-full text-center text-4xl items-center bg-gray-900 text-white min-h-screen flex justify-center'>Please select your users</div> 
  } else{
    return <Allchat/>
  }


  
};

export default ChatUI;
