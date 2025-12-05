import React, { useState } from "react";
import "./search-styles.css";
import ProfileAvtar from "../../assets/profileAvtar.jpg";

// ------------------
// PROFILE CARD
// ------------------
function ProfileCard({ profile, isLoggedIn, onViewProfile }) {
  const getAge = (dob) => {
    if (!dob) return "-";
    const birth = new Date(dob);
    const age = Math.floor((Date.now() - birth) / (365.25 * 24 * 60 * 60 * 1000));
    return age || "-";
  };

  return (
    <div className={`sb-profile-card ${!isLoggedIn ? "sb-blur-card" : ""}`}>
      <div className="sb-img-wrapper">
        <img
          src={profile.picture || ProfileAvtar}
          alt={profile.name}
          className={`sb-profile-img ${!isLoggedIn ? "sb-img-blur" : ""}`}
        />

        <span className="sb-verified">Verified</span>

        {!isLoggedIn && <div className="sb-blur-overlay"></div>}
      </div>

      <div className="sb-card-body">
        <h3>{profile.name}</h3>

        <p className="sb-info">
          {getAge(profile.dateOfBirth)} yrs • Height: {profile.height || "—"}
        </p>

        <p className="sb-caste">{profile.caste || "Maratha"}</p>
        <p className="sb-location">{profile.city || "Pune"}</p>

        {!isLoggedIn ? (
          <button className="sb-login-btn" onClick={() => (window.location.href = "/login")}>
            Login to View Full Profile
          </button>
        ) : (
          <button className="sb-view-btn" onClick={() => onViewProfile(profile.id)}>View Profile</button>
        )}
      </div>
    </div>
  );
}

// ------------------
// RESULTS WRAPPER
// ------------------
export default function SearchResults({ results = [], onSearchInput, isLoggedIn, onViewProfile }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    onSearchInput && onSearchInput(v);
  };

  const clear = () => {
    setQuery("");
    onSearchInput && onSearchInput("");
    document.querySelector(".sb-search-input")?.focus();
  };

  return (
    <>
      <div className="sb-searchbar-wrap">
        <div className="sb-searchbar">
          <svg className="sb-search-icon" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>

          <input
            type="text"
            placeholder="Search by name, ID or city..."
            className="sb-search-input"
            value={query}
            onChange={handleChange}
          />

          {query && <button className="sb-search-clear" onClick={clear}>×</button>}
        </div>
      </div>

      {(!results || results.length === 0) ? (
        <div className="sb-no-results">No profiles found.</div>
      ) : (
        <div className="sb-grid">
          {results.map((p) => (
            <ProfileCard key={p.id} profile={p} isLoggedIn={isLoggedIn} onViewProfile={onViewProfile}  />
          ))}
        </div>
      )}
    </>
  );
}
