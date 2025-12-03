import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import AvtarPhoto from "../../assets/Landing Page/profileAvtar.jpg";
import { useUserProfile } from "../../hooks/ProfileHook/useUserDetailHook";
import { useGetGallery, useUploadProfilePhoto } from "../../hooks/GalleryHook/useGalleryHook";
import { useDashboardRequestList } from "../../hooks/Matches/useDashboardRequestList";
import { useDashboardStats } from "../../hooks/Matches/useDashboardStats";

import { useSendInterest } from "../../hooks/Matches/useMatches";
import { useViewProfile } from "../../hooks/Matches/useMatches";
import { useHandleRequestAction } from "../../hooks/Matches/useHandleRequestAction";
import axiosInstance from "../../api/axiosInstance";


import DashboardModal from "./DashboardModal.jsx";

const Dashboard = () => {
  const { authUser } = React.useContext(AuthContext);

  const userProfileId = authUser?.user?._id || null;

  // ✔ ALWAYS CALL HOOKS AT TOP
  const { data: profile, isLoading } = useUserProfile(userProfileId);

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  //Action buttons
  const handleRequestAction = useHandleRequestAction();
  const sendInterest = useSendInterest();
  const viewProfile = useViewProfile();

  const onAccept = (requestId) => {
    handleRequestAction.mutate({ requestId, action: "Accepted" });
  };

  const onReject = (requestId) => {
    handleRequestAction.mutate({ requestId, action: "Rejected" });
  };

  const onViewProfile = (userId) => {
    viewProfile.mutate(userId);
  };

  const onSendInterest = (userId) => {
    sendInterest.mutate(userId);
  };

  const onChat = async (receiverId) => {
    try {
      await axiosInstance.post("/matches/chat-request", { receiverId });
      alert("Chat Request Sent");
    } catch (err) {
      alert("Chat request failed");
    }
  };


  // ✔ States (must be before ANY return)
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showMatches, setShowMatches] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalRows, setModalRows] = useState([]);

  const [selectedParams, setSelectedParams] = useState({ type: "", status: "" });

  const { data: requestData, isLoading: requestLoading } =
    useDashboardRequestList(selectedParams.type, selectedParams.status, modalOpen);

  const openModal = (stat) => {
    setModalTitle(stat.title);
    setSelectedParams({ type: stat.type, status: stat.status });

    setModalLoading(true); // IMPORTANT
    setModalOpen(true);
  };

  useEffect(() => {
    if (!requestLoading && requestData) {
      setModalRows(requestData.users);
      setModalLoading(false); // IMPORTANT
    }
  }, [requestData, requestLoading]);




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
      id: "receivedAccepted",
      title: "Requests Received (Accepted)",
      helper: "People who accepted your request",
      value: stats?.received?.accepted || 0,
      type: "received",
      status: "Accepted",
    },
    {
      id: "receivedPending",
      title: "Requests Pending",
      helper: "Awaiting your response",
      value: stats?.received?.pending || 0,
      type: "received",
      status: "Pending",
    },
    {
      id: "receivedRejected",
      title: "Requests Declined",
      helper: "Profiles you declined",
      value: stats?.received?.rejected || 0,
      type: "received",
      status: "Rejected",
    },
    {
      id: "sentAccepted",
      title: "Requests Accepted By Others",
      helper: "They accepted your request",
      value: stats?.sent?.acceptedByOthers || 0,
      type: "sent",
      status: "Accepted",
    },
    {
      id: "sentPending",
      title: "Requests You Sent (Pending)",
      helper: "They haven't replied yet",
      value: stats?.sent?.pending || 0,
      type: "sent",
      status: "Pending",
    },
    {
      id: "sentRejected",
      title: "Requests Declined By Others",
      helper: "They rejected your request",
      value: stats?.sent?.declinedByOthers || 0,
      type: "sent",
      status: "Rejected",
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

  const demoProfiles = [
    { img: "https://i.pravatar.cc/120?img=1", reg: "SNB123", name: "Sayali", age: 26, city: "Pune", status: "Accepted" },
    { img: "https://i.pravatar.cc/120?img=2", reg: "SNB456", name: "Priya", age: 29, city: "Mumbai", status: "Pending" },
    { img: "https://i.pravatar.cc/120?img=3", reg: "SNB789", name: "Aarti", age: 24, city: "Nashik", status: "Declined" }
  ];

  // const openModal = (title) => {
  //   setModalTitle(title);
  //   setModalLoading(true);
  //   setModalOpen(true);

  //   setTimeout(() => {
  //     setModalRows(demoProfiles);
  //     setModalLoading(false);
  //   }, 1500);
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
            <div className="card profile-card-dashboard p-4">
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
                  className="btnEdit  btn-outline-primary btn-sm btn-edit-photo"
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
                    {/* <div className="stat-box p-3"> */}
                    <div className="stat-box p-3" onClick={() => openModal(stat)} style={{ cursor: "pointer" }}>

                      <div className="d-flex justify-content-between align-items-start">
                        <span className="stat-title">{stat.title}</span>
                        <h4 className="mb-0 stat-value">{stat.value}</h4>
                      </div>
                      <p className="stat-helper mt-1 mb-0 text-start">{stat.helper}</p>
                      {stat.hasLink && (
                        <a
                          href="#"
                          className="stat-link"
                          // onClick={handleExploreMatchesClick}
                          onClick={() => openModal(stat)}

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
      {/* <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        loading={modalLoading}
        rows={modalRows}
      /> */}
      <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        loading={modalLoading}
        rows={modalRows}
        onAccept={onAccept}
        onReject={onReject}
        onViewProfile={onViewProfile}
        onSendInterest={onSendInterest}
        onChat={onChat}
      />


    </>
  );
};

export default Dashboard;
