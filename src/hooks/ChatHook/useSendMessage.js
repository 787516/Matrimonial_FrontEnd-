import { useState } from "react";
import useConversation from "../../components/chat/zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useSocketContext } from "../../context/SocketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const store = useConversation;
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const userId = authUser?.user?._id;

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const state = store.getState();
    const { selectedConversation, messages, setMessages } = state;

    if (!selectedConversation) return;

    const receiverId = selectedConversation._id;

    // 1️⃣ Optimistic message
    const tempId = "temp-" + Date.now();
    const optimisticMsg = {
      _id: tempId,
      senderId: userId,
      receiverId,
      message: text,
      createdAt: new Date().toISOString(),
      status: "sending",
    };

    setMessages([...messages, optimisticMsg]);
console.log("📩 Sending message:", optimisticMsg);
    try {
      setLoading(true);

      // 2️⃣ SEND MESSAGE THROUGH SOCKET
      socket.emit(
        "sendMessage",
        {
          senderId: userId,
          receiverId,
          message: text,
        },
        (serverAck) => {
          // 3️⃣ SERVER sends acknowledgement (with DB-saved message)
          if (serverAck?.error) {
            // mark failure
            setMessages((prev) =>
              prev.map((m) =>
                m._id === tempId ? { ...m, status: "failed" } : m
              )
            );
          } else {
            // Replace optimistic with actual message
            setMessages((prev) =>
              prev.map((m) =>
                m._id === tempId ? serverAck.data : m
              )
            );
          }
        }
      );
    } catch (err) {
      console.error("Message failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
