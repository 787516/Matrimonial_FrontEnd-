import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLogin } from "../../hooks/AuthHook/useLogin";
import { useForgotPassword } from "../../hooks/AuthHook/useForgotPassword";

import logo from "../../assets/Logo.png";
import bgVideo from "../../assets/videos/bgVideo.mp4";

import { useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const forgotMutation = useForgotPassword();

  // ------------------ VALIDATION ------------------
  const loginSchema = Yup.object({
    username: Yup.string()
      .test(
        "email-or-mobile",
        "Enter valid email or 10-digit mobile",
        (value) => {
          if (!value) return false;
          const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const mobile = /^[6-9]\d{9}$/;
          return email.test(value) || mobile.test(value);
        }
      )
      .required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ------------------ FORMIK ------------------
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: (values) => {
      const email = values.username.toLowerCase().trim();

      loginMutation.mutate({
        email,
        password: values.password,
      });
    },
  });

  // -------------------------------------------------------------
  // FORGOT PASSWORD FLOW (SEND OTP)
  // -------------------------------------------------------------
  const handleForgot = () => {
    let email = formik.values.username;

    if (!email) {
      alert("Please enter your email first");
      return;
    }

    // Forgot password MUST accept only email — mobile not allowed
    if (!email.includes("@")) {
      alert("Forgot Password works only with email. Please enter a valid email.");
      return;
    }

    email = email.toLowerCase().trim();

    forgotMutation.mutate(
      { email },
      {
        onSuccess: () => {
          navigate("/otp-verify", { state: { email, purpose: "forgot" } });
        },
      }
    );
  };

  return (
    <div className="auth-page">
      <video autoPlay muted loop playsInline id="bgVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      <div className="auth-wrapper">
        <div className="page login-container active">
          <img src={logo} alt="Logo" className="logo-img" />

          <div className="Login_head">
            <h4>Login To SnehaBandha</h4>
          </div>

          <p className="tagline">
            "Your Story Could Be The Next Beautiful Beginning"
          </p>

          {/* ------------------ LOGIN FORM ------------------ */}
          <form onSubmit={formik.handleSubmit}>
            {/* USERNAME */}
            <div className="form-group">
              <i className="fas fa-mobile-alt"></i>
              <input
                type="text"
                name="username"
                placeholder="Enter Mobile No. or Email"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.username && formik.errors.username && (
                <p className="error-text">{formik.errors.username}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <i className="fas fa-lock"></i>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password && (
                <p className="error-text">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-grad"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* ------------------ EXTRAS ------------------ */}
          <div className="extras">
            <button
              className="link-button"
              onClick={handleForgot}
              disabled={forgotMutation.isPending}
            >
              {forgotMutation.isPending ? "OTP Sending..." : "Forgot Password?"}
            </button>

            <button
              className="link-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
