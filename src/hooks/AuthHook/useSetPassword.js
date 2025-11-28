import { useMutation } from "@tanstack/react-query";
import { setPasswordApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const useSetPassword = () => {
  
  const navigate = useNavigate();

  return useMutation({
    mutationFn: setPasswordApi,

    onSuccess: (res) => {
      alert(res?.message || "Password set successfully!");
      navigate("/login");
    },

    onError: (err) => {
      alert(err?.response?.data?.message || "Failed to set password!");
      console.log("Set Password Error:", err);
    },
  });
};
