import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/matches/dashboard-stats");
      return data;
    },
    staleTime: 1000 * 30 // 30 sec
  });
};
