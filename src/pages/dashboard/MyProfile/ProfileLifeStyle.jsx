import React, { useEffect, useState } from "react";
import "./ProfileLifeStyle.css";
import ProfileSidebar from "./ProfileSidebar";

import { AuthContext } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { updateProfile } from "../../../api/profile";

const ProfileLifeStyle = () => {
  const { authUser } = React.useContext(AuthContext);
  const userProfileId = authUser?.user?._id;

  // Fetch profile
  const { data: profile, isLoading } = useUserProfile(userProfileId);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // Form State
  const [form, setForm] = useState({
    hobbies: "",
    favouriteCuisine: "",
    favouriteMusic: "",
    diet: "",
    drinking: "",
    smoking: "",
    aboutMe: "",
    partnerExpectation: "",
  });

  // Prefill when data loads
  useEffect(() => {
    if (profile) {
      setForm({
        hobbies: profile.hobbies?.join(", ") || "",
        favouriteCuisine: profile.favouriteCuisine || "",
        favouriteMusic: profile.favouriteMusic || "",
        diet: profile.diet || "",
        drinking: profile.drinking || "",
        smoking: profile.smoking || "",
        aboutMe: profile.aboutMe || "",
        partnerExpectation: profile.partnerExpectation || "",
      });

      setCharCount((profile.aboutMe || "").length);
    }
  }, [profile]);

  const toggleAbout = () => setAboutOpen((prev) => !prev);

  // Handle Change
  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Radio Change
  const handleRadio = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // API Submit
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        hobbies: form.hobbies.split(",").map((item) => item.trim()),
      };

      await updateProfile(payload);
      alert("Lifestyle details updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (isLoading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="mp-page-container mt-3">
      <ProfileSidebar />

      <section className="profile-right">

        <form onSubmit={handleSave}>
          {/* LIFESTYLE CARD */}
          <div className="life-card">
            <div className="life-header">Lifestyle & Hobbies</div>

            {/* Hobbies */}
            <div className="life-row">
              <div className="life-label">Hobbies</div>
              <div className="life-colon">:</div>
              <div className="life-field">
                <input
                  id="hobbies"
                  type="text"
                  value={form.hobbies}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Reading, travelling, music"
                />
              </div>
            </div>

            {/* Favourite Cuisine */}
            <div className="life-row">
              <div className="life-label">Favourite Cuisine</div>
              <div className="life-colon">:</div>
              <div className="life-field">
                <input
                  id="favouriteCuisine"
                  type="text"
                  value={form.favouriteCuisine}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Indian, Continental"
                />
              </div>
            </div>

            {/* Favourite Music */}
            <div className="life-row">
              <div className="life-label">Favourite Music</div>
              <div className="life-colon">:</div>
              <div className="life-field">
                <input
                  id="favouriteMusic"
                  type="text"
                  value={form.favouriteMusic}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Bollywood, Classical"
                />
              </div>
            </div>

            {/* Diet */}
            <div className="life-row">
              <div className="life-label">Diet Preference</div>
              <div className="life-colon">:</div>
              <div className="life-field">
                <select
                  id="diet"
                  value={form.diet}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Select --</option>
                  <option>Veg</option>
                  <option>Non-Veg</option>
                  <option>Eggetarian</option>
                  <option>Vegan</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Drinking */}
            <div className="life-row">
              <div className="life-label">Drinking</div>
              <div className="life-colon">:</div>
              <div className="life-field habit-options">
                {["Regular", "Occasionally", "No"].map((val) => (
                  <label key={val} className="form-check-label">
                    <input
                      type="radio"
                      name="drink"
                      className="form-check-input"
                      checked={form.drinking === val}
                      onChange={() => handleRadio("drinking", val)}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>

            {/* Smoking */}
            <div className="life-row">
              <div className="life-label">Smoking</div>
              <div className="life-colon">:</div>
              <div className="life-field habit-options">
                {["Regular", "Occasionally", "No"].map((val) => (
                  <label key={val} className="form-check-label">
                    <input
                      type="radio"
                      name="smoke"
                      className="form-check-input"
                      checked={form.smoking === val}
                      onChange={() => handleRadio("smoking", val)}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>

            {/* SAVE */}
            <div className="text-center mt-3 mb-4">
              <button type="submit" className="btn-grad">Save</button>
            </div>
          </div>
        </form>

        {/* ABOUT SECTION */}
        <div className="about-card">
          <div className="about-header-bar about-toggle" onClick={toggleAbout}>
            <div>
              <div className="about-toggle-title">
                More About Yourself, Partner & Family
              </div>
              <div className="about-toggle-sub">
                Share a short introduction that helps the right families know you better.
              </div>
            </div>

            <div className={`about-icon ${aboutOpen ? "open" : ""}`}>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <div className={`about-body ${aboutOpen ? "show" : ""}`}>
            <label className="about-label">Personality & Partner Expectations</label>

            <textarea
              id="aboutMe"
              className="form-control about-textarea"
              value={form.aboutMe}
              maxLength={1000}
              onChange={(e) => {
                handleChange(e);
                setCharCount(e.target.value.length);
              }}
              placeholder="Write about yourself..."
            />

            <div className="char-info">
              Characters: {charCount} / 1000
            </div>

            <div className="text-center mt-3">
              <button
                className="btn-grad"
                onClick={() => updateProfile({ aboutMe: form.aboutMe })}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ProfileLifeStyle;
