import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./ViewProfile.css";

import { useViewProfile , useSendInterest } from "../../hooks/Matches/useMatches";
import axiosInstance from "../../api/axiosInstance";

// Icons
import {
  FiMapPin,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiFlag,
  FiUser,
  FiCalendar,
  FiBookOpen,
  FiBriefcase,
  FiGlobe,
  FiHome,
  FiUsers,
  FiActivity,
  FiStar,
  FiCompass,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import ProfileAvatar from "../../assets/profileAvtar.jpg";

function ViewProfile() {
  const { userId } = useParams();

  const viewProfileMutation = useViewProfile();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [interestStatus, setInterestStatus] = useState({});
  const sendInterestMutation = useSendInterest();


  // -------- Helpers --------
  const getAge = (dob) => {
    if (!dob) return null;
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatHeight = (cm) => {
    if (!cm) return "—";
    const inches = Math.round(cm / 2.54);
    const ft = Math.floor(inches / 12);
    const inch = inches % 12;
    return `${ft} Ft ${inch} In / ${cm} Cms`;
  };

  const formatTimeOfBirth = (profile) => {
    if (!profile) return "—";
    if (profile.timeOfBirth) return profile.timeOfBirth;
    if (profile.birthHour == null || profile.birthMinute == null) return "—";
    const hour = profile.birthHour;
    const minute = profile.birthMinute.toString().padStart(2, "0");
    const ampm = profile.birthAmPm || (hour >= 12 ? "PM" : "AM");
    return `${hour}:${minute} ${ampm}`;
  };

  // -------- Fetch profile --------
  const fetchUser = async (id) => {
    try {
      const res = await axiosInstance.get(`/matches/view/${id}`);
      setProfile(res.data.profile);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    // Track view
    viewProfileMutation.mutate(userId);

    // Load full profile
    fetchUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // -------- Derived data --------
  const age = useMemo(() => getAge(profile?.dateOfBirth), [profile]);
  const displayName = useMemo(() => {
    if (!profile?.userId) return "Member";
    return `${profile.userId.firstName || ""} ${profile.userId.lastName || ""
      }`.trim();
  }, [profile]);

  const displayPhoto = profile?.profilePhoto || ProfileAvatar;

  const onChat = async () => {
    try {
      await axiosInstance.post("/matches/chat-request", {
        receiverId: profile?.userId?._id,
      });
      alert("Chat Request Sent");
    } catch (err) {
      alert("Chat request failed");
    }
  };

  //send interest
  const handleSendInterest = async (userId) => {
    if (!userId) return;

    const status = interestStatus[userId];
    if (status === "sending" || status === "sent") return;

    setInterestStatus((prev) => ({ ...prev, [userId]: "sending" }));

    try {
      await sendInterestMutation.mutateAsync(userId);

      setTimeout(() => {
        setInterestStatus((prev) => ({ ...prev, [userId]: "sent" }));
      }, 600);

    } catch (err) {
      console.error("Send interest failed:", err);
      setInterestStatus((prev) => ({ ...prev, [userId]: "idle" }));
    }
  };



  if (loading) {
    return (
      <div className="vp-page">
        <div className="vp-container">
          <div className="vp-loading-card">
            <div className="vp-loading-photo shimmer" />
            <div className="vp-loading-lines">
              <div className="shimmer line" />
              <div className="shimmer line short" />
              <div className="shimmer line" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="vp-page">
        <div className="vp-container">
          <h2 className="vp-empty">No profile found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="vp-page">
      <div className="vp-container">
        {/* HEADER CARD */}
        <section className="vp-header-card">
          <div className="vp-header-top">
            <span className="vp-pill">
              Reg. ID:{" "}
              <strong>{profile.userId?.registrationId || "—"}</strong>
            </span>
            <span className="vp-pill soft">
              <FiCalendar className="pill-icon" />
              Last updated on {formatDate(profile.updatedAt || profile.createdAt)}
            </span>
          </div>

          <div className="vp-header-main">
            <div className="vp-photo-wrapper">
              <img
                src={displayPhoto}
                alt={displayName}
                className="vp-photo"
              />
              <div className="vp-photo-ring" />
              <div className="vp-verified-badge">
                <FiShieldCheckIcon />
                <span>Verified</span>
              </div>
            </div>

            <div className="vp-basic">
              <h1 className="vp-name">{displayName}</h1>

              <p className="vp-line primary">
                <FiUser className="vp-line-icon" />
                <span>
                  {age ? `${age} yrs` : "Age N/A"},{" "}
                  {formatHeight(profile.height)}, {profile.maritalStatus || "—"}
                </span>
              </p>

              <p className="vp-line">
                <FiGlobe className="vp-line-icon" />
                <span>
                  {profile.religion || "—"} • {profile.community || "—"} •{" "}
                  {profile.motherTongue || "—"}
                </span>
              </p>

              <p className="vp-line">
                <FiMapPin className="vp-line-icon" />
                <span>
                  {profile.city || "—"}, {profile.state || "—"},{" "}
                  {profile.country || "—"}
                </span>
              </p>
            </div>

            <div className="vp-actions">
              <button className="vp-btn primary" onClick={onChat}>
                <FiMessageCircle />
                <span>Chat Now</span>
              </button>

              <button
                className={`vp-btn ghost ${interestStatus[profile.userId._id]}`}
                onClick={() => handleSendInterest(profile.userId._id)}
              >
                {interestStatus[profile.userId._id] === "sent" ? (
                  <>
                    <FiHeart style={{ color: "red" }} />
                    <span>Interest Sent</span>
                  </>
                ) : interestStatus[profile.userId._id] === "sending" ? (
                  <>
                    <div className="vp-loader"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FiHeart />
                    <span>Send Interest</span>
                  </>
                )}
              </button>


              <button className="vp-icon-only">
                <FiShare2 />
              </button>

              <button className="vp-icon-only danger">
                <FiFlag />
              </button>
            </div>
          </div>

          {profile.shortIntro && (
            <p className="vp-short-intro">
              “{profile.shortIntro}”
            </p>
          )}
        </section>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="vp-layout">
          {/* LEFT COLUMN */}
          <div className="vp-col">
            {/* About Section */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon about">
                  <FiUser />
                </div>
                <div>
                  <h3>About {profile.userId?.firstName || "Member"}</h3>
                  <p className="vp-section-sub">
                    A quick overview of personality & background
                  </p>
                </div>
              </div>

              <p className="vp-section-text">
                {profile.aboutMe ||
                  "This member hasn't added an about section yet."}
              </p>

              <div className="vp-two-col">
                <div className="vp-field">
                  <span className="label">Profile For</span>
                  <span className="value">{profile.profileFor || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Profile Created By</span>
                  <span className="value">
                    {profile.profileCreatedBy || "—"}
                  </span>
                </div>
              </div>
            </section>

            {/* Basic Details */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon">
                  <FiActivity />
                </div>
                <div>
                  <h3>Basic Details</h3>
                  <p className="vp-section-sub">
                    Physical attributes and lifestyle basics
                  </p>
                </div>
              </div>

              <div className="vp-grid">
                <div className="vp-field">
                  <span className="label">Age</span>
                  <span className="value">
                    {age ? `${age} yrs (${formatDate(profile.dateOfBirth)})` : "—"}
                  </span>
                </div>

                <div className="vp-field">
                  <span className="label">Height</span>
                  <span className="value">{formatHeight(profile.height)}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Weight</span>
                  <span className="value">
                    {profile.weight ? `${profile.weight} Kg` : "—"}
                  </span>
                </div>

                <div className="vp-field">
                  <span className="label">Complexion</span>
                  <span className="value">{profile.complexion || "—"}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Body Type</span>
                  <span className="value">{profile.bodyType || "—"}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Blood Group</span>
                  <span className="value">{profile.bloodGroup || "—"}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Health Info</span>
                  <span className="value">
                    {profile.healthInformation || "—"}
                  </span>
                </div>

                <div className="vp-field">
                  <span className="label">Disability</span>
                  <span className="value">
                    {profile.anyDisability === "Yes"
                      ? profile.disabilityDetails || "Yes"
                      : "No"}
                  </span>
                </div>
              </div>
            </section>

            {/* Lifestyle */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon lifestyle">
                  <FiCompass />
                </div>
                <div>
                  <h3>Lifestyle</h3>
                  <p className="vp-section-sub">
                    Daily habits & preferences
                  </p>
                </div>
              </div>

              <div className="vp-grid">
                <div className="vp-field">
                  <span className="label">Diet</span>
                  <span className="value">{profile.diet || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Smoking</span>
                  <span className="value">{profile.smoking || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Drinking</span>
                  <span className="value">{profile.drinking || "—"}</span>
                </div>
              </div>

              <div className="vp-field mt-10">
                <span className="label">Hobbies</span>
                <div className="vp-chip-row">
                  {profile.hobbies && profile.hobbies.length > 0 ? (
                    profile.hobbies.map((h) => (
                      <span key={h} className="vp-chip">
                        {h}
                      </span>
                    ))
                  ) : (
                    <span className="value">Not specified</span>
                  )}
                </div>
              </div>

              <div className="vp-two-col mt-8">
                <div className="vp-field">
                  <span className="label">Favourite Cuisine</span>
                  <span className="value">
                    {profile.favouriteCuisine || "—"}
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Favourite Music</span>
                  <span className="value">
                    {profile.favouriteMusic || "—"}
                  </span>
                </div>
              </div>
            </section>

            {/* Education & Career */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon edu">
                  <FiBriefcase />
                </div>
                <div>
                  <h3>Education & Career</h3>
                  <p className="vp-section-sub">
                    Academics and professional journey
                  </p>
                </div>
              </div>

              <div className="vp-grid">
                <div className="vp-field">
                  <span className="label">Highest Qualification</span>
                  <span className="value">
                    {profile.highestQualification || "—"}
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Course</span>
                  <span className="value">{profile.course || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">College</span>
                  <span className="value">{profile.collegeName || "—"}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Working With</span>
                  <span className="value">{profile.workingWith || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Designation</span>
                  <span className="value">{profile.designation || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Company</span>
                  <span className="value">{profile.companyName || "—"}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Annual Income</span>
                  <span className="value">{profile.annualIncome || "—"}</span>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="vp-col">
            {/* Religion / Astro */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon religion">
                  <FiStar />
                </div>
                <div>
                  <h3>Religion & Astro Details</h3>
                  <p className="vp-section-sub">
                    Community & horoscope information
                  </p>
                </div>
              </div>

              <div className="vp-grid">
                <div className="vp-field">
                  <span className="label">Religion</span>
                  <span className="value">{profile.religion || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Community</span>
                  <span className="value">
                    {profile.community || profile.subCommunity || "—"}
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Sub Caste</span>
                  <span className="value">{profile.subCaste || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Mother Tongue</span>
                  <span className="value">{profile.motherTongue || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Gothra</span>
                  <span className="value">{profile.gothra || "—"}</span>
                </div>

                <div className="vp-field">
                  <span className="label">Rashi</span>
                  <span className="value">{profile.rashi || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Nadi</span>
                  <span className="value">{profile.nadi || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Gan</span>
                  <span className="value">{profile.gan || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Charan</span>
                  <span className="value">{profile.charan || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Manglik</span>
                  <span className="value">{profile.manglik || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Time of Birth</span>
                  <span className="value">
                    {formatTimeOfBirth(profile)}
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Place of Birth</span>
                  <span className="value">
                    {profile.cityOfBirth || profile.countryOfBirth || "—"}
                  </span>
                </div>
              </div>
            </section>

            {/* Family & Location */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon family">
                  <FiHome />
                </div>
                <div>
                  <h3>Family & Location</h3>
                  <p className="vp-section-sub">
                    Family background & where they live
                  </p>
                </div>
              </div>

              <div className="vp-grid">
                <div className="vp-field">
                  <span className="label">Father</span>
                  <span className="value">
                    {profile.fatherName || "—"}{" "}
                    {profile.fatherOccupation
                      ? `(${profile.fatherOccupation})`
                      : ""}
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Mother</span>
                  <span className="value">
                    {profile.motherName || "—"}{" "}
                    {profile.motherOccupation
                      ? `(${profile.motherOccupation})`
                      : ""}
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Family Type</span>
                  <span className="value">{profile.familyType || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Brothers</span>
                  <span className="value">
                    {profile.noOfBrothers || 0} (Married:{" "}
                    {profile.marriedBrothers || 0})
                  </span>
                </div>
                <div className="vp-field">
                  <span className="label">Sisters</span>
                  <span className="value">
                    {profile.noOfSisters || 0} (Married:{" "}
                    {profile.marriedSisters || 0})
                  </span>
                </div>
              </div>

              <div className="vp-divider" />

              <div className="vp-grid">
                <div className="vp-field">
                  <span className="label">Country</span>
                  <span className="value">{profile.country || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">State</span>
                  <span className="value">{profile.state || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">City</span>
                  <span className="value">{profile.city || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Area</span>
                  <span className="value">{profile.area || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Pincode</span>
                  <span className="value">{profile.pincode || "—"}</span>
                </div>
                <div className="vp-field">
                  <span className="label">Residency Status</span>
                  <span className="value">
                    {profile.residencyStatus || "—"}
                  </span>
                </div>

                <div className="vp-field full">
                  <span className="label">Permanent Address</span>
                  <span className="value">
                    {profile.permanentAddress || "—"}
                  </span>
                </div>
                <div className="vp-field full">
                  <span className="label">Residential Address</span>
                  <span className="value">
                    {profile.residentialAddress || "—"}
                  </span>
                </div>
              </div>
            </section>

            {/* Partner Preferences */}
            <section className="vp-section">
              <div className="vp-section-header">
                <div className="vp-section-icon partner">
                  <FiHeart />
                </div>
                <div>
                  <h3>Partner Preferences</h3>
                  <p className="vp-section-sub">
                    What they are looking for in a partner
                  </p>
                </div>
              </div>

              <p className="vp-section-text">
                {profile.partnerExpectation ||
                  "Partner expectations have not been specified yet."}
              </p>

              {/* You can later map specific partner fields once available in API */}
              <div className="vp-premium-box">
                <FaCrown className="premium-icon" />
                <div>
                  <p className="premium-title">See compatibility insights</p>
                  <p className="premium-sub">
                    Upgrade to Premium to view detailed compatibility & match
                    score with this profile.
                  </p>
                </div>
                <button className="vp-btn premium-btn">Upgrade</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small helper component for Verified icon
const FiShieldCheckIcon = () => (
  <span className="vp-verified-icon">
    <FiStar />
  </span>
);

export default ViewProfile;
