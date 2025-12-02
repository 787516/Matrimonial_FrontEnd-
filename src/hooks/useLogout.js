import { useCallback, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { logoutUser } = useAuthContext();

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      logoutUser();
      //window.location.href = "/login";
      navigate("/login");  // using React Router

    } catch (err) {
      console.error("Logout failed:", err);
      setLoading(false);
    }
  }, [logoutUser]);

  return { loading, logout };
};

export default useLogout;
