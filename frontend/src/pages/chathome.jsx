import React, { useEffect } from 'react'
import ChatUI from './right'
import ChatSidebar from './left'
import { useNavigate } from 'react-router-dom'

const chathome = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('jwt')){
      navigate('/login')
    }
  })
  return (
    <div className='w-full flex justify-between'>
        <div className='w-[25%]'>
            <ChatSidebar/>
        </div>
        <div className='w-[75%]'>
            <ChatUI/>
        </div>
    </div>
  )
}

export default chathome
