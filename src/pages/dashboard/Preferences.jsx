import React, { useEffect, useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Preferences.css";
import { useGetPreferences, useSavePreferences } from "../../hooks/PreferenceHook/usePreference";

const CustomSelect = ({ label, options, value, onChange, placeholder = "Select" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      {label && <p className="select-label">{label}</p>}

      <div
        className={`select-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-value">
          {value || placeholder}
        </span>
        <FaChevronDown className={`select-icon ${isOpen ? "rotate" : ""}`} />
      </div>

      {isOpen && (
        <div className="select-menu-custom">
          <ul className="select-list">
            {options.map((option, index) => (
              <li
                key={index}
                className={`select-item ${value === option ? "selected" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


const Preferences = () => {
  const { data: pref, isLoading } = useGetPreferences();
  const saveMutation = useSavePreferences();

  // AGE RANGE
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(30);

  // HEIGHT RANGE
  const [heightMin, setHeightMin] = useState(140);
  const [heightMax, setHeightMax] = useState(180);

  // BASIC FIELDS
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [motherTongue, setMotherTongue] = useState("");

  // LOCATION
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");

  // CAREER
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  // LIFESTYLE
  const [diet, setDiet] = useState("");
  const [smoking, setSmoking] = useState("");
  const [drinking, setDrinking] = useState("");

  // HOROSCOPE
  const [manglik, setManglik] = useState("");
  const [rashi, setRashi] = useState("");
  const [nadi, setNadi] = useState("");
  const [gan, setGan] = useState("");
  const [charan, setCharan] = useState("");

  const [partnerExpectation, setPartnerExpectation] = useState("");

  // LOAD EXISTING DATA
  useEffect(() => {
    if (!pref) return;

    setAgeMin(pref.ageRange?.min || 18);
    setAgeMax(pref.ageRange?.max || 30);

    setHeightMin(pref.heightRange?.min || 140);
    setHeightMax(pref.heightRange?.max || 180);

    setMaritalStatus(pref.maritalStatus?.[0] || "");
    setReligion(pref.religion || "");
    setCaste(pref.caste || "");
    setMotherTongue(pref.motherTongue || "");

    setCountry(pref.country || "");
    setStateName(pref.state || "");
    setCity(pref.city || "");

    setEducation(pref.education || "");
    setOccupation(pref.occupation || "");
    setSalaryRange(pref.salaryRange || "");

    setDiet(pref.diet || "");
    setSmoking(pref.smoking || "");
    setDrinking(pref.drinking || "");

    setManglik(pref.manglik || "");
    setRashi(pref.rashi || "");
    setNadi(pref.nadi || "");
    setGan(pref.gan || "");
    setCharan(pref.charan || "");

    setPartnerExpectation(pref.partnerExpectation || "");
  }, [pref]);

  const cmToFeet = (cm) => {
    let inches = Math.round(cm / 2.54);
    let ft = Math.floor(inches / 12);
    let inch = inches % 12;
    return `${ft}'${inch}"`;
  };

  const handleSave = () => {
    const payload = {
      maritalStatus: [maritalStatus],
      ageRange: { min: ageMin, max: ageMax },
      heightRange: { min: heightMin, max: heightMax },
      religion,
      caste,
      motherTongue,
      country,
      state: stateName,
      city,
      education,
      occupation,
      salaryRange,
      diet,
      smoking,
      drinking,
      manglik,
      rashi,
      nadi,
      gan,
      charan,
      partnerExpectation,
    };

    saveMutation.mutate(payload);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="preference py-5">

      {/* CARD 1 — BASIC */}
      <div className="preference-card mx-auto p-4 p-md-5 rounded-4 shadow-sm">
        <h4 className="fw-bold mb-4 text-center">
          Tell us what you are looking for in a life partner
        </h4>

        {/* AGE RANGE */}
        <div className="mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
          <p className="fw-semibold mb-3">Age Range</p>

          <div className="d-flex align-items-center justify-content-between gap-4">
            {/* FROM SLIDER */}
            <div className="w-50">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold text-danger">From: {ageMin} yrs</span>
              </div>
              <input
                type="range"
                min="18"
                max="80"
                value={ageMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= ageMax) setAgeMin(val);
                }}
                className="form-range modern-range"
              />
            </div>

            {/* TO SLIDER */}
            <div className="w-50">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold text-danger">To: {ageMax} yrs</span>
              </div>
              <input
                type="range"
                min="18"
                max="80"
                value={ageMax}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= ageMin) setAgeMax(val);
                }}
                className="form-range modern-range"
              />
            </div>
          </div>
        </div>

        {/* HEIGHT RANGE */}
        <div className="mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
          <p className="fw-semibold mb-3">Height Range</p>

          <div className="d-flex align-items-center justify-content-between gap-4">
            {/* FROM SLIDER */}
            <div className="w-50">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold text-danger">From: {cmToFeet(heightMin)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                value={heightMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= heightMax) setHeightMin(val);
                }}
                className="form-range modern-range"
              />
            </div>

            {/* TO SLIDER */}
            <div className="w-50">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold text-danger">To: {cmToFeet(heightMax)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                value={heightMax}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= heightMin) setHeightMax(val);
                }}
                className="form-range modern-range"
              />
            </div>
          </div>
        </div>

        {/* BASIC DROPDOWNS */}
        <div className="row g-4 mt-4">

          <div className="col-md-6">
            <p>Marital Status</p>
            <CustomSelect
              options={["Never Married", "Divorced", "Widowed", "Separated", "Awaiting Divorce"]}
              value={maritalStatus}
              onChange={setMaritalStatus}
              placeholder="Select"
            />
          </div>

          <div className="col-md-6">
            <p>Religion</p>
            <CustomSelect
              options={["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Jewish", "Parsi", "No Religion", "Spiritual", "Other"]}
              value={religion}
              onChange={setReligion}
              placeholder="Select"
            />
          </div>

          <div className="col-md-6">
            <p>Caste</p>
            <CustomSelect
              options={["Maratha", "Brahmin", "Rajput", "Lingayat", "Yadav", "Punjabi Khatri", "No Bar", "Don't Care"]}
              value={caste}
              onChange={setCaste}
              placeholder="Select"
            />
          </div>

          <div className="col-md-6">
            <p>Mother Tongue</p>
            <CustomSelect
              options={["Hindi", "Marathi", "Gujarati", "Kannada", "Tamil", "Punjabi", "English", "Other"]}
              value={motherTongue}
              onChange={setMotherTongue}
              placeholder="Select"
            />
          </div>
        </div>
        <hr className="my-4" />

        {/* LOCATION, CAREER, LIFESTYLE, HOROSCOPE */}


        {/* LOCATION */}
        <h5 className="fw-bold mb-4">Location Details</h5>
        <div className="row g-4">

          <div className="col-md-4">
            <p>Country</p>
            <CustomSelect
              options={["India", "USA", "Canada", "UK", "Australia", "Germany", "Other"]}
              value={country}
              onChange={setCountry}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>State</p>
            <input className="form-control custom-input" value={stateName} onChange={(e) => setStateName(e.target.value)} />
          </div>

          <div className="col-md-4">
            <p>City</p>
            <input className="form-control custom-input" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>

        <hr className="my-4" />

        {/* CAREER */}
        <h5 className="fw-bold mb-4">Education & Profession</h5>

        <div className="row g-4">

          <div className="col-md-6">
            <p>Qualification</p>
            <CustomSelect
              options={["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "MBA", "Medical - MBBS", "Engineering - BE/B.Tech", "Law - LLB"]}
              value={education}
              onChange={setEducation}
              placeholder="Select"
            />
          </div>

          <div className="col-md-6">
            <p>Profession</p>
            <CustomSelect
              options={["Software Professional", "Engineer", "Doctor", "Business Owner", "Teacher", "Student", "Other"]}
              value={occupation}
              onChange={setOccupation}
              placeholder="Select"
            />
          </div>

          <div className="col-md-6">
            <p>Annual Income</p>
            <CustomSelect
              options={["Below 1 LPA", "1-2 LPA", "3-5 LPA", "5-7 LPA", "7-10 LPA", "10-15 LPA", "15 LPA & Above"]}
              value={salaryRange}
              onChange={setSalaryRange}
              placeholder="Select"
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* LIFESTYLE & HOROSCOPE */}
        <h5 className="fw-bold mb-4">Lifestyle & Horoscope</h5>

        <div className="row g-4">
          <div className="col-md-4">
            <p>Diet</p>
            <CustomSelect
              options={["Vegetarian", "Eggetarian", "Non-Vegetarian", "Jain", "Vegan"]}
              value={diet}
              onChange={setDiet}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Smoking</p>
            <CustomSelect
              options={["Never", "Occasionally", "Regularly"]}
              value={smoking}
              onChange={setSmoking}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Drinking</p>
            <CustomSelect
              options={["Never", "Occasionally", "Regularly"]}
              value={drinking}
              onChange={setDrinking}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Manglik</p>
            <CustomSelect
              options={["Yes", "No", "Doesn't Matter"]}
              value={manglik}
              onChange={setManglik}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Rashi</p>
            <CustomSelect
              options={["Mithun", "Tula", "Vrishabh"]}
              value={rashi}
              onChange={setRashi}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Nadi</p>
            <CustomSelect
              options={["Adi", "Madhya", "Antya", "Doesn't Matter"]}
              value={nadi}
              onChange={setNadi}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Gan</p>
            <CustomSelect
              options={["Dev", "Manav", "Rakshas"]}
              value={gan}
              onChange={setGan}
              placeholder="Select"
            />
          </div>

          <div className="col-md-4">
            <p>Charan</p>
            <CustomSelect
              options={["1", "2", "3", "4"]}
              value={charan}
              onChange={setCharan}
              placeholder="Select"
            />
          </div>
        </div>

        {/* EXPECTATION */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="mb-0">Partner Expectations</p>
            <span className={`small fw-bold ${partnerExpectation.length >= 500 ? "text-danger" : "text-muted"}`}>
              {partnerExpectation.length} / 500
            </span>
          </div>
          <textarea
            className="form-control expectation-textarea"
            rows="5"
            maxLength="500"
            value={partnerExpectation}
            onChange={(e) => setPartnerExpectation(e.target.value)}
            style={{
              borderColor: partnerExpectation.length >= 500 ? "#dc3545" : ""
            }}
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="text-center mt-4">
          <button
            className="btn btn-danger px-5"
            onClick={handleSave}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? "Saving..." : "Save Preferences"}
          </button>
        </div>

      </div>
    </main >
  );
};

export default Preferences;
