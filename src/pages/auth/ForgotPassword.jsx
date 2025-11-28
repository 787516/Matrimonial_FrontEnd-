import React from "react";
import "./ForgotPassword.css";
import bgVideo from "../../assets/videos/bgVideo.mp4";

import logo from "../../assets/Logo.png";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

import { useResetPassword } from "../../hooks/AuthHook/useResetPassword";
import { useSetPassword } from "../../hooks/AuthHook/useSetPassword";

export default function ForgotPassword() {
  const location = useLocation();

  const email = location.state?.email;
 console.log("STATE:", location.state);
 console.log("email",email);
 

  // ⬅ Detect from pathname — MUCH CLEANER
  const isSetPassword = location.pathname === "/set-password";

  // ⬅ Pick correct mutation hook
  const mutation = isSetPassword ? useSetPassword() : useResetPassword();

  const passwordSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Min 8 characters required")
      .matches(/[A-Z]/, "Must include uppercase letter")
      .matches(/[a-z]/, "Must include lowercase letter")
      .matches(/\d/, "Must include a digit")
      .matches(/[@$!%*?&]/, "Must include a special char")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: passwordSchema,

    onSubmit: (values) => {
      mutation.mutate({
        email,
        password: values.newPassword,  // used by reset-password API
      });
    },
  });

  return (
    <div className="newpass-page">
      <video autoPlay muted loop playsInline id="bgVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <div className="forgot">
        <img src={logo} alt="SnehaBandh Logo" className="logo-img" />

        <h2 className="pass-title">
          {isSetPassword ? "Set Password" : "Reset Password"}
        </h2>

        <p className="pass-subtitle">
          Choose a strong password for your account
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="pass-form-group">
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

          <div className="pass-form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <p className="error-text">{formik.errors.confirmPassword}</p>
            )}

          <button className="btn-grad" disabled={mutation.isPending}>
            {mutation.isPending ? "Updating..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
