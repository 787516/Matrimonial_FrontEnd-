import React, { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/ChatHook/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../../hooks/ChatHook/useListenMessages";

// Import your background image
import chatBackground from "../../../assets/Gemini_Generated_Image_6xbbw96xbbw96xbb.png";

const Messages = () => {
  const { messages = [], loading } = useGetMessages();
  useListenMessages();

  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, loading]);

  return (
    <div
      className="mc-messages"
      style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: "10px",
        display: "flex",
        flexDirection: "column",

        /* ⭐ PERFECT CHAT BACKGROUND ⭐ */
        backgroundImage: `url(${chatBackground})`,
        // ⬇️ ONLY CHANGE: make pattern smaller & clear, no zoom feel
        backgroundSize: "260px 260px",
        backgroundRepeat: "repeat",      // Fill whole area naturally
        backgroundPosition: "top left",
        backgroundAttachment: "fixed",   // Background does NOT move
        backgroundColor: "#f8f8f8",      // Soft fallback
      }}
    >
      {loading ? (
        [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
      ) : messages.length > 0 ? (
        messages.map((msg, index) => (
          <Message
            key={msg._id || msg.tempId || index}
            message={msg}
          />
        ))
      ) : (
        <p className="text-center text-muted mt-4">
          Send a message to start the conversation 💌
        </p>
      )}

      {/* Auto scroll target */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Messages;
