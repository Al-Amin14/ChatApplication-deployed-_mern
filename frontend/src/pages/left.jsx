import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Lucide icon for search
import { useEffect } from 'react';
import useConversation from '../statemanagent/useConversation';
import { useSocketContext } from '../context/socketcontent';



const ChatSidebar = () => {
  const {selectedConversation,setSelectedConversation}=useConversation()
  // const isSelected=selectedConversation?._id===User._id

  const [contacts, setContacts] = useState([{}]);

  const {socket,Onlineuser}=useSocketContext()
  const isOnline=Onlineuser.includes(localStorage.getItem('id'))


  useEffect(() => {
    console.log("-----")
    fetch("http://localhost:3000/users/alluser",{
        method:"get",
        headers:{
          "Authorization":"Bearer "+localStorage.getItem('jwt'),
          "content-type":"application/json"},
      }).then(res=>res.json()).then(result=>{
        setContacts(result); 
      })
  }, []);

  return (
    <div className="w-full h-full bg-black text-white flex flex-col p-2">
      {/* Search Bar with Icon */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {contacts!=null && contacts.map((contact, index) => (
          <div
            key={index}
            onClick={() => setSelectedConversation(contact)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
               selectedConversation?._id === contact._id ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            <div>
               {Onlineuser.includes(contact._id) ? (<img className='w-3 left-9' src="../images/icon.png" alt="not present" />) : (<div></div>)} 
                <img
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                alt={contact.fullname}
                className="w-12 h-12 rounded-full"
                />
            </div>
            <div>
              <div className="font-semibold">{contact.fullname}</div>
              <div className="text-sm text-gray-400">{contact.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
