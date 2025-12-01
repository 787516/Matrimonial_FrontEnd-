// src/pages/matches/Matches.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./Matches.css";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
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

// Helper: match score
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

    // ✅ Fetch matches from backend
    const { data: feed, isLoading } = useMatchesFeed();
  //  console.log("feed", feed);
    // ✅ Get current user's partner preference (for match score)
    const { data: preference } = useGetPreferences();

    // ✅ Send Interest & View Profile mutations
    const sendInterestMutation = useSendInterest();
    const viewProfileMutation = useViewProfile();

    // Filters
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

    // 🔧 Dynamic filter options from data
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
                        .map((p) => p.community || p.subCaste)
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
                    profilesWithScore.map((p) => p.motherTongue).filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const educationOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore
                        .map((p) => p.highestQualification)
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
                        .map((p) => p.designation || p.workingWith)
                        .filter((x) => !!x)
                )
            ).sort(),
        [profilesWithScore]
    );

    const incomeOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    profilesWithScore.map((p) => p.annualIncome).filter((x) => !!x)
                )
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
            const religionMatch = !f.religion || p.religion === f.religion;

            const casteVal = p.community || p.subCaste || "";
            const casteMatch = !f.caste || casteVal === f.caste;

            const cityMatch = !f.city || p.city === f.city;

            const langMatch =
                !f.language || p.motherTongue === f.language;

            const eduMatch =
                !f.education || p.highestQualification === f.education;

            const profVal = p.designation || p.workingWith || "";
            const professionMatch = !f.profession || profVal === f.profession;

            const incomeMatch =
                !f.income || p.annualIncome === f.income;

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
            setInterestStatus((prev) => ({ ...prev, [userId]: "sent" }));
        } catch (err) {
            console.error("Send interest failed:", err);
            setInterestStatus((prev) => ({ ...prev, [userId]: "idle" }));
        }
    };

    const handleViewProfile = async (userId) => {
        if (!userId) return;
        try {
            // Log view on backend (no need to block on this)
            await viewProfileMutation.mutateAsync(userId);
        } catch (err) {
            console.error("View profile track failed:", err);
        }
        navigate(`/user/details/${userId}`);
    };

    const getProfileImage = (p) => {
        // 1️⃣ Real profile photo from backend
        if (p?.profilePhoto && p.profilePhoto !== null) {
            return p.profilePhoto;
        }

        // 2️⃣ Static fallback avatar
        return AvtarPhoto;
    };

    // ----------------- Render -----------------

    if (isLoading) {
        return <h3 className="text-center mt-5">Loading matches...</h3>;
    }

    return (
        <div className="matches-container">
            <div className="matches-grid">
                {/* LEFT FILTER SIDEBAR */}
                <aside className="filter-box">
                    <h4 className="filter-title">Filter Matches</h4>

                    {/* Religion */}
                    <div className="filter-select">
                        <FiStar size={14} className="filter-icon" />
                        <select
                            name="religion"
                            value={filters.religion}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Religion</option>
                            {religionOptions.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Caste */}
                    <div className="filter-select">
                        <FiUsers size={14} className="filter-icon" />
                        <select
                            name="caste"
                            value={filters.caste}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Caste</option>
                            {casteOptions.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div className="filter-select">
                        <FiMapPin size={14} className="filter-icon" />
                        <select
                            name="city"
                            value={filters.city}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select City</option>
                            {cityOptions.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mother Tongue */}
                    <div className="filter-select">
                        <FiGlobe size={14} className="filter-icon" />
                        <select
                            name="language"
                            value={filters.language}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Language</option>
                            {languageOptions.map((l) => (
                                <option key={l} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Education */}
                    <div className="filter-select">
                        <FiBook size={14} className="filter-icon" />
                        <select
                            name="education"
                            value={filters.education}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Education</option>
                            {educationOptions.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Profession */}
                    <div className="filter-select">
                        <FiBriefcase size={14} className="filter-icon" />
                        <select
                            name="profession"
                            value={filters.profession}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Profession</option>
                            {professionOptions.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Annual Income */}
                    <div className="filter-select">
                        <FiDollarSign size={14} className="filter-icon" />
                        <select
                            name="income"
                            value={filters.income}
                            onChange={handleFilterChange}
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
                        <FaSearch size={14} /> APPLY FILTERS
                    </button>

                    <button className="reset-btn" onClick={resetFilters}>
                        Reset Filters
                    </button>
                </aside>

                {/* RIGHT CARDS */}
                <div className="card-container">
                    <div className="top-row">
                        <h3>Matches Todayyyyy</h3>
                        <span>Showing {filteredProfiles.length} results</span>
                    </div>

                    <div className="cards-grid">
                        {filteredProfiles.map((p) => {
                            const user = p.userId || {};
                            const userId = user._id;
                            const fullName = `${user.firstName || ""} ${user.lastName || ""
                                }`.trim();
                            const age = getAge(p.dateOfBirth);
                            const status = interestStatus[userId] || "idle";

                            // simple label by bucket
                            let bucketLabel = "";
                            if (p.__bucket === "perfect") bucketLabel = "Perfect Match";
                            else if (p.__bucket === "religion")
                                bucketLabel = "Same Religion";
                            else if (p.__bucket === "location")
                                bucketLabel = "Near You";
                            else bucketLabel = "Suggested";

                            return (
                                <div className="profile-card" key={p._id}>
                                    <div className="profile-img-wrapper">
                                        {/* <img
                      src={dummyImg + (p._id?.slice(-2) || "1")}
                      alt={fullName}
                      className="profile-img"
                    /> */}
                                        <img
                                            src={getProfileImage(p)}
                                            alt={p.fullName}
                                            className="profile-img"
                                        />
                                        <span className="match-badge">
                                            {bucketLabel} • {p.matchScore}% match
                                        </span>
                                    </div>

                                    <h5 className="name">{fullName || "Member"}</h5>
                                    <p>
                                        Age: <strong>{age}</strong>
                                    </p>
                                    <p>
                                        City: <strong>{p.city || "-"}</strong>
                                    </p>
                                    <p>
                                        Profession:{" "}
                                        <strong>{p.designation || p.workingWith || "-"}</strong>
                                    </p>
                                    <p>
                                        Income: <strong>{p.annualIncome || "-"}</strong>
                                    </p>

                                    <button
                                        className="btn-main"
                                        onClick={() => handleViewProfile(userId)}
                                    >
                                        View Profile
                                    </button>
                                    
                                    <button
                                        className={`send-btn ${status}`}
                                        onClick={() => handleSendInterest(userId)}
                                        disabled={status === "sending" || status === "sent"}
                                    >
                                        <span className="plane" style={{ fontSize: "14px"  }}>
                                            {status === "sent" ? "✓" : "✈"}
                                        </span>
                                        <span className="text">
                                            {status === "sent"
                                                ? "Interest Sent"
                                                : status === "sending"
                                                    ? "Sending..."
                                                    : "Send Interest"}
                                        </span>
                                    </button>
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
