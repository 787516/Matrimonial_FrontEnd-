// src/hooks/auth/useRegister.js
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUserApi,

    onSuccess: (response, variables) => {
      const message =
        response?.data?.message ||
        "OTP sent successfully. Please check your email.";

      alert(message);

      // Navigate to OTP verify page with email + purpose
      navigate("/otp-verify", {
        state: {
          email: variables.email.toLowerCase().trim(),
          purpose: "register",
        },
      });
    },

    onError: (error) => {
      console.error("Registration Error:", error);

      const msg =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      alert(msg);
    },
  });
};
