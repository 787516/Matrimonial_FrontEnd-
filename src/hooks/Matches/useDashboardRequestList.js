import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useDashboardRequestList = (type, status, enabled) => {
  return useQuery({
    queryKey: ["dashboardRequestList", type, status],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/matches/Dashboard-Stat-List/requests?type=${type}&status=${status}`
      );
      return res.data;
    },
    enabled, // Fetch only when modal opened
    staleTime: 0,
  });
};
