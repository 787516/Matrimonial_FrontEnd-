// src/hooks/auth/useRegister.js
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUserApi,

    onSuccess: (response, variables) => {
      alert(response?.data?.message || "OTP sent!");

      // variables contains the form data → pass email to OTP page
     // navigate("/otp-verify", { state: { email: variables.email } });
     navigate("/otp-verify", { state: { email: values.email, purpose: "register" } });

    },

    onError: (error) => {
      alert(error?.response?.data?.message || "Registration failed!");
    },
  });
};
