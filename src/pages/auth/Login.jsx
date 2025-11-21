import React from "react";
// import { useLogin } from "../../hooks/AuthHooks/useLogin";
import { useLogin } from "../../hooks/AuthHook/useLogin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import bgVideo from "../../assets/videos/bgVideo.mp4";
import logo from "../../assets/Logo.png";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// then use login.mutate()

// Validation Schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .test(
      "email-or-mobile",
      "Enter a valid email or 10-digit mobile number",
      (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        return emailRegex.test(value) || mobileRegex.test(value);
      }
    )
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password must be 6 characters")
    .required("Password is required"),
});

export default function Login() {

  const navigate = useNavigate();
  const login = useLogin(navigate);

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.85] saturate-110 -z-10"
      >
        <source src={bgVideo} />
      </video>

      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 
      shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-3xl px-10 py-12">

        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="mx-auto w-46 mb-5 drop-shadow-2xl"
        />

        {/* Heading */}
        <h2 className="text-white text-center text-m mb-8">
          "Your Story Could Be The Next Beautiful Beginning"
        </h2>

        {/* Form */}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            login.mutate({
              email: values.username,
              password: values.password,
            });
          }}
        >
          {({ values }) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const mobileRegex = /^[6-9]\d{9}$/;
            const isValid =
              emailRegex.test(values.username) ||
              mobileRegex.test(values.username);

            return (
              <Form className="space-y-6">

                {/* Username */}
                <div className="relative">
                  <label className="text-white/90 text-sm font-semibold mb-1 block">
                    Email
                  </label>
=
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>

                    <Field
                      type="text"
                      name="username"
                      placeholder="Enter your email"
                      className="w-full bg-white/15 backdrop-blur-lg border border-white/30 
                      text-white font-medium px-12 py-3 rounded-xl
                      placeholder-white/60 focus:border-pink-500
                      focus:ring-4 focus:ring-pink-500/10 outline-none transition"
                    />

                    {/* Validation Icon */}
                    {values.username.length > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                        {isValid ? (
                          <i className="fas fa-check-circle text-green-400"></i>
                        ) : (
                          <i className="fas fa-times-circle text-red-400"></i>
                        )}
                      </span>
                    )}
                  </div>

                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-400 text-xs mt-1 pl-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-white/90 text-sm font-semibold mb-1 block">
                    Password
                  </label>

                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>

                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full bg-white/15 backdrop-blur-lg border border-white/30 
                      text-white font-medium px-12 py-3 rounded-xl
                      placeholder-white/60 focus:border-pink-500
                      focus:ring-4 focus:ring-pink-500/10 outline-none transition"
                    />
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-400 text-xs mt-1 pl-1"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={login.isLoading}
                  className="w-full py-3 rounded-xl bg-linear-to-r from-pink-600 to-pink-400 
                  text-white font-bold text-sm shadow-lg shadow-pink-700/30
                  hover:scale-[1.03] active:scale-[0.98] disabled:opacity-60 transition"
                >
                  {login.isLoading ? "Logging in..." : "Login"}
                </button>

              </Form>
            );
          }}
        </Formik>

        {/* Extra Links */}
        <div className="flex justify-between mt-6">
          <a className="text-pink-300 hover:text-white hover:underline text-sm cursor-pointer">
            Forgot Password?
          </a>
          <a className="text-pink-300 hover:text-white hover:underline text-sm cursor-pointer">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
