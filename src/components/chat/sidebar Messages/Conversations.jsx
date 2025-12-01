import React from "react";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../../../hooks/ChatHook/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations = [] } = useConversation();
  const { loading } = useGetConversations();

  return (
    <div className="d-flex flex-column">
      {conversations.length === 0 && !loading && (
        <p className="text-center text-muted py-3">
          No conversations yet. Start chatting 💬
        </p>
      )}

      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id || idx}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border spinner-border-sm" role="status" />
        </div>
      )}
    </div>
  );
};

export default Conversations;
