import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPhotoApi, getGalleryApi, deletePhotoApi } from "../../api/profile";

export const useGetGallery = (userProfileId) =>
  useQuery({
    queryKey: ["gallery", userProfileId],
    queryFn: () => getGalleryApi(userProfileId).then((res) => res.data.photos),
  });

export const useUploadPhotos = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadPhotoApi,
    onSuccess: () => {
      qc.invalidateQueries(["gallery"]);
      alert("Photos uploaded successfully!");
    },
  });
};

export const useDeletePhoto = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePhotoApi,
    onSuccess: () => {
      qc.invalidateQueries(["gallery"]);
      alert("Photo deleted successfully!");
    },
  });
};



export const useUploadProfilePhoto = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (file) => {
      const form = new FormData();
      form.append("images", file);       // multer field
      form.append("isProfilePhoto", true); // ensure only 1

      return uploadPhotoApi(form);
    },

    onSuccess: () => {
      qc.invalidateQueries(["gallery"]);
      qc.invalidateQueries(["user-profile"]);
      alert("Profile photo updated successfully!");
    },
  });
};
