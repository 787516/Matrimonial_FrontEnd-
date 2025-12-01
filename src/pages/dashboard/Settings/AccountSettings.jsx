// /pages/settings/AccountSettings.jsx
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./AccountSettings.css";

const AccountSettings = () => {
    
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  return (
    <div className="mp-page-container mt-3">
      <SettingsSidebar />

      <div className="settings-content">

        <h3 className="page-title">Account Settings</h3>

        <div className="settings-card">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter new mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <button className="btn-primary">Update</button>
        </div>

        <h4 className="sub-title">Change Password</h4>

        <div className="settings-card">
          <label>Old Password</label>
          <input type="password" placeholder="Enter old password" />

          <label>New Password</label>
          <input type="password" placeholder="Enter new password" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Re-enter new password" />

          <button className="btn-primary">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
