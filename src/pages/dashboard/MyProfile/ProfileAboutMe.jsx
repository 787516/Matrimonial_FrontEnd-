import React from "react";
import "./ProfileAboutMe.css";
import ProfileSidebar from "./ProfileSidebar.jsx";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { AuthContext } from "../../../context/AuthContext.jsx";

const ProfileAboutMe = () => {
  const { authUser } = React.useContext(AuthContext);

  const userProfileId = authUser?.user?._id;
  const { data: profile, isLoading } = useUserProfile(userProfileId);

  console.log("profile detail from aboutMe detail", profile);

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (!profile) return <h3 className="text-center mt-5">No profile data found</h3>;

  const p = profile;

  // -------------------------------
  // Helpers
  // -------------------------------
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN");
  };

  const toFeet = (cm) => {
    if (!cm) return "N/A";
    const inches = Math.round(cm / 2.54);
    const ft = Math.floor(inches / 12);
    const inch = inches % 12;
    return `${ft}'${inch}"`;
  };

  return (
    <main className="mp-page-container mt-3">
      <ProfileSidebar active="about" />

      <section className="profile-right">
        {/* Red Bar */}
        <div className="profile-bar">
          <h5>About Me</h5>
          <span className="small">
            <i className="fa-regular fa-eye"></i> Profile Summary (Private View)
          </span>
        </div>

        {/* ACCORDION */}
        <div className="accordion" id="aboutMeAccordion">

          {/* ⭐ BASIC INFORMATION */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn" type="button" data-bs-toggle="collapse" data-bs-target="#basicInfo">
                <i className="fa-solid fa-user"></i>
                Basic Information
              </button>
            </h2>

            <div id="basicInfo" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="row g-3">
                  
                  <div className="col-md-4"><strong>Profile Created By:</strong> {p.profileCreatedBy || "N/A"}</div>
                  <div className="col-md-4"><strong>Gender:</strong> {p.gender || "N/A"}</div>
                  <div className="col-md-4"><strong>Date of Birth:</strong> {formatDate(p.dateOfBirth)}</div>

                  <div className="col-md-4"><strong>Marital Status:</strong> {p.maritalStatus || "N/A"}</div>
                  <div className="col-md-4"><strong>Height:</strong> {toFeet(p.height)}</div>
                  <div className="col-md-4"><strong>Any Disability:</strong> {p.anyDisability || "N/A"}</div>

                  <div className="col-md-4"><strong>Health Information:</strong> {p.healthInformation || "N/A"}</div>
                  <div className="col-md-4"><strong>Blood Group:</strong> {p.bloodGroup || "N/A"}</div>
                  <div className="col-md-4"><strong>Disability Type:</strong> {p.disabilityType || "N/A"}</div>

                  <div className="col-md-12"><strong>Disability Details:</strong> {p.disabilityDetails || "N/A"}</div>
                  <div className="col-md-12"><strong>Affects Daily Life/Work:</strong> {p.affectsDailyLife ? "Yes" : "No"}</div>

                </div>
              </div>
            </div>
          </div>

          {/* ⭐ FAMILY INFO */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#familyInfo">
                <i className="fa-solid fa-users"></i>
                Family Information
              </button>
            </h2>

            <div id="familyInfo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-md-4"><strong>Father Name:</strong> {p.fatherName || "N/A"}</div>
                  <div className="col-md-4"><strong>Mother Name:</strong> {p.motherName || "N/A"}</div>
                  <div className="col-md-4"><strong>No. of Brothers:</strong> {p.noOfBrothers ?? "N/A"}</div>

                  <div className="col-md-4"><strong>Father Occupation:</strong> {p.fatherOccupation || "N/A"}</div>
                  <div className="col-md-4"><strong>Mother Occupation:</strong> {p.motherOccupation || "N/A"}</div>
                  <div className="col-md-4"><strong>Family Type:</strong> {p.familyType || "N/A"}</div>

                  <div className="col-md-4"><strong>No. of Sisters:</strong> {p.noOfSisters ?? "N/A"}</div>
                  <div className="col-md-4"><strong>Married Sisters:</strong> {p.marriedSisters ?? "N/A"}</div>
                  <div className="col-md-4"><strong>Married Brothers:</strong> {p.marriedBrothers ?? "N/A"}</div>

                </div>
              </div>
            </div>
          </div>

          {/* ⭐ BIRTH DETAILS / HOROSCOPE */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#birthDetails">
                <i className="fa-solid fa-star-half-stroke"></i>
                Birth Details / Horoscope
              </button>
            </h2>

            <div id="birthDetails" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-md-4"><strong>Country of Birth:</strong> {p.countryOfBirth || "N/A"}</div>
                  <div className="col-md-4"><strong>City of Birth:</strong> {p.cityOfBirth || "N/A"}</div>
                  <div className="col-md-4"><strong>Time of Birth:</strong> {p.timeOfBirth || "N/A"}</div>

                  <div className="col-md-4"><strong>Rashi:</strong> {p.rashi || "N/A"}</div>
                  <div className="col-md-4"><strong>Gan:</strong> {p.gan || "N/A"}</div>
                  <div className="col-md-4"><strong>Nadi:</strong> {p.nadi || "N/A"}</div>

                  <div className="col-md-4"><strong>Charan:</strong> {p.charan || "N/A"}</div>
                  <div className="col-md-8"><strong>Manglik:</strong> {p.manglik || "N/A"}</div>

                </div>
              </div>
            </div>
          </div>

          {/* ⭐ RELIGIOUS BACKGROUND */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#religionInfo">
                <i className="fa-solid fa-place-of-worship"></i>
                Religious Background
              </button>
            </h2>

            <div id="religionInfo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-md-4"><strong>Religion:</strong> {p.religion || "N/A"}</div>
                  <div className="col-md-4"><strong>Caste:</strong> {p.community || p.subCaste || "N/A"}</div>
                  <div className="col-md-4"><strong>Gothra:</strong> {p.gothra || "N/A"}</div>

                  <div className="col-md-4"><strong>Mother Tongue:</strong> {p.motherTongue || "N/A"}</div>
                  <div className="col-md-8"><strong>Sub-Community:</strong> {p.subCommunity || "N/A"}</div>

                </div>
              </div>
            </div>
          </div>

          {/* ⭐ EDUCATION & CAREER */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#educationCareer">
                <i className="fa-solid fa-graduation-cap"></i>
                Education & Career
              </button>
            </h2>

            <div id="educationCareer" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-md-4"><strong>Highest Qualification:</strong> {p.highestQualification || "N/A"}</div>
                  <div className="col-md-4"><strong>College Name:</strong> {p.collegeName || "N/A"}</div>
                  <div className="col-md-4"><strong>Course:</strong> {p.course || "N/A"}</div>

                  <div className="col-md-4"><strong>Working With:</strong> {p.workingWith || "N/A"}</div>
                  <div className="col-md-4"><strong>Designation:</strong> {p.designation || "N/A"}</div>
                  <div className="col-md-4"><strong>Company Name:</strong> {p.companyName || "N/A"}</div>

                  <div className="col-md-4"><strong>Annual Income:</strong> {p.annualIncome || "N/A"}</div>

                </div>
              </div>
            </div>
          </div>

          {/* ⭐ LOCATION */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#locationInfo">
                <i className="fa-solid fa-location-crosshairs"></i>
                Location
              </button>
            </h2>

            <div id="locationInfo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-md-4"><strong>Country:</strong> {p.country || "N/A"}</div>
                  <div className="col-md-4"><strong>State:</strong> {p.state || "N/A"}</div>
                  <div className="col-md-4"><strong>City:</strong> {p.city || "N/A"}</div>

                  <div className="col-md-4"><strong>Area/Locality:</strong> {p.area || "N/A"}</div>
                  <div className="col-md-4"><strong>Pin-Code:</strong> {p.pincode || "N/A"}</div>
                  <div className="col-md-4"><strong>Residency Status:</strong> {p.residencyStatus || "N/A"}</div>

                  <div className="col-md-12"><strong>Permanent Address:</strong> {p.permanentAddress || "N/A"}</div>
                  <div className="col-md-12"><strong>Residential Address:</strong> {p.residentialAddress || "N/A"}</div>

                </div>
              </div>
            </div>
          </div>

          {/* ⭐ LIFESTYLE */}
          <div className="accordion-item mb-5">
            <h2 className="accordion-header">
              <button className="accordion-button about-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#lifeStyle">
                <i className="fa-solid fa-heart-pulse"></i>
                Lifestyle
              </button>
            </h2>

            <div id="lifeStyle" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-md-4"><strong>Hobbies:</strong> {p.hobbies?.join(", ") || "N/A"}</div>
                  <div className="col-md-4"><strong>Favourite Cuisine:</strong> {p.favouriteCuisine || "N/A"}</div>
                  <div className="col-md-4"><strong>Favourite Music:</strong> {p.favouriteMusic || "N/A"}</div>

                  <div className="col-md-4"><strong>Diet Preference:</strong> {p.diet || "N/A"}</div>
                  <div className="col-md-4"><strong>Drinking Habits:</strong> {p.drinking || "N/A"}</div>
                  <div className="col-md-4"><strong>Smoking Habits:</strong> {p.smoking || "N/A"}</div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ProfileAboutMe;
