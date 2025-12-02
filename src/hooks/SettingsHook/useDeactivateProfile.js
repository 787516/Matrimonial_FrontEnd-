import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useDeactivateProfile = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("/settings/deactivate", payload);
      return res.data;
    },
  });
};
