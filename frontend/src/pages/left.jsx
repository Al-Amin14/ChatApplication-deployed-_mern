import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Lucide icon for search

const contacts = Array(10).fill({
  name: 'Ankit Pathak',
  email: 'Ankit@gmail.com',
  avatar: 'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
});

const ChatSidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col p-2">
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
        {contacts.map((contact, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
              selectedIndex === index ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            <div>
                <img className='w-3 fixed left-9' src="../images/icon.png" alt="not present" />
                <img
                src={contact.avatar}
                alt={contact.name}
                className="w-14 h-12 rounded-full"
                />
            </div>
            <div>
              <div className="font-semibold">{contact.name}</div>
              <div className="text-sm text-gray-400">{contact.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
