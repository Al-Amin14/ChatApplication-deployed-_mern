import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; 
import useConversation from '../statemanagent/useConversation';
import { useSocketContext } from '../context/socketcontent';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ChatSidebar = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [contacts, setContacts] = useState([{}]);
  const [searchuser, setSearchuser] = useState(''); 

  const { socket, Onlineuser } = useSocketContext();
  const isOnline = Onlineuser.includes(localStorage.getItem('id'));
  const navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/users/alluser", {
      method: "get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
        "content-type": "application/json"
      },
    }).then(res => res.json()).then(result => {
      setContacts(result);
    });
  }, []);

  const confirmLogout=()=>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('id')
    navigate('/login')
  }

  return (
    <div className="w-full h-full bg-black text-white flex flex-col p-2">

      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchuser}
          onChange={(e) => setSearchuser(e.target.value)}
          placeholder="Search"
          className="w-full pl-10 pr-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {contacts != null && contacts
          .filter(contact =>
            contact.fullname?.toLowerCase().includes(searchuser.toLowerCase())
          )
          .map((contact, index) => (
            <div
              key={index}
              onClick={() => setSelectedConversation(contact)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                selectedConversation?._id === contact._id
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div>
                {Onlineuser.includes(contact._id) ? (
                  <img className='w-3 left-9' src="../images/icon.png" alt="online" />
                ) : (
                  <div></div>
                )}
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
      <div onClick={()=>{confirmLogout()}} className='w-full cursor-pointer font-bold flex items-center text-2xl '>
        <IoLogOut className='m-2' />
        <p>LogOut</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
