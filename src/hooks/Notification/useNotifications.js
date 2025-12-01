import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

// FETCH NOTIFICATIONS (limit 10 for dropdown)
export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications/all?page=1&limit=10&unreadOnly=false");
      return res.data;
    },
    staleTime: 1000 * 10, // 10 sec cache
  });
};

// FETCH UNREAD COUNT
export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications/unread/count");
      return res.data.unreadCount;
    },
    refetchInterval: 5000, // Auto-refresh every 5 sec
  });
};

// MARK SINGLE NOTIFICATION READ
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axiosInstance.patch(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unreadCount"]);
    },
  });
};

// MARK ALL READ
export const useMarkAllRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.patch(`/notifications/read/all`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unreadCount"]);
    },
  });
};
