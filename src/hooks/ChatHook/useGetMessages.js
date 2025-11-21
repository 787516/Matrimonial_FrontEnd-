import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useConversation from "../../components/chat/zustand/useConversation";

const useGetMessages = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);

        // Backend expects receiverId, not roomId
        const receiverId = selectedConversation._id;
        console.log("📩 Fetching messages for receiver:", receiverId);

        const res = await axiosInstance.get(`/chat/messages/${receiverId}`);
        const list = res?.data?.data || [];

        setMessages(list);
        console.log("📩 Messages fetched:", list);
      } catch (error) {
        console.error(
          "❌ Error fetching messages:",
          error?.response?.data || error.message
        );
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
