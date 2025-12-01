import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import useConversation from "../../components/chat/zustand/useConversation";

export default function useDeleteMessage() {
  const { messages, setMessages } = useConversation();

  return useMutation({
    mutationFn: async (id) => {
      return axiosInstance.delete(`/chat/message/${id}`);
    },
    onSuccess: (_, id) => {
      setMessages(messages.filter((msg) => msg._id !== id));
    },
  });
}
