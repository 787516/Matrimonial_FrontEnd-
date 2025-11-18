import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MessageItem from '../../components/chat/MessageItem';
import ChatBox from '../../components/chat/ChatBox';
import React from 'react';

const Conversation = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages for this conversation
  }, [conversationId]);

  const handleSendMessage = (convId, message) => {
    // Send message API call
  };

  return (
    <div className="conversation-page">
      <div className="messages-list">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
      <ChatBox conversationId={conversationId} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Conversation;
