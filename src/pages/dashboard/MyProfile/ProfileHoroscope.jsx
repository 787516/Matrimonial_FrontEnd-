import React, { useEffect, useState } from "react";
import "./ProfileHoroscope.css";
import ProfileSidebar from "./ProfileSidebar.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { updateProfile } from "../../../api/profile";

const ProfileHoroscope = () => {
  const { authUser } = React.useContext(AuthContext);
  const userProfileId = authUser?.user?._id;

  const { data: profile, isLoading } = useUserProfile(userProfileId);

  // -----------------------
  // STATES
  // -----------------------
  const [form, setForm] = useState({
    countryOfBirth: "",
    cityOfBirth: "",
    birthHour: "",
    birthMinute: "",
    birthAmPm: "AM",
    rashi: "",
    nadi: "",
    gan: "",
    charan: "",
    manglik: "Don't Know",
  });

  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);

  // -----------------------
  // GENERATE HH & MM OPTIONS
  // -----------------------
  useEffect(() => {
    const hh = [];
    const mm = [];

    for (let i = 1; i <= 12; i++) hh.push(i.toString().padStart(2, "0"));
    for (let i = 0; i < 60; i++) mm.push(i.toString().padStart(2, "0"));

    setHours(hh);
    setMinutes(mm);
  }, []);

  // -----------------------
  // PREFILL FORM FROM GET API
  // -----------------------
  useEffect(() => {
    if (profile) {
      const [hr, min] = profile.timeOfBirth?.split(":") || ["", ""];

      setForm({
        countryOfBirth: profile.countryOfBirth || "",
        cityOfBirth: profile.cityOfBirth || "",
        birthHour: hr || profile.birthHour?.toString().padStart(2, "0"),
        birthMinute: min || profile.birthMinute?.toString().padStart(2, "0"),
        birthAmPm: profile.birthAmPm || "AM",
        rashi: profile.rashi || "",
        nadi: profile.nadi || "",
        gan: profile.gan || "",
        charan: profile.charan || "",
        manglik: profile.manglik || "Don't Know",
      });
    }
  }, [profile]);

  // -----------------------
  // HANDLE INPUT CHANGE
  // -----------------------
  const handleChange = (e) => {
    const { id, value, name } = e.target;

    const key = id || name; // radio uses name
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // -----------------------
  // SAVE / UPDATE API
  // -----------------------
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      birthHour: Number(form.birthHour),
      birthMinute: Number(form.birthMinute),
      timeOfBirth: `${form.birthHour}:${form.birthMinute}`,
    };

    try {
      const res = await updateProfile(payload);
      alert("Horoscope details updated successfully!");
      console.log("UPDATED:", res.data);
    } catch (error) {
      console.error("UPDATE ERROR", error);
      alert("Failed to update Horoscope details.");
    }
  };

  if (isLoading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="mp-page-container mt-3">
      <ProfileSidebar />

      <section className="profile-right">
        <div className="birth-card">
          <div className="birth-card-header">Birth Details / Horoscope</div>

          <form id="birthForm" onSubmit={handleSave}>
            {/* COUNTRY OF BIRTH */}
            <div className="birth-row">
              <div className="birth-label">Country of Birth</div>
              <div className="birth-colon">:</div>
              <div className="birth-field">
                <select
                  id="countryOfBirth"
                  className="form-select"
                  value={form.countryOfBirth}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>UAE</option>
                  <option>Singapore</option>
                  <option>Germany</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* CITY OF BIRTH */}
            <div className="birth-row">
              <div className="birth-label">City of Birth</div>
              <div className="birth-colon">:</div>
              <div className="birth-field">
                <select
                  id="cityOfBirth"
                  className="form-select"
                  value={form.cityOfBirth}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Pune</option>
                  <option>Kolhapur</option>
                  <option>Mumbai</option>
                  <option>Nagpur</option>
                  <option>Nashik</option>
                  <option>Aurangabad</option>
                  <option>Delhi</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* TIME OF BIRTH */}
            <div className="birth-row">
              <div className="birth-label">Time of Birth</div>
              <div className="birth-colon">:</div>
              <div className="birth-field d-flex gap-2">
                <select
                  id="birthHour"
                  className="form-select time-select"
                  value={form.birthHour}
                  onChange={handleChange}
                >
                  <option value="">HH</option>
                  {hours.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>

                <select
                  id="birthMinute"
                  className="form-select time-select"
                  value={form.birthMinute}
                  onChange={handleChange}
                >
                  <option value="">MM</option>
                  {minutes.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select
                  id="birthAmPm"
                  className="form-select ampm-select"
                  value={form.birthAmPm}
                  onChange={handleChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* RASHI & NADI */}
            <div className="birth-row">
              <div className="birth-label">Rashi</div>
              <div className="birth-colon">:</div>
              <div className="birth-field d-flex gap-2">
                <select
                  id="rashi"
                  className="form-select"
                  value={form.rashi}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Mesh</option>
                  <option>Vrishabh</option>
                  <option>Mithun</option>
                  <option>Karka</option>
                  <option>Simha</option>
                  <option>Kanya</option>
                  <option>Tula</option>
                  <option>Vrischik</option>
                  <option>Dhanu</option>
                  <option>Makar</option>
                  <option>Kumbh</option>
                  <option>Meen</option>
                </select>

                <select
                  id="nadi"
                  className="form-select"
                  value={form.nadi}
                  onChange={handleChange}
                >
                  <option value="">Nadi</option>
                  <option>Adi</option>
                  <option>Madhya</option>
                  <option>Antya</option>
                </select>
              </div>
            </div>

            {/* GAN & CHARAN */}
            <div className="birth-row">
              <div className="birth-label">Gan</div>
              <div className="birth-colon">:</div>
              <div className="birth-field d-flex gap-2">
                <select
                  id="gan"
                  className="form-select"
                  value={form.gan}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option>Deva</option>
                  <option>Manushya</option>
                  <option>Rakshasa</option>
                </select>

                <select
                  id="charan"
                  className="form-select"
                  value={form.charan}
                  onChange={handleChange}
                >
                  <option value="">Charan</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>

            {/* MANGLIK */}
            <div className="birth-row">
              <div className="birth-label">Manglik / Dosham</div>
              <div className="birth-colon">:</div>
              <div className="birth-field">
                <div className="radio-group">
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
            <div className="text-center mt-3">
              <button type="submit" className="btn-grad">
                Save
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default ProfileHoroscope;
