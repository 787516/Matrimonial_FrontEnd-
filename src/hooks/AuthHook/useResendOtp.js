import { useMutation } from "@tanstack/react-query";
import { resendOtpApi } from "../../api/auth";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpApi,

    onSuccess: (res) => {
      alert(res?.message || "OTP sent again!");
    },

    onError: (err) => {
      alert(err?.response?.data?.message || "Failed to resend OTP");
      console.log("Resend OTP Error:", err);
    },
  });
};
