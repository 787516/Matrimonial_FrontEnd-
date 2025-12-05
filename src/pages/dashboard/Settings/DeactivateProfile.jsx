import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./DeactivateProfile.css";
import { useDeactivateProfile } from "../../../hooks/SettingsHook/useDeactivateProfile";
import { AuthContext } from "../../../context/AuthContext.jsx";

const DeactivateProfile = () => {
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("days");


  const deactivateMutation = useDeactivateProfile();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!duration || !unit) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      duration: Number(duration),
      unit,
      reason: "",
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
              This profile will be activated after the selected time period
              deactivated for {duration ? `${duration} ${unit}` : "15 days"} and will be automatically activated again.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Duration Dropdown */}
              <div className="deactivate-row">
                <select
                  className="deactivate-select"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      setDuration("");
                      setUnit("days");
                      return;
                    }
                    const [d, u] = val.split("-");
                    setDuration(d);
                    setUnit(u);
                  }}
                  required
                >
                  <option value="">--Select Days--</option>
                  <option value="15-days">15 Days</option>
                  <option value="1-months">1 Month</option>
                  <option value="2-months">2 Months</option>
                  <option value="3-months">3 Months</option>
                </select>
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
                    : "De-Activate"}
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
    </div >
  );
};

export default DeactivateProfile;
