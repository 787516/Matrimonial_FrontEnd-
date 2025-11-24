import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../../api/auth";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: (res) => {
      alert(res?.data?.message || "OTP sent successfully");
    },

    onError: (err) => {
      alert(err?.response?.data?.message || "Failed to send OTP");
    },
  });
};
