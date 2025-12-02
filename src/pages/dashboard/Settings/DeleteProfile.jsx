// /pages/settings/DeleteProfile.jsx
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";
import "./DeleteProfile.css";

const DeleteProfile = () => {
  const [selectedReason, setSelectedReason] = useState(""); // "marriage" | "married" | "other"
  const [showNotEnoughSection, setShowNotEnoughSection] = useState(false);
  const [finalDeleteReason, setFinalDeleteReason] = useState(""); // "manyCalls" | "preferLater" | "notEnoughFinal" | "anyOtherFinal"
  const [showOtherFinalReason, setShowOtherFinalReason] = useState(false);

  const handleTopReasonClick = (value) => {
    setSelectedReason(value);
    // reset nested sections when switching
    setShowNotEnoughSection(false);
    setFinalDeleteReason("");
    setShowOtherFinalReason(false);
  };

  const handleNotEnoughClick = () => {
    setShowNotEnoughSection(true);
  };

  const handleFinalDeleteReasonChange = (e) => {
    const value = e.target.value;
    setFinalDeleteReason(value);
    setShowOtherFinalReason(value === "anyOtherFinal");
  };

  const handleSubmitDummy = () => {
    // You can replace this with real API calls later
    alert("Delete profile action captured (demo only).");
  };

  return (
    <div className="mp-page-container mt-3">
      {/* LEFT SIDEBAR (React Router NavLinks) */}
      <SettingsSidebar />

      {/* RIGHT CONTENT */}
      <div className="settings-content">
        <h3 className="page-title">Delete Profile</h3>

        <div className="delete-wrapper">
          <div className="dp-main-box">
            <h6 className="mb-3 dp-title">Delete Profile</h6>
            <p>Please choose a reason for profile deletion.</p>
            <p className="text-danger dp-note-strong">
              Note: If you delete your profile, it cannot be restored.
            </p>

            {/* TOP SELECT RADIO BUTTONS */}
            <div className="reason-buttons mb-3">
              <button
                type="button"
                className={`reason-btn ${
                  selectedReason === "marriage" ? "active" : ""
                }`}
                onClick={() => handleTopReasonClick("marriage")}
              >
                <input
                  type="radio"
                  name="deleteReasonTop"
                  checked={selectedReason === "marriage"}
                  readOnly
                />
                <label>Marriage Fixed</label>
              </button>

              <button
                type="button"
                className={`reason-btn ${
                  selectedReason === "married" ? "active" : ""
                }`}
                onClick={() => handleTopReasonClick("married")}
              >
                <input
                  type="radio"
                  name="deleteReasonTop"
                  checked={selectedReason === "married"}
                  readOnly
                />
                <label>Married</label>
              </button>

              <button
                type="button"
                className={`reason-btn ${
                  selectedReason === "other" ? "active" : ""
                }`}
                onClick={() => handleTopReasonClick("other")}
              >
                <input
                  type="radio"
                  name="deleteReasonTop"
                  checked={selectedReason === "other"}
                  readOnly
                />
                <label>Other Response</label>
              </button>
            </div>

            {/* PAGE 1: MARRIAGE FIXED */}
            {selectedReason === "marriage" && (
              <div className="delete-page">
                <h6 className="heading-gold">Congratulations!</h6>
                <p>We are happy that you found your life partner.</p>

                <label className="fw-bold">Select the source:</label>

                <div className="d-flex align-items-center gap-4 mt-3 flex-wrap">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriageSource"
                      id="marriageSource1"
                    />
                    <label className="form-check-label" htmlFor="marriageSource1">
                      Through Snehabandh Matrimony
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriageSource"
                      id="marriageSource2"
                    />
                    <label className="form-check-label" htmlFor="marriageSource2">
                      Through other Matrimony site
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriageSource"
                      id="marriageSource3"
                    />
                    <label className="form-check-label" htmlFor="marriageSource3">
                      Through other source
                    </label>
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label" htmlFor="groomName1">
                    Groom&apos;s Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="groomName1"
                    placeholder="Enter groom's name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="marriageDate1">
                    Marriage Date
                  </label>
                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dateOption"
                        id="dateFixed"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="dateFixed">
                        Marriage Date
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dateOption"
                        id="dateNotFixed"
                      />
                      <label className="form-check-label" htmlFor="dateNotFixed">
                        Date not yet fixed?
                      </label>
                    </div>
                  </div>
                  <input
                    type="date"
                    className="form-control mt-2"
                    id="marriageDate1"
                    style={{ width: "250px" }}
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="giftCheck" />
                    <label className="form-check-label" htmlFor="giftCheck">
                      🎁 I would like to receive a gift from Snehabandh Matrimony delivered
                      to me in person at my wedding.
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="story1">
                    Your Story{" "}
                    <a href="#" style={{ fontSize: "13px" }}>
                      Need help to write your story?
                    </a>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    id="story1"
                    placeholder="Share your journey with us..."
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="btn submit-btn text-white btn-gap"
                  onClick={handleSubmitDummy}
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

            {/* PAGE 2: MARRIED */}
            {selectedReason === "married" && (
              <div className="delete-page">
                <h6 className="heading-gold">Congratulations on Your Marriage!</h6>
                <p>
                  We wish you a lifetime of happiness together. Thank you for being part of
                  our community.
                </p>

                <label className="fw-bold">Select the source:</label>

                <div className="d-flex align-items-center gap-4 mt-3 flex-wrap">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriedSource"
                      id="marriedSource1"
                    />
                    <label className="form-check-label" htmlFor="marriedSource1">
                      Through Snehabandh Matrimony
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriedSource"
                      id="marriedSource2"
                    />
                    <label className="form-check-label" htmlFor="marriedSource2">
                      Through other Matrimony site
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marriedSource"
                      id="marriedSource3"
                    />
                    <label className="form-check-label" htmlFor="marriedSource3">
                      Through other source
                    </label>
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label" htmlFor="groomName2">
                    Groom&apos;s Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="groomName2"
                    placeholder="Enter groom's name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="brideName2">
                    Bride&apos;s Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brideName2"
                    placeholder="Enter bride's name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="marriageDate2">
                    Marriage Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="marriageDate2"
                    style={{ width: "250px" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="story2">
                    Your Story{" "}
                    <a href="#" style={{ fontSize: "13px" }}>
                      Need help to write your story?
                    </a>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    id="story2"
                    placeholder="Share your beautiful journey with us..."
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="btn submit-btn text-white btn-gap"
                  onClick={handleSubmitDummy}
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

            {/* PAGE 3: OTHER RESPONSE */}
            {selectedReason === "other" && (
              <div className="delete-page">
                {/* BLOCK 1: MANY CALLS / OTHER REASON */}
                <div className="p-3 border rounded mb-4">
                  <h6>Many calls from tele calling executives</h6>
                  <p>
                    You can add your number to stop receiving calls from tele calling
                    executives.
                  </p>

                  <button
                    type="button"
                    className="btn btn-danger mb-3"
                    onClick={() => alert("DND request captured (demo).")}
                  >
                    Add to DND
                  </button>

                  <p>
                    If you still wish to delete your profile, <a href="#">click here.</a>
                  </p>

                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="otherReasonMain"
                      id="preferLaterMain"
                    />
                    <label className="form-check-label" htmlFor="preferLaterMain">
                      Prefer to search later
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="otherReasonMain"
                      id="notEnough"
                      onChange={handleNotEnoughClick}
                    />
                    <label className="form-check-label" htmlFor="notEnough">
                      Not getting enough matches
                    </label>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="otherReasonMain"
                      id="anyOtherMain"
                      onChange={() => setShowNotEnoughSection(false)}
                    />
                    <label className="form-check-label" htmlFor="anyOtherMain">
                      Any other reason
                    </label>
                  </div>
                </div>

                {/* BLOCK 2: PREFER SEARCH LATER / DEACTIVATE */}
                <div className="p-3 border rounded mb-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="preferDeactivate"
                      defaultChecked
                    />
                    <label className="form-check-label fw-bold" htmlFor="preferDeactivate">
                      Prefer to search later
                    </label>
                  </div>

                  <p className="text-muted">
                    You can hide your profile by deactivating it, during which neither you
                    nor your matches can contact each other.
                  </p>

                  <h6>How long would you keep your profile deactivated?</h6>

                  <div className="mt-2 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="days"
                        id="days1Other"
                      />
                      <label className="form-check-label" htmlFor="days1Other">
                        15 Days
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="days"
                        id="days2Other"
                      />
                      <label className="form-check-label" htmlFor="days2Other">
                        1 Month
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="days"
                        id="days3Other"
                      />
                      <label className="form-check-label" htmlFor="days3Other">
                        2 Months
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="days"
                        id="days4Other"
                      />
                      <label className="form-check-label" htmlFor="days4Other">
                        3 Months
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn submit-btn text-white mb-2"
                    onClick={() => alert("Deactivate profile (demo).")}
                  >
                    Deactivate Profile
                  </button>

                  <p>
                    If you still wish to delete your profile, <a href="#">click here.</a>
                  </p>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="otherReasonSecondary"
                      id="notEnoughSecondary"
                    />
                    <label className="form-check-label" htmlFor="notEnoughSecondary">
                      Not getting enough matches
                    </label>
                  </div>
                </div>

                {/* BLOCK 3: NOT ENOUGH MATCHES SECTION */}
                {showNotEnoughSection && (
                  <div className="p-3 border rounded mb-3">
                    <h6 className="fw-bold mb-3">Not getting enough matches</h6>

                    <p className="text-muted mb-3">
                      You can broaden your partner preference to receive more matches.
                    </p>

                    <p className="mb-3">
                      If you still wish to delete your profile,{" "}
                      <a href="#" className="text-primary">
                        click here.
                      </a>
                    </p>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="finalDeleteReason"
                        id="manyCalls"
                        value="manyCalls"
                        onChange={handleFinalDeleteReasonChange}
                      />
                      <label className="form-check-label" htmlFor="manyCalls">
                        Many calls from tele calling executives
                      </label>
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="finalDeleteReason"
                        id="preferLaterFinal"
                        value="preferLater"
                        onChange={handleFinalDeleteReasonChange}
                      />
                      <label className="form-check-label" htmlFor="preferLaterFinal">
                        Prefer to search later
                      </label>
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="finalDeleteReason"
                        id="notEnoughFinal"
                        value="notEnoughFinal"
                        onChange={handleFinalDeleteReasonChange}
                      />
                      <label className="form-check-label" htmlFor="notEnoughFinal">
                        Not getting enough matches
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="finalDeleteReason"
                        id="anyOtherFinal"
                        value="anyOtherFinal"
                        onChange={handleFinalDeleteReasonChange}
                      />
                      <label className="form-check-label" htmlFor="anyOtherFinal">
                        Any other reason
                      </label>
                    </div>

                    {/* ANY OTHER REASON INPUT */}
                    {showOtherFinalReason && (
                      <div className="mt-2">
                        <label className="form-label" htmlFor="otherReasonText">
                          Enter the reason
                        </label>
                        <textarea
                          id="otherReasonText"
                          className="form-control mb-3"
                          rows={3}
                          placeholder="Please specify your reason..."
                        ></textarea>
                      </div>
                    )}

                    <button
                      type="button"
                      className="btn submit-btn text-white"
                      onClick={handleSubmitDummy}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
