import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtpApi,

    onSuccess: (res, variables) => {
      const email = variables.email;
      const purpose = variables.purpose; // register OR forgot

      alert(res?.message || "OTP verified!");

     if (purpose === "register") {
  navigate("/set-password", { 
    state: { email, purpose: "set-password" } 
  });
  return;
}

if (purpose === "forgot") {
  navigate("/reset-password", { 
    state: { email, purpose: "reset-password" } 
  });
  return;
}

    },

    onError: (err) => {
      alert(err?.response?.data?.message || "Invalid or expired OTP");
      console.log("OTP Error:", err);
    },
  });
};
