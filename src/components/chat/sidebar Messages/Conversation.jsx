import React from "react";
import { useSocketContext } from "../../../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import profilrPicPlaceholder from "../../../assets/profileAvtar.jpg";

const Conversation = ({ conversation, lastIdx }) => { 

  const {
    selectedConversation,
    setSelectedConversation,
    unread,
    clearUnread,
  } = useConversation();

  const { onlineUsers, socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const myId = authUser?.user?._id;
  const myFirstName = authUser?.user?.firstName;

  const isSelected =
    selectedConversation?._id === conversation?._id ||
    selectedConversation?.roomId === conversation?.roomId;

  const isOnline = onlineUsers.includes(conversation._id);
  const unreadCount = unread[conversation._id] || 0;
  

  const handleClick = () => {

    setSelectedConversation(conversation);
    clearUnread(conversation._id);

    if (socket && socket.connected) {
      socket.emit("joinChat", {
        firstName: myFirstName,
        userId: myId,
        targetUserId: conversation._id,
      });
    }
  };
  
  const lastMsgText =
    conversation?.lastMessage ||
    conversation?.preview ||
    conversation?.about ||
    "";

  return (
    <>
      {/* Style ONLY for conversation row – looks exactly like your screenshot */}
      <style>{`
        .conv-item {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          cursor: pointer;
          background: #ffffff;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.15s ease-in-out;
        }
        .conv-item:hover {
          background: #f9fafb;
        }

        .conv-active-line {
          width: 3px;
          align-self: stretch;
          border-radius: 999px;
          background: transparent;
          margin-right: 10px;
        }
        .conv-item.conv-active .conv-active-line {
          background: #2563eb; /* blue line like screenshot */
        }

        .conv-avatar-wrap {
          position: relative;
          margin-right: 10px;
        }

        .conv-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .conv-online-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e; /* green */
          border: 2px solid #ffffff;
        }

        .conv-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .conv-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .conv-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #111827;
        }

        .conv-time {
          font-size: 0.75rem;
          color: #9ca3af;
          white-space: nowrap;
          margin-left: 8px;
        }

        .conv-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .conv-msg {
          font-size: 0.83rem;
          color: #6b7280;
          max-width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .conv-badge {
          min-width: 20px;
          height: 20px;
          border-radius: 999px;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ef4444; /* red circle */
          color: #ffffff;
          margin-left: 8px;
        }
      `}</style>

      <div
        className={`conv-item ${isSelected ? "conv-active" : ""}`}
        onClick={handleClick}
      >
        {/* LEFT BLUE LINE */}
        <div className="conv-active-line" />

        {/* Avatar */}
        <div className="conv-avatar-wrap">
          <img
            src={conversation.profilePhoto || profilrPicPlaceholder}
            alt="user avatar"
            className="conv-avatar"
          />
          {isOnline && <span className="conv-online-dot" />}
        </div>

        {/* Text area */}
        <div className="conv-main">
          <div className="conv-top">
            <span className="conv-name">{conversation.fullName}</span>

            {conversation.lastTime && (
              <span className="conv-time">{conversation.lastTime}</span>
            )}
          </div>

          <div className="conv-bottom">
            <span className="conv-msg">{lastMsgText}</span>

            {unreadCount > 0 && (
              <span className="conv-badge">{unreadCount}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
