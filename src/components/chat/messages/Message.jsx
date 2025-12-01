import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { extractTime } from "../../../utils/extractTime";
import useConversation from "../zustand/useConversation";
import useDeleteMessage from "../../../hooks/ChatHook/useDeleteMessage";
import profileAvtar from "../../../assets/profileAvtar.jpg";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { mutate: deleteMessage } = useDeleteMessage();

  const [showMenu, setShowMenu] = useState(false);

  const myId = authUser?.user?._id;
  const myProfilePic = authUser?.profile?.profilePhoto;

  const senderId =
    message?.senderId?._id ||
    message?.senderId ||
    message?.sender ||
    "";

  const fromMe = senderId?.toString() === myId?.toString();

  const otherPic =
    selectedConversation?.profilePic ||
    selectedConversation?.profilePhoto ||
    profileAvtar;

  const profilePic = fromMe ? myProfilePic : otherPic;
  const formattedTime = extractTime(message.createdAt);

  return (
    <>
      <style>{`
        .msg-row {
          display: flex;
          width: 100%;
          margin-bottom: 8px;
          position: relative;
        }

        .msg-row.me {
          justify-content: flex-end;
        }

        .msg-row.other {
          justify-content: flex-start;
        }

        .msg-bubble-wrap {
          max-width: 70%;
          position: relative;
        }

        .msg-bubble {
          padding: 8px 14px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.4;
          word-break: break-word;
          position: relative;
        }

        .msg-bubble.other {
          background: #f3f4f6;
          color: #111827;
          border-top-left-radius: 4px;
        }

        .msg-bubble.me {
          background: #f04438;
          color: #ffffff;
          border-top-right-radius: 4px;
        }

        .msg-menu {
          position: absolute;
          top: -5px;
          right: -5px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          padding: 6px 10px;
          font-size: 0.85rem;
          z-index: 20;
          animation: fadeIn 0.18s ease-out;
          width: 140px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .menu-item {
          padding: 6px 0;
          cursor: pointer;
          color: #444;
        }

        .menu-item:hover {
          color: #e11d48;
        }

        .three-dots {
          cursor: pointer;
          font-size: 18px;
          color: #fff;
          margin-left: 6px;
          opacity: 0.8;
        }

        .three-dots:hover {
          opacity: 1;
        }
      `}</style>

      <div
        className={`msg-row ${fromMe ? "me" : "other"}`}
        onContextMenu={(e) => {
          e.preventDefault();
          if (fromMe) setShowMenu(true);
        }}
      >
        {/* Opponent avatar */}
        {!fromMe && (
          <img
            src={profilePic}
            alt="avatar"
            className="rounded-circle me-2"
            style={{
              width: 28,
              height: 28,
              objectFit: "cover",
              marginTop: "2px",
            }}
          />
        )}

        <div className="msg-bubble-wrap">
          {/* Message Bubble */}
          <div
            className={`msg-bubble ${fromMe ? "me" : "other"}`}
            onMouseEnter={() => fromMe && setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            {message?.message}

            {/* 3-dot icon for your messages */}
            {fromMe && (
              <span
                className="three-dots"
                onClick={() => setShowMenu((p) => !p)}
              >
                ⋮
              </span>
            )}

            {/* Dropdown Menu */}
            {showMenu && fromMe && (
              <div className="msg-menu">
                <div
                  className="menu-item"
                  onClick={() => deleteMessage(message._id)}
                >
                  🗑 Delete Message
                </div>
                <div className="menu-item">
                  ⏱ {formattedTime}
                </div>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={`msg-meta ${fromMe ? "me" : ""}`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
