import React from 'react';
import getMessages from '../context/getMessages';
import message from '../../../model/message';
import LoadingScreen from './loading';
import useConversation from '../statemanagent/useConversation';
import Allchat from './allchat';


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
