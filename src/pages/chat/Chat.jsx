import { useEffect, useState } from 'react';
import ConversationList from '../../components/chat/ConversationList';
import ChatBox from '../../components/chat/ChatBox';
import React from 'react';

const Chat = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch conversations
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <ConversationList conversations={conversations} />
        <div className="chat-main">
          <p>Select a conversation to start chatting</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
