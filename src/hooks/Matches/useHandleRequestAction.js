import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useHandleRequestAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, action }) =>
      axiosInstance.patch(`/matches/requests/${requestId}`, { action }),

    onSuccess: () => {
      // Refresh stats + request list
      queryClient.invalidateQueries(["dashboard-stats"]);
      queryClient.invalidateQueries(["dashboard-request-list"]);
    }
  });
};
