import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import AvtarPhoto from "../../assets/Landing Page/profileAvtar.jpg";
import { useUserProfile } from "../../hooks/ProfileHook/useUserDetailHook";
import { useGetGallery, useUploadProfilePhoto } from "../../hooks/GalleryHook/useGalleryHook";

const Dashboard = () => {
  const { authUser } = React.useContext(AuthContext);

  const userProfileId = authUser?.user?._id || null;

  // ✔ ALWAYS CALL HOOKS AT TOP
  const { data: profile, isLoading } = useUserProfile(userProfileId);

  // ✔ States (must be before ANY return)
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showMatches, setShowMatches] = useState(false);
  const photoInputRef = useRef(null);

 const uploadProfilePhoto = useUploadProfilePhoto();
const { data: gallery } = useGetGallery(userProfileId);

const profilePhotoFromGallery = gallery?.find((p) => p.isProfilePhoto) || null;
const finalProfilePhoto = profilePhotoFromGallery?.imageUrl || AvtarPhoto;


  // ✔ Safe fallback: if profile is loaded use that; else fallback to authUser
  // const profilePhotoFromGallery = authUser?.gallery?.find(
  //   (item) => item.isProfilePhoto === true
  // );
  // const finalProfilePhoto = profilePhotoFromGallery?.imageUrl || AvtarPhoto;

  // ✔ Take profileCompleted from fetched profile
  const profileCompleted = profile?.profileCompleted || 0;

  // ✔ Animate progress bar
  useEffect(() => {
    let width = 0;
    const interval = setInterval(() => {
      width += 1;
      if (width >= profileCompleted) {
        width = profileCompleted;
        clearInterval(interval);
      }
      setProgress(width);
    }, 15);

    return () => clearInterval(interval);
  }, [profileCompleted]);

  // ✔ Toast hide logic
  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 2200);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleEditPhotoClick = () => {
    photoInputRef.current?.click();
  };

const handlePhotoChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  uploadProfilePhoto.mutate(file);

  setShowToast(true);
};


  const handleToggleMatches = () => {
    setShowMatches((prev) => !prev);
  };

  const handleExploreMatchesClick = (e) => {
    e.preventDefault();
    alert("Open Matches page (replace with your React route).");
  };
  // ---------------------------
  // ✔ ALL RETURNS AFTER HOOKS
  // ---------------------------

  if (!userProfileId) {
    return <h3 className="text-center mt-4">Please login first.</h3>;
  }

  if (isLoading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (!profile) {
    return (
      <h3 className="text-center mt-5">
        No profile found. Please complete your profile.
      </h3>
    );
  }

  const statsData = [
    {
      id: "accepted",
      title: "Requests Accepted",
      helper: "Profiles you accepted",
      value: 12,
      hasLink: true,
    },
    {
      id: "pending",
      title: "Requests Pending",
      helper: "Awaiting your response",
      value: 3,
      hasLink: false,
    },
    {
      id: "declined",
      title: "Requests Declined",
      helper: "Profiles you declined",
      value: 1,
      hasLink: false,
    },
    {
      id: "received",
      title: "Requests Received (Accepted)",
      helper: "They accepted your request",
      value: 7,
      hasLink: true,
    },
    {
      id: "chats",
      title: "Chats Started",
      helper: "Chats you initiated",
      value: 4,
      hasLink: false,
    },
    {
      id: "interactions",
      title: "Total Interactions",
      helper: "Total of all requests & chats",
      value: 27,
      hasLink: false,
    },
  ];

  // Matches data (same as original script)
  const matchesData = [
    {
      name: "Sayali S",
      age: 26,
      height: "5'1",
      language: "Marathi",
      location: "Navi Mumbai",
      occupation: "Not Working",
      img: "https://i.pravatar.cc/120?img=5",
    },
    {
      name: "Priya K",
      age: 28,
      height: "5'4",
      language: "Hindi",
      location: "Pune",
      occupation: "Software Engineer",
      img: "https://i.pravatar.cc/120?img=6",
    },
    {
      name: "Anjali R",
      age: 25,
      height: "5'3",
      language: "Gujarati",
      location: "Ahmedabad",
      occupation: "Teacher",
      img: "https://i.pravatar.cc/120?img=7",
    },
    {
      name: "Kavya L",
      age: 24,
      height: "5'0",
      language: "Telugu",
      location: "Hyderabad",
      occupation: "Student",
      img: "https://i.pravatar.cc/120?img=8",
    },
  ];

  // const [showMatches, setShowMatches] = useState(false);

  // Progress bar smooth animation (like original)
  // useEffect(() => {
  //   let width = 0;
  //   const interval = setInterval(() => {
  //     width += 1;
  //     if (width >= targetProgress) {
  //       width = targetProgress;
  //       clearInterval(interval);
  //     }
  //     setProgress(width);
  //   }, 15);
  //   return () => clearInterval(interval);
  // }, []);

  // Toast hide timer
  // useEffect(() => {
  //   if (!showToast) return;
  //   const t = setTimeout(() => setShowToast(false), 2200);
  //   return () => clearTimeout(t);
  // }, [showToast]);

  // const handleEditPhotoClick = () => {
  //   if (photoInputRef.current) {
  //     photoInputRef.current.click();
  //   }
  // };

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setProfilePhoto(url);
  //     setShowToast(true);
  //   }
  // };

  // const handleExploreMatchesClick = (e) => {
  //   e.preventDefault();
  //   alert("Open Matches page (replace with your React route).");
  // };

  // const handleToggleMatches = () => {
  //   setShowMatches((prev) => !prev);
  // };

  return (
    <>
      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="toast-overlay">
          <div className="toast-message show">
            <i className="fa-solid fa-circle-check"></i>
            <span>Profile photo updated successfully!</span>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTENT */}
      <main className="dashboard">
        <div className="row gx-4">
          {/* LEFT SIDEBAR */}
          <aside className="col-lg-3 mb-4">
            <div className="card profile-card p-4">
              <div className="text-center">
                <div className="profile-photo-wrapper mb-3">
                  <img
                    src={finalProfilePhoto}
                    alt="profile"
                    width="110"
                    height="110"
                    className="rounded-circle"
                  />

                  <div className="profile-photo-status">
                    <span className="dot" />
                    <span>Online</span>
                  </div>
                </div>

                <h5 className="profile-name mb-0">
                  {authUser?.user?.firstName || "User"}{" "}
                  {authUser?.user?.lastName || ""}
                </h5>

                <small className="reg-id d-block mb-2">
                  Registration ID : {authUser?.user?.registrationId || "*****"}{" "}
                </small>

                <button
                  className="btn  btn-outline-primary btn-sm btn-edit-photo"
                  type="button"
                  onClick={handleEditPhotoClick}
                >
                  Edit Profile Photo
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </div>

              <hr className="my-3" />

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="account-label">Account Type</span>
                  <a href="#" className="upgrade-link">
                    Upgrade
                  </a>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <small className="account-type">Free Membership</small>
                </div>
              </div>

              <div>
                <span className="profile-progress-label">
                  Profile Completed
                </span>

                <div className="progress mt-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="progress-meta">
                    Add photos, preferences
                  </small>
                  <small className="progress-percent">
                    {progress}% Completed
                  </small>
                </div>
              </div>


              <p className="profile-tip">
                (Add photos, preferences, complete your profile to increase
                visibility)
              </p>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <section className="col-lg-9">
            {/* Activity Summary */}
            <div className="activity-summary mb-4">
              <h5 className="mb-3 text-black justify-content-start text-start">Your Activity Summary :</h5>
              <div className="row g-3">
                {statsData.map((stat) => (
                  <div className="col-md-4" key={stat.id}>
                    <div className="stat-box p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <span className="stat-title">{stat.title}</span>
                        <h4 className="mb-0 stat-value">{stat.value}</h4>
                      </div>
                      <p className="stat-helper mt-1 mb-0 text-start">{stat.helper}</p>
                      {stat.hasLink && (
                        <a
                          href="#"
                          className="stat-link"
                          onClick={handleExploreMatchesClick}
                        >
                          Explore Matches
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matches Header */}
            <div className="d-flex align-items-center justify-content-between mb-3 matches-header">
              <h5 className="mb-0 text-black">
                Your Matches
                <span className="badge matches-count-badge ms-2">
                  {matchesData.length}
                </span>
              </h5>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm btn-view-all"
                onClick={handleToggleMatches}
              >
                {showMatches ? "Hide" : "View All"}
              </button>
            </div>

            {/* Matches Grid */}
            {showMatches && (
              <div className="row g-3" id="matchesGrid">
                {matchesData.map((match, idx) => (
                  <div className="col-12 col-md-6 col-lg-3" key={idx}>
                    <div className="card match-card p-3 text-center h-100">
                      <img
                        src={match.img}
                        alt={match.name}
                        className="rounded-circle mb-3"
                        width="90"
                        height="90"
                      />
                      <h6 className="mb-1">{match.name}</h6>
                      <small className="text-muted d-block">
                        {match.age}yrs, {match.height}, {match.language},{" "}
                        {match.location}
                      </small>
                      <small className="text-muted d-block">
                        {match.occupation}
                      </small>
                      <div className="mt-3 d-flex justify-content-center gap-2">
                        <button className="btn btn-outline-primary btn-sm">
                          View
                        </button>
                        <button className="btn btn-danger btn-sm">
                          Shortlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
