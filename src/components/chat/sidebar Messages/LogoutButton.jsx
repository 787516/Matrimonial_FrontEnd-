import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="cursor-pointer"
          onClick={logout}
          size={22}
          style={{ color: "#6b7280" }}
        />
      ) : (
        <div className="spinner-border spinner-border-sm" role="status" />
      )}
    </div>
  );
};

export default LogoutButton;
