import React from "react";
import "./ForgotPassword.css";
import bgVideo from "../../assets/videos/bgVideo.mp4";
import logo from "../../assets/Logo.png";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hooks/AuthHook/useResetPassword";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // <-- EMAIL FROM OTP PAGE

  const resetPasswordMutation = useResetPassword();

  // Yup validation inside same file
  const passwordSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Min 8 characters required")
      .matches(/[A-Z]/, "Must include an uppercase letter")
      .matches(/[a-z]/, "Must include a lowercase letter")
      .matches(/\d/, "Must include a digit")
      .matches(/[@$!%*?&]/, "Must include a special character")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: passwordSchema,

    onSubmit: (values) => {
      resetPasswordMutation.mutate(
        {
          email,
        //  otp: "", // backend NO LONGER needs OTP here (already verified)
          newPassword: values.newPassword,
        },

        {
          onSuccess: () => {
            navigate("/login");
          },
        }
      );
    },
  });

  return (
    <div className="newpass-page">

      {/* BG VIDEO */}
      <video autoPlay muted loop playsInline id="bgVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <div className="container">
        <img src={logo} alt="SnehaBandha Logo" className="logo-img" />

        <h2 className="pass-title">Set New Password</h2>
        <p className="pass-subtitle">
          Choose a strong password (min 8 chars, uppercase, lowercase, digit, special char)
        </p>

        <form onSubmit={formik.handleSubmit}>

          {/* NEW PASSWORD */}
          <div className="pass-form-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="error-text">{formik.errors.newPassword}</p>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="pass-form-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error-text">{formik.errors.confirmPassword}</p>
          )}

          <button
            className="btn-grad"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
