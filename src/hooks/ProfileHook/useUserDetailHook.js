import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../../api/profile";

export const useUserProfile = (userProfileId) => {
  const queryClient = useQueryClient();

  // GET profile details
  const profileQuery = useQuery({
    queryKey: ["user-profile", userProfileId],
    enabled: !!userProfileId,  // avoids undefined errors
    queryFn: async () => {
      const res = await getProfile(userProfileId);
      return res.data.profile;   // <-- your backend returns { profile }
    },
  });

  // UPDATE profile
  const updateProfileMutation = useMutation({
    mutationFn: (payload) => updateProfile(payload), // PUT /profile/update
    onSuccess: () => {
      if (userProfileId) {
        queryClient.invalidateQueries(["user-profile", userProfileId]);
        alert("profile updated successfully")
      }
    },
    
    
  });

  return {
    ...profileQuery,
    updateProfileMutation,
  };
};
