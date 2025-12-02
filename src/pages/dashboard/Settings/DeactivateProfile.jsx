// /pages/settings/DeactivateProfile.jsx
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";           // your global settings + sidebar styles
import "./DeactivateProfile.css";  // new file below

const DeactivateProfile = () => {
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!duration) return;
    // Here you can call API later
    console.log("Deactivating profile for:", duration, "days");
    alert(`Profile will be deactivated for ${duration} days.`); // temp feedback
  };

  return (
    <div className="mp-page-container mt-3">
      {/* LEFT: React Router sidebar */}
      <SettingsSidebar />

      {/* RIGHT: Deactivate content */}
      <div className="settings-content">
        <h3 className="page-title">Deactivate Profile</h3>

        <div className="deactivate-card">
          <div className="deactivate-box">
           

            <p>
              You can temporarily deactivate your profile if you do not want to delete it.
              On deactivation your profile will be hidden from our members and you will not
              be able to contact any member until you activate it again.
            </p>

            <p>
              Your profile status is currently <strong>Active</strong>. If you would like
              to change your status, please select <strong>Deactivate now</strong>.
            </p>

            <p>
              <strong>
                Select the number of days/months you would like to keep your profile
                deactivated.
              </strong>
            </p>

            <p className="small">
              This profile will be activated after the selected time period elapses. For
              example, if you select 15 days, your profile will be deactivated for 15 days
              and will be automatically activated on the day after the selected option.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Dropdown */}
              <select
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="deactivate-select"
              >
                <option value="" disabled>
                  -- Select Days --
                </option>
                <option value="15">15 Days</option>
                <option value="30">1 Month</option>
                <option value="60">2 Months</option>
                <option value="90">3 Months</option>
              </select>

              {/* Button */}
              <div className="deactivate-btn-wrapper">
                <button type="submit" className="btn-deactivate">
                  De-Activate
                </button>
              </div>
            </form>

            <div className="note">
              <strong>Note:</strong> Once you deactivate your profile you will not be able
              to contact any member either through Express Interest, Personalized Messages
              or chat, and your profile details will also not be visible to members.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateProfile;
