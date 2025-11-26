import React, { useEffect, useState } from "react";
import "./Preferences.css";
import { useGetPreferences, useSavePreferences } from "../../hooks/PreferenceHook/usePreference";

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
        <div className="mb-4">
          <p className="fw-semibold">Age Range</p>

          <div className="d-flex align-items-center justify-content-between">
            <div>{ageMin} yrs</div>

            <div className="d-flex flex-column align-items-center">
              <input
                type="range"
                min="18"
                max="80"
                value={ageMin}
                onChange={(e) => setAgeMin(Number(e.target.value))}
                className="form-range"
                style={{ width: "300px" }}
              />

              <input
                type="range"
                min={ageMin}
                max="80"
                value={ageMax}
                onChange={(e) => setAgeMax(Number(e.target.value))}
                className="form-range"
                style={{ width: "300px", marginTop: "5px" }}
              />
            </div>

            <div>{ageMax} yrs</div>
          </div>
        </div>

        {/* HEIGHT RANGE */}
        <div className="mb-4">
          <p className="fw-semibold">Height Range</p>

          <div className="d-flex align-items-center justify-content-between">
            <div>{cmToFeet(heightMin)}</div>

            <div className="d-flex flex-column align-items-center">
              <input
                type="range"
                min="100"
                max="250"
                value={heightMin}
                onChange={(e) => setHeightMin(Number(e.target.value))}
                className="form-range"
                style={{ width: "300px" }}
              />

              <input
                type="range"
                min={heightMin}
                max="250"
                value={heightMax}
                onChange={(e) => setHeightMax(Number(e.target.value))}
                className="form-range"
                style={{ width: "300px", marginTop: "5px" }}
              />
            </div>

            <div>{cmToFeet(heightMax)}</div>
          </div>
        </div>

        {/* BASIC DROPDOWNS */}
        <div className="row g-4 mt-4">

          <div className="col-md-6">
            <p>Marital Status</p>
            <select
              className="form-select custom-input"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option>Never Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Separated</option>
              <option>Awaiting Divorce</option>
            </select>
          </div>

          <div className="col-md-6">
            <p>Religion</p>
            <select
              className="form-select custom-input"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            >
              <option value="">Select</option>
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Jain</option>
              <option>Buddhist</option>
              <option>Jewish</option>
              <option>Parsi</option>
              <option>No Religion</option>
              <option>Spiritual</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <p>Caste</p>
            <select
              className="form-select custom-input"
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
            >
              <option value="">Select</option>
              <option>Maratha</option>
              <option>Brahmin</option>
              <option>Rajput</option>
              <option>Lingayat</option>
              <option>Yadav</option>
              <option>Punjabi Khatri</option>
              <option>No Bar</option>
              <option>Don't Care</option>
            </select>
          </div>

          <div className="col-md-6">
            <p>Mother Tongue</p>
            <select
              className="form-select custom-input"
              value={motherTongue}
              onChange={(e) => setMotherTongue(e.target.value)}
            >
              <option value="">Select</option>
              <option>Hindi</option>
              <option>Marathi</option>
              <option>Gujarati</option>
              <option>Kannada</option>
              <option>Tamil</option>
              <option>Punjabi</option>
              <option>English</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* CARD 2 — LOCATION, CAREER, LIFESTYLE, HOROSCOPE */}
      <div className="preference-card mx-auto mt-4 p-4 p-md-5 rounded-4 shadow-sm">

        {/* LOCATION */}
        <h5 className="fw-bold mb-4">Location Details</h5>
        <div className="row g-4">

          <div className="col-md-4">
            <p>Country</p>
            <select className="form-select custom-input" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select</option>
              <option>India</option>
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
              <option>Australia</option>
              <option>Germany</option>
              <option>Other</option>
            </select>
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
            <select className="form-select custom-input" value={education} onChange={(e) => setEducation(e.target.value)}>
              <option>Select</option>
              <option>High School</option>
              <option>Diploma</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>PhD</option>
              <option>MBA</option>
              <option>Medical - MBBS</option>
              <option>Engineering - BE/B.Tech</option>
              <option>Law - LLB</option>
            </select>
          </div>

          <div className="col-md-6">
            <p>Profession</p>
            <select className="form-select custom-input" value={occupation} onChange={(e) => setOccupation(e.target.value)}>
              <option>Select</option>
              <option>Software Professional</option>
              <option>Engineer</option>
              <option>Doctor</option>
              <option>Business Owner</option>
              <option>Teacher</option>
              <option>Student</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <p>Annual Income</p>
            <select className="form-select custom-input" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)}>
              <option>Select</option>
              <option>Below 1 LPA</option>
              <option>1-2 LPA</option>
              <option>3-5 LPA</option>
              <option>5-7 LPA</option>
              <option>7-10 LPA</option>
              <option>10-15 LPA</option>
              <option>15 LPA & Above</option>
            </select>
          </div>
        </div>

        <hr className="my-4" />

        {/* LIFESTYLE & HOROSCOPE */}
        <h5 className="fw-bold mb-4">Lifestyle & Horoscope</h5>

        <div className="row g-4">
          <div className="col-md-4">
            <p>Diet</p>
            <select className="form-select custom-input" value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option>Select</option>
              <option>Vegetarian</option>
              <option>Eggetarian</option>
              <option>Non-Vegetarian</option>
              <option>Jain</option>
              <option>Vegan</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Smoking</p>
            <select className="form-select custom-input" value={smoking} onChange={(e) => setSmoking(e.target.value)}>
              <option>Select</option>
              <option>Never</option>
              <option>Occasionally</option>
              <option>Regularly</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Drinking</p>
            <select className="form-select custom-input" value={drinking} onChange={(e) => setDrinking(e.target.value)}>
              <option>Select</option>
              <option>Never</option>
              <option>Occasionally</option>
              <option>Regularly</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Manglik</p>
            <select className="form-select custom-input" value={manglik} onChange={(e) => setManglik(e.target.value)}>
              <option>Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>Doesn't Matter</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Rashi</p>
            <select className="form-select custom-input" value={rashi} onChange={(e) => setRashi(e.target.value)}>
              <option>Select</option>
              <option>Mithun</option>
              <option>Tula</option>
              <option>Vrishabh</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Nadi</p>
            <select className="form-select custom-input" value={nadi} onChange={(e) => setNadi(e.target.value)}>
              <option>Select</option>
              <option>Adi</option>
              <option>Madhya</option>
              <option>Antya</option>
              <option>Doesn't Matter</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Gan</p>
            <select className="form-select custom-input" value={gan} onChange={(e) => setGan(e.target.value)}>
              <option>Select</option>
              <option>Dev</option>
              <option>Manav</option>
              <option>Rakshas</option>
            </select>
          </div>

          <div className="col-md-4">
            <p>Charan</p>
            <select className="form-select custom-input" value={charan} onChange={(e) => setCharan(e.target.value)}>
              <option>Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>

        {/* EXPECTATION */}
        <div className="mt-4">
          <p>Partner Expectations</p>
          <textarea
            className="form-control"
            rows="3"
            maxLength="500"
            value={partnerExpectation}
            onChange={(e) => setPartnerExpectation(e.target.value)}
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
    </main>
  );
};

export default Preferences;
