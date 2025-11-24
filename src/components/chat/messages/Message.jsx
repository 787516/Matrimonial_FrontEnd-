import { useAuthContext } from "../../../context/AuthContext.jsx";
import { extractTime } from "../../../utils/extractTime";
import useConversation from "../zustand/useConversation";
import profileAvtar from "../../../assets/profileAvtar.jpg";
import React from "react";

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
    <div
      className={`chat relative ${fromMe ? "chat-end" : "chat-start"
        } animate-[fadeInUp_0.25s_ease-out]`}
    >
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-11 h-11 rounded-full border border-rose-300 shadow-sm overflow-hidden">
          <img
            src={profilePic || profileAvtar}
            alt="User avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Bubble */}
      <div
        className={` chat-bubble inline-block max-w-[75%] px-4 p-10 py-2 text-white 
    rounded-2xl shadow-xl backdrop-blur-sm
    ${fromMe
            ? "bg-linear-to-br from-rose-500 to-pink-500 shadow-rose-900/20"
            : "bg-linear-to-br from-slate-700 to-slate-800 shadow-black/30"
          }
  `}
      >
        <p className="leading-relaxed text-[0.95rem] wrap-break-word">
          {message?.message}
        </p>

        <div className="text-[0.7rem] opacity-70 text-right mt-1 select-none">
          {formattedTime}
        </div>
      </div>

    </div>
  );
};

export default Message;
