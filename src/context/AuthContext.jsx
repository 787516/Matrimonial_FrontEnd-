import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

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
  // LOGIN HANDLER (stores full backend response)
  // ------------------------------------------------------------
 const loginUser = useCallback((apiResponse) => {
  console.log("AuthContext received:", apiResponse);

  // Must contain token + userId
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
  // LOGOUT
  // ------------------------------------------------------------
  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setAuthUser(null);
    setIsLoggedIn(false);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoggedIn,
        loginUser,
        logoutUser,
        userId: authUser?.user?._id || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
