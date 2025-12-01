// src/hooks/AuthHook/useLogout.js
import { useMutation } from "@tanstack/react-query";
import { logoutUserApi } from "../../api/auth";

export const useLogout = () => {

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: (refreshToken) => logoutUserApi(refreshToken),
  });
};
