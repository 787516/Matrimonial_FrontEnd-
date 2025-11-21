import { useParams } from 'react-router-dom';
import MessageContainer from '../../components/chat/messages/MessageContainer';
import Sidebar from '../../components/chat/sidebar Messages/Sidebar';
import React from 'react';

const Conversation = () => {
  const { conversationId } = useParams();

  return (
    <div className='flex h-screen w-full bg-slate-900'>
      {/* Sidebar - Conversations List */}
      <div className='w-full md:w-96 border-r border-slate-700 overflow-hidden'>
        <Sidebar />
      </div>
      
      {/* Message Container - Chat Area */}
      <div className='hidden md:flex flex-1 bg-slate-900 overflow-hidden'>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Conversation;
