import React, { useEffect, useState } from "react";
import "./ProfileEducationBackground.css";
import ProfileSidebar from "./ProfileSidebar";

import { AuthContext } from "../../../context/AuthContext.jsx";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { updateProfile } from "../../../api/profile";

const ProfileEducationBackground = () => {
  const { authUser } = React.useContext(AuthContext);
  const userProfileId = authUser?.user?._id;

  const { data: profile, isLoading } = useUserProfile(userProfileId);

  // -------------------------------
  // FORM STATE
  // -------------------------------
  const [form, setForm] = useState({
    highestQualification: "",
    collegeName: "",
    course: "",
    workingWith: "",
    designation: "",
    companyName: "",
    annualIncome: "",
    businessType: "",
    businessName: "",
    businessYears: "",
    businessLocation: "",
  });

  // Prefill from API
  useEffect(() => {
    if (profile) {
      setForm({
        highestQualification: profile.highestQualification || "",
        collegeName: profile.collegeName || "",
        course: profile.course || "",
        workingWith: profile.workingWith || "",
        designation: profile.designation || "",
        companyName: profile.companyName || "",
        annualIncome: profile.annualIncome || "",
        businessType: profile.businessType || "",
        businessName: profile.businessName || "",
        businessYears: profile.businessYears || "",
        businessLocation: profile.businessLocation || "",
      });
    }
  }, [profile]);

  // -------------------------------
  // HANDLE INPUT CHANGE
  // -------------------------------
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // -------------------------------
  // SAVE / UPDATE API
  // -------------------------------
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form);
      alert("Education & Career updated successfully!");
      console.log("UPDATED:", res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (isLoading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="mp-page-container mt-3">

      {/* LEFT SIDEBAR */}
      <ProfileSidebar />

      {/* RIGHT */}
      <section className="profile-right">
        <div className="edu-card">

          <div className="edu-card-header">Education & Career</div>

          <form onSubmit={handleSave}>

            {/* Highest Qualification */}
            <div className="edu-row">
              <div className="edu-label">Highest Qualification</div>
              <div className="edu-colon">:</div>
              <div className="edu-field">
                <select
                  id="highestQualification"
                  className="form-select custom-select-scroll"
                  value={form.highestQualification}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>B.E / B.Tech</option>
                  <option>M.E / M.Tech</option>
                  <option>B.Sc</option>
                  <option>M.Sc</option>
                  <option>BCA</option>
                  <option>MCA</option>
                  <option>B.Com</option>
                  <option>M.Com</option>
                  <option>BBA</option>
                  <option>MBA / PGDM</option>
                  <option>MBBS</option>
                  <option>MD / MS</option>
                  <option>BDS</option>
                  <option>MDS</option>
                  <option>CA</option>
                  <option>CS</option>
                  <option>ICWA</option>
                  <option>Diploma</option>
                  <option>LLB</option>
                  <option>LLM</option>
                  <option>PhD</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            {/* College + Course */}
            <div className="edu-row">
              <div className="edu-label">College Name / Course</div>
              <div className="edu-colon">:</div>
              <div className="edu-field">

                {/* College */}
                <div className="datalist-input">
                  <input
                    id="collegeName"
                    className="form-control"
                    list="collegeList"
                    value={form.collegeName}
                    onChange={handleChange}
                    placeholder="Specify Highest Degree College"
                  />
                  <datalist id="collegeList">
                    <option value="COEP Technological University, Pune"></option>
                    <option value="VJTI, Mumbai"></option>
                    <option value="PICT, Pune"></option>
                    <option value="SP College, Pune"></option>
                    <option value="Fergusson College, Pune"></option>
                    <option value="IIT Bombay"></option>
                    <option value="MIT-WPU, Pune"></option>
                  </datalist>
                </div>

                {/* Course */}
                <div className="datalist-input">
                  <input
                    id="course"
                    className="form-control"
                    list="courseList"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="Course Name"
                  />
                  <datalist id="courseList">
                    <option value="Computer Engineering"></option>
                    <option value="Information Technology"></option>
                    <option value="Mechanical Engineering"></option>
                    <option value="Civil Engineering"></option>
                    <option value="B.Com - Accounting & Finance"></option>
                  </datalist>
                </div>

              </div>
            </div>

            {/* Working With */}
            <div className="edu-row">
              <div className="edu-label">Working With</div>
              <div className="edu-colon">:</div>
              <div className="edu-field">
                <select
                  id="workingWith"
                  className="form-select custom-select-scroll"
                  value={form.workingWith}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Pvt. Company</option>
                  <option>MNC</option>
                  <option>Government / PSU</option>
                  <option>Startup</option>
                  <option>Self-employed / Freelance</option>
                  <option>Business / Entrepreneur</option>
                  <option>NGO / Social Sector</option>
                  <option>Student</option>
                  <option>Not Working</option>
                </select>
              </div>
            </div>

            {/* Designation */}
            <div className="edu-row">
              <div className="edu-label">Designation</div>
              <div className="edu-colon">:</div>
              <div className="edu-field">
                <input
                  id="designation"
                  type="text"
                  className="form-control"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="edu-row">
              <div className="edu-label">Company Name</div>
              <div className="edu-colon">:</div>
              <div className="edu-field">
                <input
                  id="companyName"
                  className="form-control"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Type or search company name"
                />
              </div>
            </div>

            {/* Annual Income */}
            <div className="edu-row">
              <div className="edu-label">Annual Income</div>
              <div className="edu-colon">:</div>
              <div className="edu-field">
                <select
                  id="annualIncome"
                  className="form-select custom-select-scroll"
                  value={form.annualIncome}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Below ₹1 Lakh</option>
                  <option>₹1 Lakh – ₹3 Lakh</option>
                  <option>₹3 Lakh – ₹5 Lakh</option>
                  <option>₹5 Lakh – ₹7.5 Lakh</option>
                  <option>₹7.5 Lakh – ₹10 Lakh</option>
                  <option>₹10 Lakh – ₹15 Lakh</option>
                  <option>₹15 Lakh – ₹20 Lakh</option>
                  <option>Above ₹20 Lakh</option>
                </select>
              </div>
            </div>

            {/* BUSINESS FIELDS */}
            <div className="business-extra">

              <div className="business-extra-title">
                Business Details (Only for Business Profiles)
              </div>

              {/* Business Type */}
              <div className="edu-row">
                <div className="edu-label">Business Type</div>
                <div className="edu-colon">:</div>
                <div className="edu-field">
                  <input
                    id="businessType"
                    type="text"
                    className="form-control"
                    value={form.businessType}
                    onChange={handleChange}
                    placeholder="Retail, Manufacturing, IT Services"
                  />
                </div>
              </div>

              {/* Firm Name */}
              <div className="edu-row">
                <div className="edu-label">Firm / Trade Name</div>
                <div className="edu-colon">:</div>
                <div className="edu-field">
                  <input
                    id="businessName"
                    type="text"
                    className="form-control"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="Registered firm / shop name"
                  />
                </div>
              </div>

              {/* Years in Business */}
              <div className="edu-row">
                <div className="edu-label">Years in Business</div>
                <div className="edu-colon">:</div>
                <div className="edu-field">
                  <select
                    id="businessYears"
                    className="form-select custom-select-scroll"
                    value={form.businessYears}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    <option>Less than 1 year</option>
                    <option>1 – 3 years</option>
                    <option>3 – 5 years</option>
                    <option>5 – 10 years</option>
                    <option>More than 10 years</option>
                  </select>
                </div>
              </div>

              {/* Business Location */}
              <div className="edu-row">
                <div className="edu-label">Business Location</div>
                <div className="edu-colon">:</div>
                <div className="edu-field">
                  <input
                    id="businessLocation"
                    type="text"
                    className="form-control"
                    value={form.businessLocation}
                    onChange={handleChange}
                    placeholder="City / Area of your business"
                  />
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div className="text-center mt-4">
              <button type="submit" className="btn-grad">Save</button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default ProfileEducationBackground;
