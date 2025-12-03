import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegister } from "../../hooks/AuthHook/useRegister";
import "./Register.css";

import logo from "../../assets/Logo.png";
import bgVideo from "../../assets/videos/bgVideo.mp4";

const Register = () => {
  const registerMutation = useRegister();

  /* ---------------------------------------
      STATE FOR AUTOCOMPLETE
  ----------------------------------------- */
  const [citySearch, setCitySearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /* ---------------------------------------
      AGE 18+ VALIDATION
  ----------------------------------------- */
  const is18Plus = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18;
  };

  /* ---------------------------------------
      VALIDATION SCHEMA
  ----------------------------------------- */
  const registerSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .min(2, "Too short"),

    middleName: Yup.string()
      .optional()
      .matches(/^[A-Za-z]*$/, "Only letters allowed"),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .min(2, "Too short"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    profileFor: Yup.string().required("Please select profile for"),
    maritalStatus: Yup.string().required("Please select marital status"),
    gender: Yup.string().required("Please select gender"),

    dateOfBirth: Yup.string()
      .required("Date of birth is required")
      .test("is-18-plus", "You must be at least 18 years old", (value) =>
        is18Plus(value)
      ),

    // These get filled automatically via autocomplete:
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    city: Yup.string().required("City is required"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),

    area: Yup.string().required("Area is required").min(2, "Too short"),

    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),

    terms: Yup.boolean().oneOf([true], "You must accept terms"),
  });

  /* ---------------------------------------
      FORMIK SETUP
  ----------------------------------------- */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      profileFor: "",
      maritalStatus: "",
      gender: "",
      dateOfBirth: "",
      country: "",
      state: "",
      district: "",
      city: "",
      phone: "",
      area: "",
      pincode: "",
      terms: false,
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      const sanitizedValues = {
        ...values,
        profileFor: values.profileFor.toLowerCase().trim(),
        gender: values.gender.toLowerCase().trim(),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        middleName: values.middleName.trim(),
        email: values.email.toLowerCase().trim(),
      };

      registerMutation.mutate(sanitizedValues);
    },
  });

  /* ---------------------------------------
      AUTOCOMPLETE SEARCH
  ----------------------------------------- */
  const handleCitySearch = async (query) => {
    setCitySearch(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${query}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.log("City search error:", error);
    }
  };

  /* ---------------------------------------
      ON SELECT AUTOFILL FORM
  ----------------------------------------- */
  const handleSelectSuggestion = (item) => {
    const address = item.address;

    formik.setFieldValue("city", address.city || address.town || address.village || "");
    formik.setFieldValue("district", address.county || "");
    formik.setFieldValue("state", address.state || "");
    formik.setFieldValue("country", address.country || "");
    formik.setFieldValue("pincode", address.postcode || "");

    setCitySearch(address.city || address.town || address.village || "");
    setSuggestions([]);
  };

  return (
    <div className="register-page">
      {/* Background Video */}
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="RegisterContainer">
        <header>
          <img src={logo} alt="Snehabandh Matrimony" />
        </header>

        <h2 className="form-title">Create Your Profile</h2>
        <p className="form-subtitle">
          "Your Story Could Be The Next Beautiful Beginning."
        </p>

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
              {formik.touched.middleName && formik.errors.middleName && (
                <p className="error-text">{formik.errors.middleName}</p>
              )}
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
          <div className="row-3">
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
              <label>Matrimony Profile For</label>
              <select
                name="profileFor"
                value={formik.values.profileFor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option value="Self">Self</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Relative">Relative</option>
                <option value="Friend">Friend</option>
              </select>
              {formik.touched.profileFor && formik.errors.profileFor && (
                <p className="error-text">{formik.errors.profileFor}</p>
              )}
            </div>

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
              {formik.touched.maritalStatus &&
                formik.errors.maritalStatus && (
                  <p className="error-text">{formik.errors.maritalStatus}</p>
                )}
            </div>
          </div>

          {/* ROW 3 */}
          <div className="row-3">
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
              {formik.touched.dateOfBirth &&
                formik.errors.dateOfBirth && (
                  <p className="error-text">{formik.errors.dateOfBirth}</p>
                )}
            </div>

            {/* AUTOCOMPLETE CITY SEARCH */}
            <div className="input-field">
              <label>Search City</label>
              <input
                type="text"
                name="citySearch"
                placeholder="Type city name..."
                value={citySearch}
                onChange={(e) => handleCitySearch(e.target.value)}
                autoComplete="off"
              />

              {suggestions.length > 0 && (
                <ul className="suggestion-box">
                  {suggestions.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSelectSuggestion(item)}
                      className="suggestion-item"
                    >
                      {item.display_name}
                    </li>
                  ))}
                </ul>
              )}

              {formik.touched.city && formik.errors.city && (
                <p className="error-text">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* HIDDEN FIELDS (autofilled) */}
          <input type="hidden" name="city" value={formik.values.city} />
          <input type="hidden" name="district" value={formik.values.district} />
          <input type="hidden" name="state" value={formik.values.state} />
          <input type="hidden" name="country" value={formik.values.country} />
          <input type="hidden" name="pincode" value={formik.values.pincode} />

          {/* ROW 4 */}
          <div className="row-3">
            <div className="input-field">
              <label>Area</label>
              <input
                name="area"
                type="text"
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter area"
              />
              {formik.touched.area && formik.errors.area && (
                <p className="error-text">{formik.errors.area}</p>
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

            <div className="input-field">
              <label>Pincode</label>
              <input
                name="pincode"
                type="text"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Pincode"
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
              I agree to the <a href="#">Terms & Conditions</a> &{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </div>

          {formik.touched.terms && formik.errors.terms && (
            <p className="error-text">{formik.errors.terms}</p>
          )}

          <div className="center-btn">
            <button
              type="submit"
              className="btn-grad"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Submitting..." : "Register Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
