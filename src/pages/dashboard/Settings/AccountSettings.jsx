// /pages/settings/AccountSettings.jsx
import React, { useState, useEffect } from "react";
import SettingsSidebar from "./SettingsSidebar";
import "./Settings.css";        // your existing sidebar styles
import "./AccountSettings.css"; // new file below
import { useRequestEmailChange, useVerifyEmailChange, useUpdatePassword } 
from "../../../hooks/SettingsHook/useAccountSettings";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";


const AccountSettings = () => {
  // Email display & change
  const [displayEmail, setDisplayEmail] = useState("john.doe@example.com");
  const [existingEmail, setExistingEmail] = useState("john.doe@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEmailPanel, setShowEmailPanel] = useState(false);

  // Password display & change
  const [displayPassword, setDisplayPassword] = useState("Secret123!");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);

  // Eye icons
  const [showDisplayPassword, setShowDisplayPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Success message
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const requestEmailChange = useRequestEmailChange();
const verifyEmailChange = useVerifyEmailChange();
const updatePassword = useUpdatePassword();

const navigate = useNavigate();
// const { authUser } = useContext(AuthContext);
 const { authUser } = React.useContext(AuthContext);

// Use real email from logged user
useEffect(() => {
  if (authUser?.user?.email) {
    setDisplayEmail(authUser.user.email);
    setExistingEmail(authUser.user.email);
  }
}, [authUser]);


  // ---- Password requirement logic ----
  const checkPasswordRequirements = (password) => {
    return {
      lenOk: password.length >= 6 && password.length <= 15,
      upperOk: /[A-Z]/.test(password),
      lowerOk: /[a-z]/.test(password),
      numberOk: /[0-9]/.test(password),
      specialOk: /[!@#$%^&*]/.test(password),
    };
  };

  const validatePasswordFinal = (password) => {
    const r = checkPasswordRequirements(password);
    return r.lenOk && r.upperOk && r.lowerOk && r.numberOk && r.specialOk;
  };

  const passwordChecks = checkPasswordRequirements(newPassword);
  const passwordScore = Object.values(passwordChecks).filter(Boolean).length;
  const strengthPercent = (passwordScore / 5) * 100;
  let strengthColor = "#eee";
  if (passwordScore <= 2) strengthColor = "#f8d7da";
  else if (passwordScore === 3) strengthColor = "#fff3cd";
  else strengthColor = "#d4edda";

  // ---- Success toast auto-hide ----
  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage("");
    }, 3500);
    return () => clearTimeout(t);
  }, [showSuccess]);

  const triggerSuccess = (msg) => {
    setSuccessMessage(msg);
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Email handlers ----
  const openEmailPanel = () => {
    setShowEmailPanel(true);
    setEmailError("");
  };

  const cancelEmailPanel = () => {
    setShowEmailPanel(false);
    setNewEmail("");
    setEmailError("");
  };

// STEP 1 — Request Email Change (send OTP)
const verifyEmail = () => {
  const trimmed = newEmail.trim();

  if (!emailRegex.test(trimmed)) {
    setEmailError("Please enter a valid email address");
    return;
  }

  requestEmailChange.mutate(
    trimmed,
    {
      onSuccess: (res) => {
        // Go to OTP page with purpose: "changeEmail"
        navigate("/otp-verify", {
          state: {
            email: trimmed,
            purpose: "changeEmail",
          },
        });
      },
      onError: (err) => {
        setEmailError(err.response?.data?.message || "Email update failed");
      },
    }
  );
};


  // ---- Password handlers ----
  const openPasswordPanel = () => {
    setShowPasswordPanel(true);
    setNewPasswordError("");
    setConfirmPasswordError("");
  };

  const cancelPasswordPanel = () => {
    setShowPasswordPanel(false);
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
    setConfirmPasswordError("");
  };

const verifyPassword = () => {
  let ok = true;

  if (!validatePasswordFinal(newPassword)) {
    setNewPasswordError("Password must meet all requirements");
    ok = false;
  } else {
    setNewPasswordError("");
  }

  if (!confirmPassword || confirmPassword !== newPassword) {
    setConfirmPasswordError("Passwords don't match");
    ok = false;
  } else {
    setConfirmPasswordError("");
  }

  if (!ok) return;

  updatePassword.mutate(
    {
      currentPassword: displayPassword,
      newPassword,
    },
    {
      onSuccess: () => {
        triggerSuccess("Password updated successfully!");
        setShowPasswordPanel(false);
      },
      onError: (err) => {
        setNewPasswordError(err.response?.data?.message || "Password update failed");
      },
    }
  );
};

  return (
    <div className="mp-page-container mt-3">
      {/* LEFT: sidebar using your React SettingsSidebar */}
      <SettingsSidebar />

      {/* RIGHT: content */}
      <div className="settings-content">
        <h3 className="page-title">Account Settings</h3>

        <div className="account-settings-wrapper">
          {/* Success message */}
          {showSuccess && (
            <div
              className="as-success-message"
              role="status"
              aria-live="polite"
            >
              <i className="fas fa-check-circle" aria-hidden="true"></i>
              <span>{successMessage}</span>
            </div>
          )}

          <div className="row">
            {/* LEFT COLUMN: display info */}
            <div className="col-lg-6 col-md-12">
              <div className="as-main-box" aria-labelledby="accountHeading">
                <h5 id="accountHeading">
                  <i className="fas fa-user-cog" aria-hidden="true"></i>
                  My Account
                </h5>

                {/* EMAIL DISPLAY */}
                <section
                  className="as-info-card"
                  aria-labelledby="emailLabel"
                >
                  <label id="emailLabel">
                    <i className="fas fa-envelope" aria-hidden="true"></i>
                    Email Address
                  </label>
                  <p>Your primary email for communications and login.</p>

                  <div className="as-input-group">
                    <input
                      type="email"
                      className="as-input"
                      value={displayEmail}
                      disabled
                      aria-disabled="true"
                    />
                    <button
                      type="button"
                      className="as-btn-primary"
                      onClick={openEmailPanel}
                    >
                      <i className="fas fa-edit" aria-hidden="true"></i>
                      Edit
                    </button>
                  </div>
                </section>

                {/* PASSWORD DISPLAY */}
                <section
                  className="as-info-card"
                  aria-labelledby="passwordLabel"
                >
                  <label id="passwordLabel">
                    <i className="fas fa-lock" aria-hidden="true"></i>
                    Password
                  </label>
                  <p>For security, we display a masked version.</p>

                  <div className="as-input-group">
                    <div className="as-input-wrapper">
                      <input
                        type={showDisplayPassword ? "text" : "password"}
                        className="as-input"
                        value={displayPassword}
                        disabled
                        aria-disabled="true"
                      />
                      <span
                        className="password-eye"
                        role="button"
                        onClick={() =>
                          setShowDisplayPassword((prev) => !prev)
                        }
                      >
                        <i
                          className={
                            showDisplayPassword
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </span>
                    </div>
                    <button
                      type="button"
                      className="as-btn-primary"
                      onClick={openPasswordPanel}
                    >
                      <i className="fas fa-edit" aria-hidden="true"></i>
                      Edit
                    </button>
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT COLUMN: edit panels */}
            <div className="col-lg-6 col-md-12">
              {/* EMAIL PANEL */}
              {showEmailPanel && (
                <section className="as-edit-panel">
                  <h5>
                    <i
                      className="fas fa-envelope-open-text"
                      aria-hidden="true"
                    ></i>
                    Change Email
                  </h5>

                  <div className="as-field">
                    <label>
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                      Existing Email
                    </label>
                    <input
                      type="email"
                      className="as-input"
                      value={existingEmail}
                      disabled
                    />
                  </div>

                  <div className="as-field">
                    <label>
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                      New Email Address
                    </label>
                    <input
                      type="email"
                      className={`as-input ${
                        emailError ? "as-invalid" : ""
                      }`}
                      placeholder="Enter new email address"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                    />
                    {emailError && (
                      <div className="as-error-message">
                        <i
                          className="fas fa-exclamation-circle"
                          aria-hidden="true"
                        ></i>
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div className="as-button-row">
                    <button
                      type="button"
                      className="as-btn-primary"
                      onClick={verifyEmail}
                    >
                      <i className="fas fa-check" aria-hidden="true"></i>
                      Verify
                    </button>
                    <button
                      type="button"
                      className="as-btn-outline"
                      onClick={cancelEmailPanel}
                    >
                      <i className="fas fa-times" aria-hidden="true"></i>
                      Cancel
                    </button>
                  </div>
                </section>
              )}

              {/* PASSWORD PANEL */}
              {showPasswordPanel && (
                <section className="as-edit-panel">
                  <h5>
                    <i className="fas fa-key" aria-hidden="true"></i>
                    Change Password
                  </h5>

                  <div className="password-requirements">
                    <strong>Password Requirements:</strong>
                    <div className="password-req-list">
                      <div className="req-item">
                        <i
                          className={
                            passwordChecks.lenOk
                              ? "fas fa-check req-ok"
                              : "fas fa-circle req-bad"
                          }
                        ></i>
                        6–8 characters
                      </div>
                      <div className="req-item">
                        <i
                          className={
                            passwordChecks.upperOk
                              ? "fas fa-check req-ok"
                              : "fas fa-circle req-bad"
                          }
                        ></i>
                        At least one uppercase letter
                      </div>
                      <div className="req-item">
                        <i
                          className={
                            passwordChecks.lowerOk
                              ? "fas fa-check req-ok"
                              : "fas fa-circle req-bad"
                          }
                        ></i>
                        At least one lowercase letter
                      </div>
                      <div className="req-item">
                        <i
                          className={
                            passwordChecks.numberOk
                              ? "fas fa-check req-ok"
                              : "fas fa-circle req-bad"
                          }
                        ></i>
                        At least one number
                      </div>
                      <div className="req-item">
                        <i
                          className={
                            passwordChecks.specialOk
                              ? "fas fa-check req-ok"
                              : "fas fa-circle req-bad"
                          }
                        ></i>
                        At least one special character (!@#$%^&amp;*)
                      </div>
                    </div>
                  </div>

                  <div className="as-field">
                    <label>
                      <i className="fas fa-key" aria-hidden="true"></i>
                      New Password
                    </label>
                    <div className="as-input-wrapper">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className={`as-input ${
                          newPasswordError ? "as-invalid" : ""
                        }`}
                        placeholder="Enter new password"
                        maxLength={8}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (newPasswordError) setNewPasswordError("");
                        }}
                      />
                      <span
                        className="password-eye"
                        role="button"
                        onClick={() =>
                          setShowNewPassword((prev) => !prev)
                        }
                      >
                        <i
                          className={
                            showNewPassword
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </span>
                    </div>

                    <div className="password-strength">
                      <div
                        className="password-strength-bar"
                        style={{
                          width: `${strengthPercent}%`,
                          background: strengthColor,
                        }}
                      ></div>
                    </div>

                    {newPasswordError && (
                      <div className="as-error-message">
                        <i
                          className="fas fa-exclamation-circle"
                          aria-hidden="true"
                        ></i>
                        {newPasswordError}
                      </div>
                    )}
                  </div>

                  <div className="as-field">
                    <label>
                      <i className="fas fa-lock" aria-hidden="true"></i>
                      Confirm Password
                    </label>
                    <div className="as-input-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`as-input ${
                          confirmPasswordError ? "as-invalid" : ""
                        }`}
                        placeholder="Confirm new password"
                        maxLength={8}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (confirmPasswordError)
                            setConfirmPasswordError("");
                        }}
                      />
                      <span
                        className="password-eye"
                        role="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                      >
                        <i
                          className={
                            showConfirmPassword
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </span>
                    </div>

                    {confirmPasswordError && (
                      <div className="as-error-message">
                        <i
                          className="fas fa-exclamation-circle"
                          aria-hidden="true"
                        ></i>
                        {confirmPasswordError}
                      </div>
                    )}
                  </div>

                  <div className="as-button-row">
                    <button
                      type="button"
                      className="as-btn-primary"
                      onClick={verifyPassword}
                    >
                      <i className="fas fa-check" aria-hidden="true"></i>
                      Verify
                    </button>
                    <button
                      type="button"
                      className="as-btn-outline"
                      onClick={cancelPasswordPanel}
                    >
                      <i className="fas fa-times" aria-hidden="true"></i>
                      Cancel
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
