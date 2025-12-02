import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: (payload) =>
      axiosInstance.delete("/settings/delete", {
        data: payload, // 🔥 VERY IMPORTANT!
      }),
  });
};
