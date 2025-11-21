import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/ChatHook/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../../hooks/ChatHook/useListenMessages";
import React from "react";

const Messages = () => {
  const { messages = [], loading } = useGetMessages();
  useListenMessages();

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto bg-slate-900">
      {loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length > 0 ? (
        messages.map((msg, index) => (
          <div key={msg._id || msg.tempId || index}>
            <Message message={msg} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 mt-4">
          Send a message to start the conversation 💌
        </p>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
