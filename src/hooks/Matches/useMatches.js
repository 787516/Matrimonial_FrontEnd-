// src/hooks/MatchesHook/useMatches.js
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

// 👉 1) Fetch match feed
const fetchMatchFeed = async () => {
  const res = await axiosInstance.get("/matches/feed");
  return res.data; // { message, perfectMatches, religionMatches, locationMatches, fallbackMatches }
};

export const useMatchesFeed = () => {
  return useQuery({
    queryKey: ["matches-feed"],
    queryFn: fetchMatchFeed,
    staleTime: 1000 * 60, // 1 min
  });
};

// 👉 2) Send Interest
const sendInterestApi = async (receiverId) => {
  const res = await axiosInstance.post("/matches/interest", { receiverId });
  return res.data;
};

export const useSendInterest = () => {
  return useMutation({
    mutationKey: ["send-interest"],
    mutationFn: sendInterestApi,
  });
};

// 👉 3) View Profile (logs activity on backend)
const viewProfileApi = async (userId) => {
  const res = await axiosInstance.get(`/matches/view/${userId}`);
  return res.data;
};

export const useViewProfile = () => {
  return useMutation({
    mutationKey: ["view-profile"],
    mutationFn: viewProfileApi,
  });
};
