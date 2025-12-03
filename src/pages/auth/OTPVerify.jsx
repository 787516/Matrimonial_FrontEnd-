import React, { useEffect, useRef, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import { useVerifyOtp } from "../../hooks/AuthHook/useVerifyOtp";
import { useVerifyEmailChange } from "../../hooks/SettingsHook/useAccountSettings.js";
import { useResendOtp } from "../../hooks/AuthHook/useResendOtp";
import { AuthContext } from "../../context/AuthContext.jsx";

import "./OTPVerify.css";
import logo from "../../assets/Logo.png";
import bgVideo from "../../assets/videos/bgVideo.mp4";

const OTPVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;
  const purpose = state?.purpose;

  const normalizedEmail = email?.toLowerCase().trim();

  const verifyOtpMutation = useVerifyOtp();
  const verifyEmailChange = useVerifyEmailChange();
  const resendOtpMutation = useResendOtp();

  const { updateEmailInContext } = useContext(AuthContext);

  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);

  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },

    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Only digits").required("Required"))
        .length(6, "OTP must be 6 digits"),
    }),

    onSubmit: (values) => {
      const finalOtp = values.otp.join("");

      // EMAIL CHANGE FLOW
      if (purpose === "changeEmail") {
        verifyEmailChange.mutate(finalOtp, {
          onSuccess: () => {
            const stored = JSON.parse(localStorage.getItem("user"));

            if (stored?.user) {
              stored.user.email = stored.user.pendingEmail;
              stored.user.pendingEmail = null;
              localStorage.setItem("user", JSON.stringify(stored));
            }

            updateEmailInContext(stored.user.email);
            alert("Email updated successfully!");

            setTimeout(() => {
              navigate("/settings/account");
            }, 50);
          },
        });

        return;
      }

      // NORMAL REGISTER / FORGOT FLOWS
      verifyOtpMutation.mutate(
        { email: normalizedEmail, otp: finalOtp, purpose },
        {
          onSuccess: () => {
            if (purpose === "register") {
              navigate("/set-password", {
                state: { email: normalizedEmail, purpose: "register" },
              });
            }

            if (purpose === "forgot") {
              navigate("/reset-password", {
                state: { email: normalizedEmail, purpose: "forgot" },
              });
            }
          },
        }
      );
    },
  });

  const otp = formik.values.otp;

  // Auto-change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    formik.setFieldValue("otp", newOtp);

    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    resendOtpMutation.mutate({ email: normalizedEmail });
    setTimer(60);
  };

  // Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="otp-page">
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="glass-container">

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="logo-area">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <h2 className="title">Verify OTP</h2>
        <p className="subtitle">
          Enter the 6-digit OTP sent to <b>{normalizedEmail}</b>
        </p>

        <form className="otp-form" onSubmit={formik.handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {/* Correct validation display */}
          {formik.touched.otp && formik.errors.otp && (
            <p className="error-text">OTP must be 6 digits</p>
          )}

          <div className="resend-timer">
            {timer > 0 ? (
              <p>
                Didn’t receive the code?
                <span className="resend-link" style={{ opacity: 0.5 }}>
                  {" "}
                  Resend OTP{" "}
                </span>
                (00:{timer < 10 ? `0${timer}` : timer})
              </p>
            ) : (
              <p>
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  className="resend-link"
                  onClick={handleResendOtp}
                  disabled={resendOtpMutation.isPending}
                >
                  {resendOtpMutation.isPending ? "Sending..." : "Resend OTP"}
                </button>{" "}
                (00:00)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-grad"
            disabled={
              verifyOtpMutation.isPending || verifyEmailChange.isPending
            }
          >
            {verifyOtpMutation.isPending || verifyEmailChange.isPending
              ? "Verifying..."
              : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerify;
