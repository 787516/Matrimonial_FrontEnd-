import React, { useEffect, useState } from "react";
import "./ProfileReligiousBackground .css";
import ProfileSidebar from "./ProfileSidebar";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { updateProfile } from "../../../api/profile";

const ProfileReligiousBackground = () => {
  const { authUser } = React.useContext(AuthContext);
  const userProfileId = authUser?.user?._id;

  const { data: profile, isLoading } = useUserProfile(userProfileId);

  // --------------------
  // FORM STATE
  // --------------------
  const [form, setForm] = useState({
    religion: "",
    motherTongue: "",
    community: "",
    subCommunity: "",
    gothra: "",
    manglik: "Don't Know",
  });

  // --------------------
  // PREFILL FROM API
  // --------------------
  useEffect(() => {
    if (profile) {
      setForm({
        religion: profile.religion || "",
        motherTongue: profile.motherTongue || "",
        community: profile.community || "",
        subCommunity: profile.subCommunity || "",
        gothra: profile.gothra || "",
        manglik: profile.manglik || "Don't Know",
      });
    }
  }, [profile]);

  // --------------------
  // HANDLE INPUT CHANGE
  // --------------------
  const handleChange = (e) => {
    const { id, value, name } = e.target;

    const key = id || name;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --------------------
  // SAVE / UPDATE API
  // --------------------
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form);
      alert("Religious background updated successfully!");
      console.log("UPDATED:", res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update religious background.");
    }
  };

  if (isLoading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="mp-page-container mt-3">

      <ProfileSidebar />

      <section className="profile-right">
        <div className="religion-card">
          <div className="religion-card-header">Religious Background</div>

          <form onSubmit={handleSave}>

            {/* Religion */}
            <div className="rb-row">
              <div className="rb-label">Religion</div>
              <div className="rb-colon">:</div>
              <div className="rb-field">
                <select
                  id="religion"
                  className="form-select"
                  value={form.religion}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Hindu</option>
                  <option>Muslim - Sunni</option>
                  <option>Muslim - Shia</option>
                  <option>Christian - Catholic</option>
                  <option>Christian - Protestant</option>
                  <option>Sikh</option>
                  <option>Jain</option>
                  <option>Buddhist</option>
                  <option>Parsi</option>
                  <option>Jewish</option>
                  <option>No Religion</option>
                  <option>Spiritual but not religious</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Mother Tongue */}
            <div className="rb-row">
              <div className="rb-label">Mother Tongue</div>
              <div className="rb-colon">:</div>
              <div className="rb-field">
                <select
                  id="motherTongue"
                  className="form-select"
                  value={form.motherTongue}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Marathi</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                  <option>Punjabi</option>
                  <option>Kannada</option>
                  <option>Telugu</option>
                  <option>Tamil</option>
                  <option>Malayalam</option>
                  <option>Bengali</option>
                  <option>Odia</option>
                  <option>Rajasthani</option>
                  <option>Sindhi</option>
                  <option>Urdu</option>
                  <option>Konkani</option>
                  <option>English</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Caste */}
            <div className="rb-row">
              <div className="rb-label">Caste</div>
              <div className="rb-colon">:</div>
              <div className="rb-field">
                <select
                  id="community"
                  className="form-select"
                  value={form.community}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>96 Kuli Maratha</option>
                  <option>Maratha</option>
                  <option>Brahmin - Deshastha</option>
                  <option>Brahmin - Chitpavan</option>
                  <option>Brahmin - Kokanastha</option>
                  <option>CKP</option>
                  <option>Kunbi</option>
                  <option>Lingayat</option>
                  <option>Vaishya</option>
                  <option>Agri</option>
                  <option>Gujar</option>
                  <option>Rajput</option>
                  <option>Jain - Digambar</option>
                  <option>Jain - Shwetambar</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>OBC</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Sub Caste */}
            <div className="rb-row">
              <div className="rb-label">Sub-Caste</div>
              <div className="rb-colon">:</div>
              <div className="rb-field">
                <input
                  id="subCommunity"
                  type="text"
                  className="form-control"
                  value={form.subCommunity}
                  onChange={handleChange}
                  placeholder="Enter your sub-caste"
                />
              </div>
            </div>

            {/* Gothra */}
            <div className="rb-row">
              <div className="rb-label">Gothra / Gothram</div>
              <div className="rb-colon">:</div>
              <div className="rb-field">
                <select
                  id="gothra"
                  className="form-select"
                  value={form.gothra}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Don't Know</option>
                  <option>Bharadwaj</option>
                  <option>Vasishta</option>
                  <option>Kashyap</option>
                  <option>Garga</option>
                  <option>Vishwamitra</option>
                  <option>Gautam</option>
                  <option>Agastya</option>
                  <option>Atri</option>
                  <option>Parashar</option>
                  <option>Shandilya</option>
                  <option>Kaushik</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Manglik */}
            <div className="rb-row">
              <div className="rb-label">Manglik / Dosham</div>
              <div className="rb-colon">:</div>
              <div className="rb-field">
                <div className="rb-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="manglik"
                      value="Yes"
                      checked={form.manglik === "Yes"}
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="manglik"
                      value="No"
                      checked={form.manglik === "No"}
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="manglik"
                      value="Don't Know"
                      checked={form.manglik === "Don't Know"}
                      onChange={handleChange}
                    />{" "}
                    Don't Know
                  </label>
                </div>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="text-center mt-4">
              <button type="submit" className="btn-grad mx-auto">
                Save
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default ProfileReligiousBackground;
