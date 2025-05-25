import React from 'react';

const ChatBubble = ({ text, isSender }) => (
  <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} my-1`}>
    <div
      className={`px-4 py-2 rounded-lg text-white max-w-xs ${
        isSender ? 'bg-teal-500' : 'bg-blue-500'
      }`}
    >
      {text}
    </div>
  </div>
);

const ChatUI = () => {
  const messages = [
    { text: "Calm down, Anakin.", isSender: false },
    { text: "That's never been done in the history of the Jedi.", isSender: true },
    { text: "Calm down, Anakin.", isSender: false },
    { text: "That's never been done in the history of the Jedi.", isSender: true },
    { text: "Calm down, Anakin.", isSender: false },
    { text: "That's never been done in the history of the Jedi.", isSender: true },
    { text: "Calm down, Anakin.", isSender: false }
  ];

  return (
    <div className="w-full bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full mr-3"
        />
        <div>
          <div className="font-semibold">Ankit Pathak</div>
          <div className="text-sm text-green-400">Online</div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} text={msg.text} isSender={msg.isSender} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <input
          type="text"
          placeholder="Type here"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatUI;
