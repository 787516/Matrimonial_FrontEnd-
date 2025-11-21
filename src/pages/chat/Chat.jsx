// import { useEffect, useState } from 'react';
// import ConversationList from '../../components/chat/ConversationList';
// import ChatBox from '../../components/chat/ChatBox';
// import React from 'react';

// const Chat = () => {
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     // Fetch conversations
//   }, []);

//   return (
//     <div className="chat-page">
//       <div className="chat-container">
//         <ConversationList conversations={conversations} />
//         <div className="chat-main">
//           <p>Select a conversation to start chatting</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import MessageContainer from "../../components/chat/messages/MessageContainer.jsx";
import Sidebar from "../../components/chat/sidebar Messages/Sidebar.jsx";
import { useAuthContext } from "../../context/AuthContext";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Chat = () => {
    
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    

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
export default Chat;
