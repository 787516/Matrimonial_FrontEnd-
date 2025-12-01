// /pages/settings/SettingsSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Settings.css";
import { FiUser, FiShield, FiAlertTriangle, FiTrash2 } from "react-icons/fi";

const SettingsSidebar = () => {
  return (
    <div className="settings-sidebar">
      <h4 className="sb-title">Settings</h4>

      <ul className="sb-menu">
        <li>
          <NavLink
            to="/settings/account"
            className={({ isActive }) =>
              isActive ? "sb-link active" : "sb-link"
            }
          >
            <FiUser className="sb-icon" /> Account Settings
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings/deactivate"
            className={({ isActive }) =>
              isActive ? "sb-link active" : "sb-link"
            }
          >
            <FiShield className="sb-icon" /> Deactivate Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings/delete"
            className={({ isActive }) =>
              isActive ? "sb-link active" : "sb-link"
            }
          >
            <FiTrash2 className="sb-icon" /> Delete Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
