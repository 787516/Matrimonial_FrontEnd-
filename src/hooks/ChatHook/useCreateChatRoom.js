import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const createChatRoomApi = async (receiverId) => {
  const res = await axiosInstance.post("/chat/room", { receiverId });
  return res.data;
};

export const useCreateChatRoom = () => {
  return useMutation({
    mutationKey: ["create-chat-room"],
    mutationFn: createChatRoomApi,
  });
};
