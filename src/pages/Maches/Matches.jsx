// File: src/pages/matches/Matches.jsx

import React, { useEffect, useMemo, useState } from "react";
import "./Matches.css";
import { FaSearch } from "react-icons/fa";
import {
    FiUsers,
    FiMapPin,
    FiGlobe,
    FiBook,
    FiBriefcase,
    FiDollarSign,
    FiStar,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
    useMatchesFeed,
    useSendInterest,
    useViewProfile,
} from "../../hooks/Matches/useMatches";
import { useGetPreferences } from "../../hooks/PreferenceHook/usePreference";

import AvtarPhoto from "../../assets/profileAvtar.jpg";

// Helper: age from DOB
const getAge = (dob) => {
    if (!dob) return "-";
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

// Helper: match score (same as original)
const computeMatchScore = (profile, preference, bucket) => {
    if (!profile) return 0;
    let score = 0;

    // Base by bucket
    if (bucket === "perfect") score += 50;
    else if (bucket === "religion") score += 30;
    else if (bucket === "location") score += 20;
    else score += 10;

    if (!preference) return Math.min(score, 100);

    const eq = (a, b) =>
        a &&
        b &&
        a.toString().trim().toLowerCase() === b.toString().trim().toLowerCase();

    // Age in preferred range
    if (
        profile.dateOfBirth &&
        preference.ageRange?.min &&
        preference.ageRange?.max
    ) {
        const age = getAge(profile.dateOfBirth);
        if (age >= preference.ageRange.min && age <= preference.ageRange.max) {
            score += 15;
        }
    }

    // Height in preferred range
    if (
        profile.height &&
        preference.heightRange?.min &&
        preference.heightRange?.max
    ) {
        if (
            profile.height >= preference.heightRange.min &&
            profile.height <= preference.heightRange.max
        ) {
            score += 10;
        }
    }

    // Religion
    if (preference.religion && eq(profile.religion, preference.religion)) {
        score += 5;
    }

    // Mother tongue
    if (
        preference.motherTongue &&
        eq(profile.motherTongue, preference.motherTongue)
    ) {
        score += 5;
    }

    // City
    if (preference.city && eq(profile.city, preference.city)) {
        score += 5;
    }

    // Education (loose contains)
    if (
        preference.education &&
        profile.highestQualification &&
        profile.highestQualification
            .toLowerCase()
            .includes(preference.education.toLowerCase())
    ) {
        score += 5;
    }

    // Income (loose contains)
    if (
        preference.salaryRange &&
        profile.annualIncome &&
        profile.annualIncome
            .toLowerCase()
            .includes(preference.salaryRange.toLowerCase())
    ) {
        score += 5;
    }

    return Math.min(score, 100);
};

const Matches = () => {
    const navigate = useNavigate();

    // Fetch matches from backend
    const { data: feed, isLoading } = useMatchesFeed();
    const { data: preference } = useGetPreferences();

    // Send Interest & View Profile mutations
    const sendInterestMutation = useSendInterest();
    const viewProfileMutation = useViewProfile();

    // Filters (controlled)
    const [filters, setFilters] = useState({
        religion: "",
        caste: "",
        city: "",
        language: "",
        education: "",
        profession: "",
        income: "",
    });

    // For "Send Interest" button state
    const [interestStatus, setInterestStatus] = useState({}); // userId -> 'idle' | 'sending' | 'sent'

    // Base profiles with bucket + score
    const profilesWithScore = useMemo(() => {
        if (!feed) return [];

        const arr = [];

        const pushBucket = (list, bucket) => {
            if (!Array.isArray(list)) return;
            list.forEach((p) => {
                const matchScore = computeMatchScore(p, preference, bucket);
                arr.push({
                    ...p,
                    __bucket: bucket,
                    matchScore,
                });
            });
        };

        pushBucket(feed.perfectMatches, "perfect");
        pushBucket(feed.religionMatches, "religion");
        pushBucket(feed.locationMatches, "location");
        pushBucket(feed.fallbackMatches, "fallback");

        return arr;
    }, [feed, preference]);

    // Filtered profiles (after Apply Filters)
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    // Initialize filteredProfiles when data loads
    useEffect(() => {
        setFilteredProfiles(profilesWithScore);
    }, [profilesWithScore]);

    // Dynamic filter options from data
    const religionOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore.map((p) => p.religion).filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const casteOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore
                        .map((p) => p.community || p.subCaste || p.caste)
                        .filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const cityOptions = useMemo(
        () =>
            Array.from(
                new Set(profilesWithScore.map((p) => p.city).filter((x) => !!x))
            ).sort(),
        [profilesWithScore]
    );

    const languageOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore.map((p) => p.motherTongue || p.language).filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const educationOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore
                        .map((p) => p.highestQualification || p.education)
                        .filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const professionOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore
                        .map((p) => p.designation || p.workingWith || p.profession)
                        .filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const incomeOptions = useMemo(
        () =>
            Array.from(
                new Set(profilesWithScore.map((p) => p.annualIncome || p.income).filter((x) => !!x))
            ).sort(),
        [profilesWithScore]
    );

    // ----------------- Handlers -----------------

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const f = filters;

        const result = profilesWithScore.filter((p) => {
            const religionMatch = !f.religion || (p.religion && p.religion === f.religion);

            const casteVal = p.community || p.subCaste || p.caste || "";
            const casteMatch = !f.caste || casteVal === f.caste;

            const cityMatch = !f.city || (p.city && p.city === f.city);

            const langMatch = !f.language || ((p.motherTongue || p.language) === f.language);

            const eduMatch = !f.education || ((p.highestQualification || p.education) === f.education);

            const profVal = p.designation || p.workingWith || p.profession || "";
            const professionMatch = !f.profession || profVal === f.profession;

            const incomeMatch = !f.income || ((p.annualIncome || p.income) === f.income);

            return (
                religionMatch &&
                casteMatch &&
                cityMatch &&
                langMatch &&
                eduMatch &&
                professionMatch &&
                incomeMatch
            );
        });

        setFilteredProfiles(result);
    };

    const resetFilters = () => {
        setFilters({
            religion: "",
            caste: "",
            city: "",
            language: "",
            education: "",
            profession: "",
            income: "",
        });
        setFilteredProfiles(profilesWithScore);
    };

    const handleSendInterest = async (userId) => {
  if (!userId) return;
  const status = interestStatus[userId];
  if (status === "sending" || status === "sent") return;

  setInterestStatus((prev) => ({ ...prev, [userId]: "sending" }));

  try {
    await sendInterestMutation.mutateAsync(userId);

    // 🔥 delay to allow animation to run perfectly
    setTimeout(() => {
      setInterestStatus((prev) => ({ ...prev, [userId]: "sent" }));
    }, 600);
    
  } catch (err) {
    console.error("Send interest failed:", err);
    setInterestStatus((prev) => ({ ...prev, [userId]: "idle" }));
  }
};


    const handleViewProfile = async (userId) => {
        if (!userId) return;
        try {
            await viewProfileMutation.mutateAsync(userId);
        } catch (err) {
            console.error("View profile track failed:", err);
        }
        navigate(`/user/details/${userId}`);
    };

    const getProfileImage = (p) => {
        if (p?.profilePhoto && p.profilePhoto !== null) {
            return p.profilePhoto;
        }
        return AvtarPhoto;
    };

    if (isLoading) {
        return <h3 className="text-center mt-5">Loading matches...</h3>;
    }

    return (
        <div className="matches-container container" style={{ paddingTop: 60 }}>
            <div className="row">
                {/* LEFT SIDEBAR */}
                <div className="col-lg-3 mb-4">
                    <aside className="filter-box sticky-top">
                        <div className="filter-title">Filter Matches</div>

                        <label className="filter-label">Religion</label>
                        <div className="filter-select">
                            <FiStar size={18} className="filter-icon" />
                            <select
                                name="religion"
                                value={filters.religion}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select Religion</option>
                                {religionOptions.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="filter-label">Caste</label>
                        <div className="filter-select">
                            <FiUsers size={18} className="filter-icon" />
                            <select
                                name="caste"
                                value={filters.caste}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select Caste</option>
                                {casteOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))} 
                            </select>
                        </div>

                        <label className="filter-label">Location</label>
                        <div className="filter-select">
                            <FiMapPin size={18} className="filter-icon" />
                            <select
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select City</option>
                                {cityOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="filter-label">Mother Tongue</label>
                        <div className="filter-select">
                            <FiGlobe size={18} className="filter-icon" />
                            <select
                                name="language"
                                value={filters.language}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select Language</option>
                                {languageOptions.map((l) => (
                                    <option key={l} value={l}>
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="filter-label">Education</label>
                        <div className="filter-select">
                            <FiBook size={18} className="filter-icon" />
                            <select
                                name="education"
                                value={filters.education}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select Education</option>
                                {educationOptions.map((e) => (
                                    <option key={e} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="filter-label">Profession</label>
                        <div className="filter-select">
                            <FiBriefcase size={18} className="filter-icon" />
                            <select
                                name="profession"
                                value={filters.profession}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select Profession</option>
                                {professionOptions.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="filter-label">Annual Income</label>
                        <div className="filter-select">
                            <FiDollarSign size={18} className="filter-icon" />
                            <select
                                name="income"
                                value={filters.income}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Select Annual Income</option>
                                {incomeOptions.map((i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="apply-btn" onClick={applyFilters}>
                            <FaSearch size={14} /> Apply Filters
                        </button>

                        <button className="reset-btn" onClick={resetFilters}>
                            Reset Filters
                        </button>
                    </aside>
                </div>

                {/* RIGHT CARDS */}
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="title-match">Matches Today</h3>
                        <span>
                            Showing <span>{filteredProfiles.length}</span> results
                        </span>
                    </div>

                    <div className="row cards-grid">
                        {filteredProfiles.map((p) => {
                            const user = p.userId || {};
                            const userId = user._id;
                            const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
                            const age = getAge(p.dateOfBirth);
                            const status = interestStatus[userId] || "idle";

                            let bucketLabel = "Suggested";
                            if (p.__bucket === "perfect") bucketLabel = "Perfect Match";
                            else if (p.__bucket === "religion") bucketLabel = "Same Religion";
                            else if (p.__bucket === "location") bucketLabel = "Near You";

                            return (
                                <div className="col-md-4 mb-4 d-flex" key={p._id}>
                                    <div className="profile-card w-100">
                                        <img
                                            src={getProfileImage(p)}
                                            className="profile-img"
                                            alt={fullName || "Member"}
                                        />

                                        <span className="match-badge">{bucketLabel} • {p.matchScore}% match</span>

                                        <h5 className="fw-semibold name">{fullName || "Member"}</h5>
                                        <p className="mb-1">Age : <strong>{age}</strong></p>
                                        <p className="mb-1">City : <strong>{p.city || "-"}</strong></p>
                                        <p className="mb-1">Profession : <strong>{p.designation || p.workingWith || p.profession || "-"}</strong></p>
                                        <p className="mb-2">Income : <strong>{p.annualIncome || p.income || "-"}</strong></p>

                                        <button className="btn-main" onClick={() => handleViewProfile(userId)}>
                                            View Profile
                                        </button>

                                        <button
                                            className={`send-btn ${status}`}
                                            onClick={() => handleSendInterest(userId)}
                                            // disabled={status === "sending" || status === "sent"}
                                            disabled={status === "sent"}

                                        >
                                            <span className="plane">{status === "sent" ? "✓" : "✈"}</span>
                                            <span className="btn-text">
                                                {status === "sent"
                                                    ? "Interest Sent"
                                                    : status === "sending"
                                                        ? "Sending..."
                                                        : "Send Interest"}
                                            </span>
                                        </button>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Matches;
