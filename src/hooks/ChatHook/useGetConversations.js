import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useConversation from "../../components/chat/zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const useGetConversations = () => {
  const { setConversations } = useConversation();
  const { userId, authUser } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (!authUser?.auth?.accessToken || !userId) {
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get("/chat/list");
        const list = res.data?.data || [];

        // map to UI-friendly structure
        const mapped = list.map((item) => {
          const other = item.participants.find(
            (p) => p._id !== userId
          );

          return {
            _id: other?._id,
            fullName: `${other.firstName} ${other.lastName}`,
            profilePic: other.profilePic,
            roomId: item.roomId,
            lastMessage: item.lastMessage,
            lastMessageAt: item.lastMessageAt,
          };
        });

        setConversations(mapped);

      } catch (err) {
        console.error("❌ Fetch conversations failed:", err);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [authUser, userId]);

  return { loading };
};

export default useGetConversations;
