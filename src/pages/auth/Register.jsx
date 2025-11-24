import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup in SAME file
import { useRegister } from "../../hooks/AuthHook/useRegister";

import "./Register.css";
import logo from "../../assets/Logo.png";
import bgVideo from "../../assets/videos/bgVideo.mp4";

const Register = () => {
  const registerMutation = useRegister();

  // 💡 Yup Schema (same file)
  const registerSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),

    profileFor: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("Required"),

    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),

    maritalStatus: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    city: Yup.string().required("Required"),

    area: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),

    terms: Yup.boolean().oneOf([true], "You must accept terms"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",

      email: "",
      password: "",

      profileFor: "",
      gender: "",
      dateOfBirth: "",

      country: "",
      state: "",
      phone: "",

      maritalStatus: "",
      district: "",
      city: "",

      area: "",
      pincode: "",
      terms: false,
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      const payload = {
        ...values,
        phone: values.phone,
      };

      registerMutation.mutate(payload);
    },
  });

  return (
    <div className="register-page">

      {/* BG VIDEO */}
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="container">
        <header>
          <img src={logo} alt="Snehabandh Matrimony Logo" />
        </header>

        <h2 className="form-title">Create Your Profile</h2>
        <p className="form-subtitle">
          "Your Story Could Be The Next Beautiful Beginning."
        </p>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>

          {/* ROW 1 */}
          <div className="row-3">
            <div className="input-field">
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter first name"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="error-text">{formik.errors.firstName}</p>
              )}
            </div>

            <div className="input-field">
              <label>Middle Name</label>
              <input
                name="middleName"
                type="text"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter middle name"
              />
            </div>

            <div className="input-field">
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter last name"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="error-text">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          {/* ROW 2 */}
          <div className="row-2">
            <div className="input-field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}
            </div>

            <div className="input-field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="6–8 chars + special char"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error-text">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {/* ROW 3 */}
          <div className="row-3">
            <div className="input-field">
              <label>Matrimony Profile For</label>
              <select
                name="profileFor"
                value={formik.values.profileFor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option>Self</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Brother</option>
                <option>Sister</option>
                <option>Relative</option>
                <option>Friend</option>
              </select>
              {formik.touched.profileFor && formik.errors.profileFor && (
                <p className="error-text">{formik.errors.profileFor}</p>
              )}
            </div>

            <div className="input-field">
              <label>Gender</label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="error-text">{formik.errors.gender}</p>
              )}
            </div>

            <div className="input-field">
              <label>Date of Birth</label>
              <input
                name="dateOfBirth"
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="error-text">{formik.errors.dateOfBirth}</p>
              )}
            </div>
          </div>

          {/* ROW 4 */}
          <div className="row-3">
            <div className="input-field">
              <label>Country</label>
              <select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Australia</option>
              </select>
              {formik.touched.country && formik.errors.country && (
                <p className="error-text">{formik.errors.country}</p>
              )}
            </div>

            <div className="input-field">
              <label>State</label>
              <select
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Gujarat</option>
                <option>Delhi</option>
              </select>
              {formik.touched.state && formik.errors.state && (
                <p className="error-text">{formik.errors.state}</p>
              )}
            </div>

            <div className="input-field">
              <label>Mobile Number</label>
              <input
                name="phone"
                type="text"
                placeholder="9876543210"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="error-text">{formik.errors.phone}</p>
              )}
            </div>
          </div>

          {/* ROW 5 */}
          <div className="row-3">
            <div className="input-field">
              <label>Marital Status</label>
              <select
                name="maritalStatus"
                value={formik.values.maritalStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option>UnMarried</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
              {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                <p className="error-text">{formik.errors.maritalStatus}</p>
              )}
            </div>

            <div className="input-field">
              <label>District</label>
              <select
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option>Kolhapur</option>
                <option>Jalgaon</option>
                <option>Nashik</option>
              </select>
              {formik.touched.district && formik.errors.district && (
                <p className="error-text">{formik.errors.district}</p>
              )}
            </div>

            <div className="input-field">
              <label>City</label>
              <select
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Kolhapur</option>
              </select>
              {formik.touched.city && formik.errors.city && (
                <p className="error-text">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* ROW 6 */}
          <div className="row-2">
            <div className="input-field">
              <label>Area</label>
              <input
                name="area"
                type="text"
                placeholder="Enter area"
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.area && formik.errors.area && (
                <p className="error-text">{formik.errors.area}</p>
              )}
            </div>

            <div className="input-field">
              <label>Pincode</label>
              <input
                name="pincode"
                type="text"
                placeholder="Enter pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="error-text">{formik.errors.pincode}</p>
              )}
            </div>
          </div>

          {/* TERMS */}
          <div className="terms">
            <input
              name="terms"
              type="checkbox"
              checked={formik.values.terms}
              onChange={formik.handleChange}
            />
            <span>
              I agree to the{" "}
              <a href="#">Terms & Conditions</a> &{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <p className="error-text">{formik.errors.terms}</p>
          )}

          {/* SUBMIT BUTTON */}
          <div className="center-btn">
            <button type="submit" className="btn-grad" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Registering..." : "Register Now"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
