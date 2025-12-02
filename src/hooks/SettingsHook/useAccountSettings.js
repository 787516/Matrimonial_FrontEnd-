import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  requestEmailChangeApi,
  verifyEmailChangeApi,
  updatePasswordApi,
} from "../../api/account.js";

export const useRequestEmailChange = () => {
  return useMutation({
    mutationFn: (newEmail) => requestEmailChangeApi(newEmail),
  });
};

export const useVerifyEmailChange = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (otp) => verifyEmailChangeApi(otp),
    onSuccess: () => {
      qc.invalidateQueries(["userProfile"]); // refresh UI if needed
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data) => updatePasswordApi(data),
  });
};
