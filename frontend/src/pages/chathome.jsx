import React from 'react'
import ChatUI from './right'
import ChatSidebar from './left'

const chathome = () => {
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
