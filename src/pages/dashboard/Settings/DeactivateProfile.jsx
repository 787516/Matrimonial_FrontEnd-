// /pages/settings/DeactivateProfile.jsx
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./DeactivateProfil.css";

const DeactivateProfile = () => {
  const [reason, setReason] = useState("");

  return (
    <div className="mp-page-container mt-3">
      <SettingsSidebar />

      <div className="settings-content">
        <h3 className="page-title">Deactivate Profile</h3>

        <div className="settings-card">
          <p className="info-text">
            Your profile will be hidden from search results.  
            You can reactivate anytime by logging in.
          </p>

          <label>Reason for deactivation</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="">Select</option>
            <option>Found a match</option>
            <option>Not getting relevant matches</option>
            <option>Need a break</option>
            <option>Other</option>
          </select>

          <button className="btn-warning">Deactivate Now</button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateProfile;
