import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./DeactivateProfile.css";
import { useDeactivateProfile } from "../../../hooks/SettingsHook/useDeactivateProfile";
import { AuthContext } from "../../../context/AuthContext.jsx";

const DeactivateProfile = () => {
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("days");
  const [reason, setReason] = useState("");

  const deactivateMutation = useDeactivateProfile();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!duration || !unit || !reason.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      duration: Number(duration),
      unit,
      reason,
    };

    deactivateMutation.mutate(payload, {
      onSuccess: (res) => {
        alert(res.message);
      },
      onError: (err) => {
        alert(err.response?.data?.message || "Failed to deactivate");
      },
    });
  };

  return (
    <div className="mp-page-container mt-3">
      <SettingsSidebar />

      <div className="settings-content">
        <h3 className="page-title">Deactivate Profile</h3>

        <div className="deactivate-card">
          <div className="deactivate-box">
            <p>
              Temporarily deactivate your profile if you wish to take a break.
              Your profile will be hidden from members and you will not be able
              to interact with anyone until it is automatically activated again.
            </p>

            <p>
              Your current profile status is <strong>Active</strong>.
            </p>

            <p>
              <strong>Select deactivate duration:</strong>
            </p>

            <form onSubmit={handleSubmit}>
              {/* Duration Input */}
              <div className="deactivate-row">
                <label>Duration</label>
                <input
                  type="number"
                  min="1"
                  className="deactivate-input"
                  placeholder="Enter number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>

              {/* Unit Dropdown */}
              <div className="deactivate-row">
                <label>Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="deactivate-select"
                  required
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                </select>
              </div>

              {/* Reason */}
              <div className="deactivate-row">
                <label>Reason (optional)</label>
                <textarea
                  className="deactivate-textarea"
                  rows={3}
                  placeholder="Reason for deactivation..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="deactivate-btn-wrapper">
                <button
                  type="submit"
                  className="btn-deactivate"
                  disabled={deactivateMutation.isPending}
                >
                  {deactivateMutation.isPending
                    ? "Deactivating..."
                    : "Deactivate Profile"}
                </button>
              </div>
            </form>

            <div className="note">
              <strong>Note:</strong> Once deactivated, you cannot send messages,
              view profiles, or receive activity. Your profile becomes hidden
              until it is automatically activated after the selected period.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateProfile;
