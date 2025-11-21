import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext.jsx";

const SocketContext = createContext(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const token = authUser?.auth?.accessToken || null;
  const userId = authUser?.user?._id || null;

  useEffect(() => {
    if (!token || !userId) {
      if (socket) {
        socket.removeAllListeners();
        socket.close();
        setSocket(null);
      }
      setOnlineUsers([]);
      return;
    }

    const backendURL =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:1818";

    const s = io(backendURL, {
      transports: ["websocket", "polling"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    s.on("connect", () => {
      console.log("✅ Socket connected:", s.id);
      s.emit("userOnline", { userId });
    });

    s.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    s.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
    });

    s.on("getOnlineUsers", (users) => {
      // expect users = [userId1, userId2, ...]
      setOnlineUsers(users || []);
    });

    setSocket(s);

    return () => {
      s.removeAllListeners();
      s.close();
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
