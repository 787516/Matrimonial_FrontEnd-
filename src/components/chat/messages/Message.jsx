import React from "react";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { extractTime } from "../../../utils/extractTime";
import useConversation from "../zustand/useConversation";
import profileAvtar from "../../../assets/profileAvtar.jpg";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

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
      {/* INTERNAL STYLE – ONLY ALIGNMENT + BUBBLES */}
      <style>{`
        .msg-row {
          display: flex;
          width: 100%;
          margin-bottom: 8px;
        }

        .msg-row.me {
          justify-content: flex-end;
        }

        .msg-row.other {
          justify-content: flex-start;
        }

        .msg-bubble-wrap {
          max-width: 70%;
        }

        .msg-bubble {
          padding: 8px 14px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.4;
          word-break: break-word;
        }

        /* opponent message = LEFT grey */
        .msg-bubble.other {
          background: #f3f4f6;
          color: #111827;
          border-top-left-radius: 4px;
        }

        /* your message = RIGHT red */
        .msg-bubble.me {
          background: #f04438;
          color: #ffffff;
          border-top-right-radius: 4px;
        }

        .msg-meta {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 2px;
        }

        .msg-meta.me {
          text-align: right;
        }
      `}</style>

      <div className={`msg-row ${fromMe ? "me" : "other"}`}>

        {/* Show avatar ONLY for opponent messages */}
        {!fromMe && (
          <img
            src={profilePic || profileAvtar}
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
          <div className={`msg-bubble ${fromMe ? "me" : "other"}`}>
            {message?.message}
          </div>

          <div className={`msg-meta ${fromMe ? "me" : ""}`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
