import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export const useAllOppositeProfiles = () => {
  return useQuery({
    queryKey: ["opposite-gender-profiles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/matches/feed");

      // merge all categories into ONE clean array
      const allProfiles = [
        ...(res.data.perfectMatches || []),
        ...(res.data.religionMatches || []),
        ...(res.data.locationMatches || []),
        ...(res.data.fallbackMatches || []),
      ];

      return allProfiles;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
