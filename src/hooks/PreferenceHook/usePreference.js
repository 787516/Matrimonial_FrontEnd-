import { useQuery } from "@tanstack/react-query";
import { getProfilePreferences } from "../../api/preferenceApi";

export const useGetPreferences = () => {
  return useQuery({
    queryKey: ["preferences"],
    queryFn: getProfilePreferences,
  });
};



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProfilePreferences } from "../../api/preferenceApi";

export const useSavePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProfilePreferences,
    onSuccess: () => {
      alert("Preferences saved successfully!");
      console.log("Preferences saved successfully!", saveProfilePreferences);
      queryClient.invalidateQueries(["preferences"]);
      
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Failed to save preferences");
    },
  });
};
