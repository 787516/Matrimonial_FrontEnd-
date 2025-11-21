import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../../api/auth";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUserApi,

    onSuccess: (response) => {
      console.log("LOGIN RESPONSE:", response);

      // FIXED: backend returns { success, message, data }
      const payload = response?.data; 
      console.log("LOGIN PAYLOAD:", payload);

      if (!payload?.auth?.accessToken) {
        alert("Invalid login response from server");
        return;
      }

      loginUser(payload);

      alert("Login successful!");
      navigate("/dashboard");
    },

    onError: (error) => {
      alert(error?.response?.data?.message || "Login failed!");
    },
  });
};
