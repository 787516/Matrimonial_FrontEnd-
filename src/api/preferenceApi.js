import axiosInstance from "./axiosInstance";

export const getProfilePreferences = () => {
  return axiosInstance.get("/profile/preferences").then(res => res.data.preference);

};

export const saveProfilePreferences = (data) => {
  return axiosInstance.post("/profile/preferences", data);
};
