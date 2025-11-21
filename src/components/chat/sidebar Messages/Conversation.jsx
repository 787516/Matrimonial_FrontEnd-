import { useSocketContext } from "../../../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import profilrPicPlaceholder from "../../../assets/profileAvtar.jpg";
import React from "react";

const Conversation = ({ conversation, lastIdx, emoji }) => {
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

  return (
    <>
      <div
	className={`flex gap-3 items-center hover:bg-linear-to-r hover:from-rose-500/20 hover:to-pink-500/20 rounded-2xl p-4 cursor-pointer transition-all duration-300 group
		${isSelected ? "bg-linear-to-r from-rose-600/40 to-pink-600/40 border-l-4 border-rose-400 shadow-lg" : "hover:shadow-xl"}
	`}
	onClick={handleClick}
>
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
         <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-rose-400/50">
  <img
    src={conversation.profilePic || profilrPicPlaceholder}
    alt="user avatar"
    className="w-full h-full object-cover rounded-full"
  />
</div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between items-center">
            <p
              className={`font-bold ${
                isSelected ? "text-white" : "text-gray-200"
              }`}
            >
              {conversation.fullName}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xl">{emoji}</span>

              {unread[conversation._id] > 0 && (
                <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                  {unread[conversation._id]}
                </span>
              )}
            </div>
          </div>

          {isOnline && (
            <span className="text-xs text-rose-400 font-semibold">
              ● Online
            </span>
          )}
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-2 h-1" />}
    </>
  );
};

export default Conversation;
