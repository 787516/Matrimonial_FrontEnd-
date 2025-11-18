import { Link } from 'react-router-dom';
import React from 'react'

const ConversationList = ({ conversations }) => {
  return (
    <div className="conversation-list">
      {conversations.map((conv) => (
        <Link key={conv.id} to={`/chat/${conv.id}`} className="conversation-item">
          <h5>{conv.userName}</h5>
          <p>{conv.lastMessage}</p>
        </Link>
      ))}
    </div>
  );
};

export default ConversationList;
