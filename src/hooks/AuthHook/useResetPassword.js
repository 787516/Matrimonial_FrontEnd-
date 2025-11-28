import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (res) => {
      alert(res?.message || "Password reset successful!");
      navigate("/login");
    },

    onError: (err) => {
      alert(err?.response?.data?.message || "Failed to reset password!");
      console.log("Reset Password Error:", err);
    },
  });
};
