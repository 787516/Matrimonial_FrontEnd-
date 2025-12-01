import React from "react";
import { useParams } from "react-router-dom";
import MessageContainer from "../../components/chat/messages/MessageContainer";
import Sidebar from "../../components/chat/sidebar Messages/Sidebar";

const Conversation = () => {
  const { conversationId } = useParams(); // kept if you use it later

  return (
    <>
      {/* STEP 1: full-screen chat layout (no page scrolling) */}
     <style>{`
  .chat-page {
    display: flex;
    height: calc(100vh - 72px); /* navbar height */
    width: 100%;
    overflow: hidden;
    background: #ffffff;
  }

  .chat-left {
    height: 100%;
  }

  .chat-right {
    flex: 1;
    height: 100%;
  }
`}</style>

<div className="chat-page">
  <div className="chat-left">
    <Sidebar />
  </div>

  <div className="chat-right">
    <MessageContainer />
  </div>
</div>

    </>
  );
};

export default Conversation;
