import React, { useState, useEffect } from "react";
import "./ProfileEditPersonal.css";
import ProfileSidebar from "./ProfileSidebar.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { updateProfile } from "../../../api/profile";

const ProfileEditPersonal = () => {
  const { authUser } = React.useContext(AuthContext);
  const userProfileId = authUser?.user?._id;

  const { data: profile, isLoading } = useUserProfile(userProfileId);

  // -----------------------------
  // Convert API profile → State
  // -----------------------------
  const [form, setForm] = useState({
    profileCreatedBy: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    height: "",
    healthInformation: "",
    anyDisability: "",
    disabilityType: "",
    affectsDailyLife: false,
    disabilityDetails: "",
    bloodGroup: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    familyType: "",
    permanentAddress: "",
    nativePlace: "",
  });

  const [disability, setDisability] = useState("none");

  // Fill form using GET data
  useEffect(() => {
    if (profile) {
      setForm({
        profileCreatedBy: profile.profileCreatedBy || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth?.slice(0, 10) || "",
        maritalStatus: profile.maritalStatus || "",
        height: profile.height || "",
        healthInformation: profile.healthInformation || "",
        anyDisability: profile.anyDisability || "",
        disabilityType: profile.disabilityType || "",
        affectsDailyLife: profile.affectsDailyLife || false,
        disabilityDetails: profile.disabilityDetails || "",
        bloodGroup: profile.bloodGroup || "",
        fatherName: profile.fatherName || "",
        fatherOccupation: profile.fatherOccupation || "",
        motherName: profile.motherName || "",
        motherOccupation: profile.motherOccupation || "",
        familyType: profile.familyType || "",
        permanentAddress: profile.permanentAddress || "",
        nativePlace: profile.nativePlace || "",
      });

      setDisability(profile.anyDisability !== "No" ? "physical" : "none");
    }
  }, [profile]);

  // -----------------------------
  // Input Handler
  // -----------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // -----------------------------
  // Height dropdown (140cm–200cm)
  // -----------------------------
  const heightOptions = Array.from({ length: 80 }, (_, i) => 140 + i); // cm

  // -----------------------------
  // SAVE PROFILE (UPDATE API)
  // -----------------------------
  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        anyDisability: disability === "none" ? "No" : "Physical Disability",
      };

      const response = await updateProfile(payload);
      alert("Profile Updated Successfully!");
      console.log("UPDATED:", response.data);

    } catch (err) {
      console.error("UPDATE ERROR", err);
      alert("Failed to update profile");
    }
  };

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="mp-page-container mt-3">
      <ProfileSidebar />

      <section className="profile-right">
        <div className="card-edit bg-white border rounded-3 p-4 p-md-4">
          <h4 className="edit-title mb-2">Edit Personal Profile</h4>
          <hr className="mb-4" />

          {/* BASIC INFORMATION */}
          <h6 className="section-subtitle text-danger mb-3">
            Basic Information
          </h6>

          <form>
            {/* Profile Created By */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Profile Created By :
              </label>
              <div className="col-md-9">
                <select
                  name="profileCreatedBy"
                  className="form-select form-select-sm"
                  value={form.profileCreatedBy}
                  onChange={handleChange}
                >
                  <option value="">--select</option>
                  <option>Self</option>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Relative</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Gender :
              </label>
              <div className="col-md-9 d-flex gap-3">
                <label className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={form.gender === "Male"}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  Male
                </label>

                <label className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={form.gender === "Female"}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Date of Birth :
              </label>
              <div className="col-md-9">
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control form-control-sm"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Marital Status */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Marital Status :
              </label>
              <div className="col-md-9">
                <select
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">--select</option>
                  <option>Never Married</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                  <option>Awaiting Divorce</option>
                </select>
              </div>
            </div>

            {/* Height */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Height :
              </label>
              <div className="col-md-9">
                <select
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">--select</option>
                  {heightOptions.map((cm) => (
                    <option key={cm} value={cm}>{cm} cm</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Health Information */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Health Information :
              </label>
              <div className="col-md-9">
                <select
                  name="healthInformation"
                  value={form.healthInformation}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">--select</option>
                  <option>Healthy</option>
                  <option>Minor health issue</option>
                  <option>Major health issue</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Any Disability */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Any Disability :
              </label>
              <div className="col-md-9 d-flex gap-3">
                <label className="form-check">
                  <input
                    type="radio"
                    name="disability"
                    value="none"
                    checked={disability === "none"}
                    onChange={() => setDisability("none")}
                    className="form-check-input"
                  />
                  None
                </label>

                <label className="form-check">
                  <input
                    type="radio"
                    name="disability"
                    value="physical"
                    checked={disability === "physical"}
                    onChange={() => setDisability("physical")}
                    className="form-check-input"
                  />
                  Physical Disability
                </label>
              </div>
            </div>

            {/* Conditional Disability Box */}
            {disability === "physical" && (
              <div className="disability-box mt-2">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label form-label-sm">
                      Disability Type
                    </label>
                    <input
                      type="text"
                      name="disabilityType"
                      value={form.disabilityType}
                      onChange={handleChange}
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label form-label-sm">
                      Affects daily life?
                    </label>
                    <select
                      name="affectsDailyLife"
                      value={form.affectsDailyLife}
                      onChange={handleChange}
                      className="form-select form-select-sm"
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label form-label-sm">
                      Disability Details
                    </label>
                    <textarea
                      name="disabilityDetails"
                      value={form.disabilityDetails}
                      onChange={handleChange}
                      className="form-control form-control-sm"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Blood Group */}
            <div className="row mb-4 mt-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Blood Group :
              </label>
              <div className="col-md-9">
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">--select--</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option>
                  <option>O+</option><option>O-</option>
                </select>
              </div>
            </div>

            {/* ------------------ FAMILY SECTION ------------------ */}
            <h6 className="section-subtitle text-danger mb-3">Family</h6>
            <hr className="mb-3" />

            {/* Father */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Father's Name :
              </label>
              <div className="col-md-3">
                <input
                  name="fatherName"
                  type="text"
                  className="form-control form-control-sm"
                  value={form.fatherName}
                  onChange={handleChange}
                />
              </div>

              <label className="col-md-3 col-form-label col-form-label-sm">
                Father's Occupation :
              </label>
              <div className="col-md-3">
                <input
                  name="fatherOccupation"
                  type="text"
                  className="form-control form-control-sm"
                  value={form.fatherOccupation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Mother */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Mother's Name :
              </label>
              <div className="col-md-3">
                <input
                  name="motherName"
                  type="text"
                  className="form-control form-control-sm"
                  value={form.motherName}
                  onChange={handleChange}
                />
              </div>

              <label className="col-md-3 col-form-label col-form-label-sm">
                Mother's Occupation :
              </label>
              <div className="col-md-3">
                <input
                  name="motherOccupation"
                  type="text"
                  className="form-control form-control-sm"
                  value={form.motherOccupation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Address :
              </label>
              <div className="col-md-9">
                <textarea
                  name="permanentAddress"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  rows={3}
                />
              </div>
            </div>

            {/* Native Place */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label col-form-label-sm">
                Native Place :
              </label>
              <div className="col-md-9">
                <input
                  name="nativePlace"
                  type="text"
                  className="form-control form-control-sm"
                  value={form.nativePlace}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center mt-4">
              <button type="button" className="btn-grad" onClick={handleSave}>
                Save
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default ProfileEditPersonal;
