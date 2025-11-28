import React, { useEffect, useState } from "react";
import "./ProfileLocation.css";
import ProfileSidebar from "./ProfileSidebar";

import { AuthContext } from "../../../context/AuthContext.jsx";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { updateProfile } from "../../../api/profile";

const ProfileLocation = () => {
  const { authUser } = React.useContext(AuthContext);
  const userProfileId = authUser?.user?._id;

  const { data: profile, isLoading } = useUserProfile(userProfileId);

  const [form, setForm] = useState({
    country: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    residencyStatus: "",
    permanentAddress: "",
    residentialAddress: "",
  });

  // Prefill when API data loads
  useEffect(() => {
    if (profile) {
      setForm({
        country: profile.country || "",
        state: profile.state || "",
        city: profile.city || "",
        area: profile.area || "",
        pincode: profile.pincode || "",
        residencyStatus: profile.residencyStatus || "",
        permanentAddress: profile.permanentAddress || "",
        residentialAddress: profile.residentialAddress || "",
      });
    }
  }, [profile]);

  // Handle form change
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle update API
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form);
      alert("Location details updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update location details");
    }
  };

  if (isLoading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="mp-page-container mt-3">

      <ProfileSidebar />

      <section className="profile-right">
        <div className="loc-card">

          <div className="loc-card-header">Location & Address Details</div>

          <form onSubmit={handleSave}>

            {/* Country */}
            <div className="loc-row">
              <div className="loc-label">Country</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <select
                  id="country"
                  className="form-select custom-select-scroll"
                  value={form.country}
                  onChange={handleChange}
                >
                  <option value="">-- Select Country --</option>
                  <option>India</option>
                  <option>Afghanistan</option>
                  <option>Australia</option>
                  <option>Bangladesh</option>
                  <option>Canada</option>
                  <option>China</option>
                  <option>France</option>
                  <option>Germany</option>
                  <option>Japan</option>
                  <option>Malaysia</option>
                  <option>Nepal</option>
                  <option>New Zealand</option>
                  <option>Pakistan</option>
                  <option>Qatar</option>
                  <option>Saudi Arabia</option>
                  <option>Singapore</option>
                  <option>South Africa</option>
                  <option>Sri Lanka</option>
                  <option>United Arab Emirates</option>
                  <option>United Kingdom</option>
                  <option>United States of America</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* State */}
            <div className="loc-row">
              <div className="loc-label">State</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <select
                  id="state"
                  className="form-select custom-select-scroll"
                  value={form.state}
                  onChange={handleChange}
                >
                  <option value="">-- Select State --</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Delhi</option>
                  <option>Gujarat</option>
                  <option>Tamil Nadu</option>
                  <option>West Bengal</option>
                  <option>Rajasthan</option>
                  <option>Punjab</option>
                  <option>Kerala</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div className="loc-row">
              <div className="loc-label">City</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <select
                  id="city"
                  className="form-select custom-select-scroll"
                  value={form.city}
                  onChange={handleChange}
                >
                  <option value="">-- Select City --</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Nagpur</option>
                  <option>Nashik</option>
                  <option>Kolhapur</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Delhi</option>
                </select>
              </div>
            </div>

            {/* Area */}
            <div className="loc-row">
              <div className="loc-label">Area / Locality</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <input
                  id="area"
                  type="text"
                  className="form-control"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="Area / Locality"
                />
              </div>
            </div>

            {/* Pincode */}
            <div className="loc-row">
              <div className="loc-label">Pin Code</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <input
                  id="pincode"
                  type="text"
                  maxLength={6}
                  className="form-control"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 411038"
                />
              </div>
            </div>

            {/* Residency Status */}
            <div className="loc-row">
              <div className="loc-label">Residency Status</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <select
                  id="residencyStatus"
                  className="form-select custom-select-scroll"
                  value={form.residencyStatus}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Owned</option>
                  <option>Rented</option>
                  <option>Company Provided</option>
                  <option>Family</option>
                  <option>PG/Hostel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Permanent Address */}
            <div className="loc-row">
              <div className="loc-label">Permanent Address</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <textarea
                  id="permanentAddress"
                  className="form-control"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  placeholder="Mention your permanent address"
                />
              </div>
            </div>

            {/* Residential Address */}
            <div className="loc-row">
              <div className="loc-label">Residential Address</div>
              <div className="loc-colon">:</div>
              <div className="loc-field">
                <textarea
                  id="residentialAddress"
                  className="form-control"
                  value={form.residentialAddress}
                  onChange={handleChange}
                  placeholder="Mention your residential address"
                />
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="text-center mt-3">
              <button type="submit" className="btn-grad mx-auto">Save</button>
            </div>

          </form>

        </div>
      </section>

    </div>
  );
};

export default ProfileLocation;
