import React from "react";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../../../hooks/ChatHook/useGetConversations";
import { getRandomEmoji } from "../../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations = [] } = useConversation(); // safe fallback
  const { loading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length === 0 && !loading && (
        <p className="text-center text-gray-400 py-3">
          No conversations yet. Start chatting 💬
        </p>
      )}

      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id || idx}
          conversation={conversation}
        //   emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading && (
        <span className="loading loading-spinner mx-auto mt-3"></span>
      )}
    </div>
  );
};

export default Conversations;
