import React from 'react'

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`message-item ${isOwn ? 'own' : 'other'}`}>
      <p>{message.text}</p>
      <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
    </div>
  );
};

export default MessageItem;
