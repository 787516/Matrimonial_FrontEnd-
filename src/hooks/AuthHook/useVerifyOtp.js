// src/hooks/auth/useVerifyOtp.js
import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtpApi,

    onSuccess: (res) => {
      alert(res?.data?.message || "Account verified successfully!");
      navigate("/login");
    },

    onError: (err) => {
      alert(err?.response?.data?.message || "Invalid OTP");
    },
  });
};
