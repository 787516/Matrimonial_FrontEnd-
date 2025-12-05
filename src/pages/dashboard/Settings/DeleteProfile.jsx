import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./DeleteProfile.css";
import { useDeleteProfile } from "../../../hooks/SettingsHook/useDeleteProfile";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext.jsx";

const WORD_LIMIT = 500;

const countWords = (str) => {
  return str.trim().split(/\s+/).filter(Boolean).length;
};

const DeleteProfile = () => {

  const navigate = useNavigate();
  const deleteMutation = useDeleteProfile();
  const { logout } = useAuthContext();

  // TOP STEPS
  const [selectedReason, setSelectedReason] = useState("");

  // COMMON FIELDS FOR API
  const [source, setSource] = useState("");
  const [groomName, setGroomName] = useState("");
  const [story, setStory] = useState("");
  const [marriageDate, setMarriageDate] = useState("");


  // OTHER REASON
  const [otherReason, setOtherReason] = useState("");

  // UI Controls
  const [showNotEnoughSection, setShowNotEnoughSection] = useState(false);
  const [finalDeleteReason, setFinalDeleteReason] = useState("");
  const [showOtherFinalReason, setShowOtherFinalReason] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [receiveGift, setReceiveGift] = useState(false);


  const handleTopReasonClick = (value) => {
    setSelectedReason(value);

    // Reset
    setShowNotEnoughSection(false);
    setFinalDeleteReason("");
    setShowOtherFinalReason(false);
  };

  // FINAL API SUBMIT HANDLER
  const handleSubmit = () => {

    let payload = {
      reasonType: "",
      marriageDate,
      groomName,
      source,

      story,
    };

    // CASE 1 — Marriage Fixed
    if (selectedReason === "marriage") {
      payload.reasonType = "Marriage Fixed";
    }

    // CASE 2 — Married
    else if (selectedReason === "married") {
      payload.reasonType = "Married";
    }

    // CASE 3 — Other Reason
    else if (selectedReason === "other") {
      payload.reasonType = otherReason || finalDeleteReason || "Other";
    }

    deleteMutation.mutate(payload, {
      onSuccess: () => {
        alert("Account deleted successfully.");

        // Full cleanup → logout user
        logout();

        // Navigate after logout
        navigate("/login");
      },
      onError: (err) => {
        alert(err.response?.data?.message || "Failed to delete account.");
      },
    });
  };

  return (
    <div className="mp-page-container mt-3">

      <SettingsSidebar />

      <div className="settings-content">
        <h3 className="page-title">Delete Profile</h3>

        <div className="delete-wrapper">
          <div className="dp-main-box">

            <h6 className="mb-3 dp-title">Delete Profile</h6>
            <p>Please choose a reason for profile deletion.</p>
            <p className="text-danger dp-note-strong">
              Note: If you delete your profile, it cannot be restored.
            </p>

            {/* TOP BUTTONS */}
            <div className="reason-buttons mb-3">

              {/* Marriage Fixed */}
              <button
                type="button"
                className={`reason-btn ${selectedReason === "marriage" ? "active" : ""}`}
                onClick={() => handleTopReasonClick("marriage")}
              >
                <input type="radio" checked={selectedReason === "marriage"} readOnly />
                <label>Marriage Fixed</label>
              </button>

              {/* Married */}
              <button
                type="button"
                className={`reason-btn ${selectedReason === "married" ? "active" : ""}`}
                onClick={() => handleTopReasonClick("married")}
              >
                <input type="radio" checked={selectedReason === "married"} readOnly />
                <label>Married</label>
              </button>

              {/* Other */}
              <button
                type="button"
                className={`reason-btn ${selectedReason === "other" ? "active" : ""}`}
                onClick={() => handleTopReasonClick("other")}
              >
                <input type="radio" checked={selectedReason === "other"} readOnly />
                <label>Other Response</label>
              </button>

            </div>

            {/* ============================ */}
            {/* 1️⃣ Marriage Fixed Section */}
            {/* ============================ */}

            {selectedReason === "marriage" && (
              <div className="delete-page">

                <h6 className="heading-gold">Congratulations!</h6>
                <p>We are happy that you found your life partner.</p>

                <label className="fw-bold">Select the source:</label>

                <div className="d-flex gap-4 mt-3 flex-wrap">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriageSource"
                      onChange={() => setSource("Through Snehabandh Matrimony")}
                    />
                    <label className="form-check-label">Through Snehabandh Matrimony</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriageSource"
                      onChange={() => setSource("Through another Matrimony site")}
                    />
                    <label className="form-check-label">Through other Matrimony site</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriageSource"
                      onChange={() => setSource("Other Source")}
                    />
                    <label className="form-check-label">Through other source</label>
                  </div>
                </div>

                {/* Groom Name */}
                <div className="mb-3 mt-3">
                  <label className="form-label">Groom's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter groom's name"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                  />
                </div>

                {/* Marriage Date */}
                <div className="mb-3">
                  <label className="form-label">Marriage Date</label>
                  <input
                    type="date"
                    className="form-control mt-2"
                    style={{ width: "250px" }}
                    value={marriageDate}
                    onChange={(e) => setMarriageDate(e.target.value)}
                  />
                </div>



                {/* Story */}
                <div className="mb-3">
                  <label className="form-label">Your Story</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Share your journey..."
                    value={story}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (countWords(val) <= WORD_LIMIT) {
                        setStory(val);
                      }
                    }}
                  ></textarea>
                  <small className="text-muted d-block text-end">
                    {countWords(story)}/{WORD_LIMIT} words
                  </small>
                </div>

                <div className="form-check mt-3 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="giftCheckbox"
                    checked={receiveGift}
                    onChange={(e) => setReceiveGift(e.target.checked)}
                  />
                  <label className="form-check-label d-flex align-items-center gap-2" htmlFor="giftCheckbox">
                    🎁 I would like to receive a gift from Snehabandh Matrimony
                  </label>
                </div>

                <button
                  type="button"
                  className="btn submit-btn text-white btn-gap"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn submit-btn text-white"
                  onClick={() => setSelectedReason("")}
                >
                  Cancel
                </button>

              </div>
            )}

            {/* ============================ */}
            {/* 2️⃣ Married Section */}
            {/* ============================ */}

            {selectedReason === "married" && (
              <div className="delete-page">

                <h6 className="heading-gold">Congratulations on Your Marriage!</h6>

                <label className="fw-bold">Select the source:</label>

                <div className="d-flex gap-4 mt-3 flex-wrap">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="marriedSource"
                      onChange={() => setSource("Through Snehabandh Matrimony")}
                    />
                    <label className="form-check-label">Through Snehabandh Matrimony</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="marriedSource"
                      onChange={() => setSource("Other Matrimony Site")}
                    />
                    <label className="form-check-label">Through other Matrimony site</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="marriedSource"
                      onChange={() => setSource("Other Source")}
                    />
                    <label className="form-check-label">Other source</label>
                  </div>
                </div>

                {/* Groom Name */}
                <div className="mb-3 mt-3">
                  <label className="form-label">Groom's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter groom's name"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                  />
                </div>

                {/* Marriage Date */}
                <div className="mb-3">
                  <label className="form-label">Marriage Date</label>
                  <input
                    type="date"
                    className="form-control mt-2"
                    style={{ width: "250px" }}
                    value={marriageDate}
                    onChange={(e) => setMarriageDate(e.target.value)}
                  />
                </div>

                {/* Story */}
                <div className="mb-3">
                  <label className="form-label">Your Story</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Share your journey..."
                    value={story}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (countWords(val) <= WORD_LIMIT) {
                        setStory(val);
                      }
                    }}
                  />
                  <small className="text-muted d-block text-end">
                    {countWords(story)}/{WORD_LIMIT} words
                  </small>
                </div>

                <button
                  type="button"
                  className="btn submit-btn text-white btn-gap"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn submit-btn text-white"
                  onClick={() => setSelectedReason("")}
                >
                  Cancel
                </button>

              </div>
            )}

            {/* ============================ */}
            {/* 3️⃣ OTHER RESPONSE */}
            {/* ============================ */}

            {selectedReason === "other" && (
              <div className="delete-page">

                <div className="p-3 border rounded mb-4">
                  <h6>Other Reason</h6>

                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Write your reason..."
                    value={otherReason}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (countWords(val) <= WORD_LIMIT) {
                        setOtherReason(val);
                      }
                    }}
                  ></textarea>
                  <small className="text-muted d-block text-end">
                    {countWords(otherReason)}/{WORD_LIMIT} words
                  </small>
                </div>

                <button
                  type="button"
                  className="btn submit-btn text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
