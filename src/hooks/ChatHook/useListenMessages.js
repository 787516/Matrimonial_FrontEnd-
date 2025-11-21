import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../components/chat/zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const {
    selectedConversation,
    setMessages,
    addUnread,
    setConversations,
  } = useConversation();

  const myId = authUser?.user?._id;

  useEffect(() => {
    if (!socket) return;

      const handler = (msg) => {
      console.log("📩 New incoming message:", msg);

      const senderId =
        msg?.senderId?._id || msg?.senderId || msg?.sender;
      const receiverId = msg?.receiverId?._id || msg?.receiverId;

      // figure out who is "other" user in 1-1 chat
      const otherUserId =
        senderId?.toString() === myId?.toString()
          ? receiverId
          : senderId;

      const isActiveChat =
        selectedConversation &&
        otherUserId &&
        selectedConversation._id?.toString() ===
          otherUserId?.toString();

      if (isActiveChat) {
        setMessages((prev) => [...prev, msg]);
      } else {
        // increment unread for that user
        if (otherUserId) addUnread(otherUserId);

        // update last message preview in conversation list
        setConversations((prev) =>
          prev.map((c) =>
            c._id?.toString() === otherUserId?.toString()
              ? {
                  ...c,
                  lastMessage: msg.message,
                  lastMessageAt: msg.createdAt,
                }
              : c
          )
        );

        if (
          document.hidden &&
          window.Notification &&
          Notification.permission === "granted"
        ) {
          new Notification("New message", { body: msg.message });
        }
      }
    };

    socket.on("messageReceived", handler);

    return () => socket.off("messageReceived", handler);
  }, [socket, selectedConversation?._id, myId, setMessages, addUnread, setConversations]);
};

export default useListenMessages;
