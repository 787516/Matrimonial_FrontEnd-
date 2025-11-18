import { useState } from 'react';
import React from 'react'

const ChatBox = ({ conversationId, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(conversationId, message);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
