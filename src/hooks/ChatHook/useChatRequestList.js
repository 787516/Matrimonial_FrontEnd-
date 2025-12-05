import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useChatRequestList = () => {
  return useQuery({
    queryKey: ["chatRequestList"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/matches/Dashboard-Stat-List/requests?type=received&status=Pending&onlyChat=true"
      );
      return res.data.users; // return only user list
    },
    refetchInterval: 4000, // auto-refresh every 4 seconds
  });
};
