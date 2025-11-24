import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import React from "react";
import startChattingImage from "../../../assets/startChatting.png";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col bg-linear-to-br from-slate-900 via-slate-950 to-black text-white h-screen'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Luxurious Header */}
          <div className='bg-linear-to-r from-slate-900 via-slate-950 to-black px-6 py-5 shadow-2xl backdrop-blur-md border-b border-rose-500/30'>
            <div className="flex items-center gap-3">
              <div className="avatar online">
                <div className="w-12 rounded-full ring-1 ring-rose-400 ring-offset-2 ring-offset-transparent">
                  <img src={selectedConversation?.profilePic} alt="profile" />
                </div>
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>{selectedConversation.fullName}</h3>
                <p className='text-sm text-pink-200'>● Online</p>
              </div>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  const firstName = authUser?.user?.firstName || "User";

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-900">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-300 font-semibold flex flex-col items-center gap-4">
        {/* Welcome Heading */}
        <p className="text-white text-xl md:text-2xl font-bold">
          Welcome {firstName} 👋
        </p>

        {/* Subtitle */}
        <p className="text-rose-300 text-sm md:text-base">
          Time to start a new conversation
        </p>

        {/* Centered Image */}
        <img
          className="w-60 h-60 md:w-86 md:h-86 object-contain drop-shadow-lg mt-4"
          src={startChattingImage}
          alt="startChatting"
        />
      </div>
    </div>
  );

};
