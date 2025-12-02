import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useLogout } from "../hooks/AuthHook/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // AUTO RESTORE USER FROM LOCALSTORAGE
  // ------------------------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");

      if (!raw) {
        setAuthUser(null);
        setIsLoggedIn(false);
        return;
      }

      const parsed = JSON.parse(raw);

      if (!parsed?.auth?.accessToken) {
        localStorage.removeItem("user");
        setAuthUser(null);
        setIsLoggedIn(false);
        return;
      }

      const decoded = jwtDecode(parsed.auth.accessToken);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("user");
        setAuthUser(null);
        setIsLoggedIn(false);
        return;
      }

      setAuthUser(parsed);
      setIsLoggedIn(true);

    } catch (err) {
      localStorage.removeItem("user");
      setAuthUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  // ------------------------------------------------------------
  // LOGIN HANDLER
  // ------------------------------------------------------------
  const loginUser = useCallback((apiResponse) => {
    console.log("AuthContext received:", apiResponse);

    if (!apiResponse?.auth?.accessToken || !apiResponse?.user?._id) {
      console.error("Invalid login payload:", apiResponse);
      return;
    }

    const finalData = {
      auth: apiResponse.auth,
      user: apiResponse.user,
      profile: apiResponse.profile || null,
      preferences: apiResponse.preferences || null,
      gallery: apiResponse.gallery || [],
      subscription: apiResponse.subscription || null,
    };

    localStorage.setItem("user", JSON.stringify(finalData));

    setAuthUser(finalData);
    setIsLoggedIn(true);

    return finalData;
  }, []);

  // ------------------------------------------------------------
  // FIXED: UPDATE EMAIL IN CONTEXT (Moved inside component)
  // ------------------------------------------------------------
  const updateEmailInContext = (newEmail) => {
    setAuthUser((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        user: {
          ...prev.user,
          email: newEmail,
        },
      };

      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // ------------------------------------------------------------
  // LOGOUT
  // ------------------------------------------------------------
  const logout = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      const refreshToken = stored?.auth?.refreshToken;

      if (refreshToken) {
        await logoutMutation.mutateAsync(refreshToken);
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authUser");

      setAuthUser(null);
      setIsLoggedIn(false);

      queryClient.removeQueries();

      navigate("/login");

    } catch (error) {
      console.log("Logout error:", error);

      localStorage.removeItem("user");
      setAuthUser(null);
      setIsLoggedIn(false);

      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoggedIn,
        loginUser,
        logout,
        userId: authUser?.user?._id || null,
        updateEmailInContext, // <-- NOW INCLUDED PROPERLY
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
