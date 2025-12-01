// /pages/settings/DeleteProfile.jsx
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./DeleteProfile.css"; 

const DeleteProfile = () => {
  const [confirm, setConfirm] = useState("");

  return (
    <div className="mp-page-container mt-3">
      <SettingsSidebar />

      <div className="settings-content">
        <h3 className="page-title text-danger">Delete Profile</h3>

        <div className="settings-card danger-box">
          <p className="danger-text">
            ⚠ This action is permanent.  
            All your data, matches, requests & photos will be deleted.
          </p>

          <label>Type DELETE to confirm</label>
          <input
            type="text"
            placeholder="Type DELETE here"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            className="btn-danger"
            disabled={confirm !== "DELETE"}
          >
            Delete My Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
