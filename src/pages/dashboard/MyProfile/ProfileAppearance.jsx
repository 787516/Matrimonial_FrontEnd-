import React from "react";
import "./ProfileAppearance.css";
import ProfileSidebar from "./ProfileSidebar.jsx";
import { FaEye, FaShareAlt, FaHeart, FaBan, FaFlag } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext.jsx";
import AvtarPhoto from "../../../assets/profileAvtar.jpg";
import { useUserProfile } from "../../../hooks/ProfileHook/useUserDetailHook";
import { useGetGallery, useUploadProfilePhoto } from "../../../hooks/GalleryHook/useGalleryHook";

const ProfileAppearance = () => {
    const [show, setShow] = React.useState(false);
  const { authUser } = React.useContext(AuthContext);

  const userProfileId = authUser?.user?._id;
    
  const { data: profile, isLoading } = useUserProfile(userProfileId);
  //console.log("profile detail", profile);
  
  const { data: gallery } = useGetGallery(userProfileId);
  const profilePhotoFromGallery = gallery?.find((p) => p.isProfilePhoto) || null;
  const finalProfilePhoto = profilePhotoFromGallery?.imageUrl || AvtarPhoto;
  // Loading
  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  if (!profile) return <h3 className="text-center mt-5">No Profile Found</h3>;

  const p = profile; // shortcut

  // Convert height to feet/inch
  const toFeet = (cm) => {
    const inches = Math.round(cm / 2.54);
    const ft = Math.floor(inches / 12);
    const inch = inches % 12;
    return `${ft}'${inch}"`;
  };

  // Calculate age
  const getAge = (dob) => {
    if (!dob) return "-";
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  // Profile photo from gallery
  // const profilePhotoFromGallery = authUser?.gallery?.find(
  //   (item) => item.isProfilePhoto === true
  // );

  // const finalProfilePhoto = profilePhotoFromGallery?.imageUrl || AvtarPhoto;



  return (
    <div className="mp-page-container mt-3">
      <ProfileSidebar />

      <div className="mp-main">
        <header className="mp-banner">
          <div className="mp-banner-left">
            <span className="mp-banner-title">Profile as it appears to others</span>
          </div>
          <button className="mp-banner-public">
            <FaEye className="mp-banner-public-icon" />
            <span>Public View</span>
          </button>
        </header>

        <section className="mp-card">
          {/* Left */}
          <div className="mp-card-left">
            <div className="mp-photo-wrapper">
              <img src={finalProfilePhoto} alt="profile" className="mp-photo" />
              <div className="mp-photo-border"></div>
            </div>

            <div className="mp-basic-info">
              <h2 className="mp-name">
                {p?.userId?.firstName} {p?.userId?.lastName}
              </h2>
              <p className="mp-primary-line">
                {getAge(p?.userId?.dateOfBirth)} yrs,{" "}
                {p.height ? toFeet(p.height) : "-"}, {p.rashi || "-"}
              </p>
              <p className="mp-secondary-line">
                {p.motherTongue} • {p.religion} {p.community}
              </p>
            </div>

            <div className="mp-buttons-row">
              <button
  className="mp-btn-detailed"
  onClick={() => setShow((prev) => !prev)}
>
  {show ? "Hide Details" : "Detailed Profile"}
</button>

              <div className="mp-verified-pill">
                <span className="mp-verified-dot" />
                Verified
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="mp-card-right">
            <div className="mp-field-row">
              <span className="mp-field-label">Marital Status:</span>
              <span className="mp-field-value">{p.maritalStatus}</span>
            </div>

            <div className="mp-field-row">
              <span className="mp-field-label">Lives In:</span>
              <span className="mp-field-value">{p.city}</span>
            </div>

            <div className="mp-field-row">
              <span className="mp-field-label">Mother Tongue:</span>
              <span className="mp-field-value">{p.motherTongue}</span>
            </div>

            <div className="mp-field-row">
              <span className="mp-field-label">Posted By:</span>
              <span className="mp-field-value">{p.profileCreatedBy}</span>
            </div>

            <div className="mp-field-row">
              <span className="mp-field-label">Religion / Community:</span>
              <span className="mp-field-value">
                {p.religion} {p.community}
              </span>
            </div>

            <div className="mp-field-row">
              <span className="mp-field-label">Education:</span>
              <span className="mp-field-value">{p.highestQualification}</span>
            </div>

            <div className="mp-actions-row">
              <button className="mp-icon-btn" title="Share">
                <FaShareAlt />
              </button>
              <button className="mp-icon-btn" title="Shortlist">
                <FaHeart />
              </button>
              <button className="mp-icon-btn" title="Ignore">
                <FaBan />
              </button>
              <button className="mp-icon-btn" title="Report">
                <FaFlag />
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className={`detail-card ${show ? "show" : ""}`}>

  {/* TIMELINE LINE */}
  <div className="timeline-line"></div>

  {/* ABOUT SECTION */}
  <div className="detail-section">
    <div className="detail-icon">
      <i className="fa-solid fa-user-check"></i>
    </div>

    <h6 className="detail-title">About {profile?.userId?.firstName}</h6>
    <p className="detail-sub">
      {profile?.profession || "N/A"} | Profile created by {profile?.profileCreatedBy}
    </p>

    <p className="detail-text">
      {profile?.aboutMe ||
        "Hey, this user has not added an about section yet."}
    </p>

    {/* CONTACT BOX */}
    <div className="contact-box contact-locked">
      <div className="locked-text">
        <i className="fa-solid fa-lock"></i>
        Contact details are locked. Upgrade to Premium to view.
      </div>

      <button className="unlock-btn">
        <i className="fa-solid fa-crown me-1"></i> Unlock with Premium
      </button>
    </div>
  </div>

  {/* LIFESTYLE */}
  <div className="detail-section">
    <div className="detail-icon">
      <i className="fa-solid fa-mug-saucer"></i>
    </div>

    <h6 className="detail-title">Lifestyle</h6>

    <p><span className="detail-label">Diet:</span> {profile?.diet}</p>
    <p><span className="detail-label">Smoking:</span> {profile?.smoking}</p>
    <p><span className="detail-label">Drinking:</span> {profile?.drinking}</p>
  </div>

  {/* EDUCATION & CAREER */}
  <div className="detail-section">
    <div className="detail-icon">
      <i className="fa-solid fa-briefcase"></i>
    </div>

    <h6 className="detail-title">Education & Career</h6>

    <p><span className="detail-label">Education:</span> {profile?.highestQualification}</p>
    <p><span className="detail-label">Profession:</span> {profile?.workingWith}</p>
    <p><span className="detail-label">Currently:</span> {profile?.workingStatus}</p>
  </div>

  {/* PARTNER PREFERENCES */}
  <div className="detail-section">
    <div className="detail-icon">
      <i className="fa-solid fa-heart"></i>
    </div>

    <h6 className="detail-title">What He is Looking For</h6>

    <div className="row">
      <div className="col-md-6">
        <p>
          <span className="detail-label">Age:</span>{" "}
          {profile?.partnerAge || "N/A"}
        </p>
        <p>
          <span className="detail-label">Height:</span>{" "}
          {profile?.partnerHeight || "N/A"}
        </p>
        <p>
          <span className="detail-label">Marital Status:</span>{" "}
          {profile?.partnerMaritalStatus || "N/A"}
        </p>
        <p>
          <span className="detail-label">Religion / Community:</span>{" "}
          {profile?.partnerReligion || "N/A"}
        </p>
      </div>

      <div className="col-md-6">
        <p>
          <span className="detail-label">Mother Tongue:</span>{" "}
          {profile?.partnerMotherTongue}
        </p>
        <p>
          <span className="detail-label">Location:</span>{" "}
          {profile?.partnerLocation}
        </p>
        <p>
          <span className="detail-label">Working With:</span>{" "}
          {profile?.partnerWorkingWith}
        </p>
        <p>
          <span className="detail-label">Annual Income:</span>{" "}
          {profile?.partnerIncome}
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProfileAppearance;
