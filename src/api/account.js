import axiosInstance from "./axiosInstance";

// 1️⃣ Request Email Change (send OTP)
export const requestEmailChangeApi = (newEmail) => {
  return axiosInstance.post("/settings/request-email-change", { newEmail });
};

// 2️⃣ Verify Email Change with OTP
export const verifyEmailChangeApi = (otp) => {
  return axiosInstance.post("/settings/verify-email-change", { otp });
};

// 3️⃣ Update Password
export const updatePasswordApi = (data) => {
  return axiosInstance.put("/settings/update-password", data);
};
