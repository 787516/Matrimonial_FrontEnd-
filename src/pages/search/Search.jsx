import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./search-styles.css";
import SearchResults from "./SearchResults.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useAllOppositeProfiles } from "../../hooks/SearchHook/useAllOppositeProfiles";
import { useViewProfile } from "../../hooks/Matches/useMatches";

// ----------------------------
// INTERNAL SEARCH HOOK
// ----------------------------
function useSearch(fullProfiles) {
  const [results, setResults] = useState([]);

  const getAge = (dob) => {
    if (!dob) return null;
    const birth = new Date(dob);
    return Math.floor((Date.now() - birth) / (365.25 * 24 * 60 * 60 * 1000));
  };

  const search = async (filters = {}) => {
    if (!fullProfiles || fullProfiles.length === 0) {
      setResults([]);
      return;
    }

    // Map API → card format
   let filtered = fullProfiles.map((p) => {
  // 🌟 Case 1: Dummy profile (NO userId)
  if (!p.userId) {
    return {
      id: p.id,
      name: p.name,
      gender: p.gender,
      dateOfBirth: p.dateOfBirth,
      age: getAge(p.dateOfBirth),
      height: p.height,
      caste: p.caste,
      city: p.city,
      picture: p.picture,
      registrationId: p.registrationId || null,
    };
  }

  // 🌟 Case 2: API profile (LOGGED IN)
  return {
    id: p.userId._id,
    name: `${p.userId.firstName} ${p.userId.lastName}`,
    gender: p.userId.gender,
    dateOfBirth: p.dateOfBirth,
    age: getAge(p.dateOfBirth),
    height: p.height,
    caste: p.community,
    city: p.city,
    picture: p.profilePhoto,
    registrationId: p.userId.registrationId,
  };
});

    // Gender filter
    if (filters.gender)
      filtered = filtered.filter((p) => p.gender === filters.gender);

    // Age filters
    if (filters.minAge)
      filtered = filtered.filter((p) => p.age >= Number(filters.minAge));

    if (filters.maxAge)
      filtered = filtered.filter((p) => p.age <= Number(filters.maxAge));

    // Search text: name, reg ID, city
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.registrationId)?.toLowerCase().includes(q) ||
          p.city?.toLowerCase().includes(q)
      );
    }

    setResults(filtered);
  };

  return { results, search };
}

// -----------------------------
// PARSE URL FILTERS
// -----------------------------
function parseFiltersFromSearch(searchString) {
  const qp = new URLSearchParams(searchString);

  return {
    gender: qp.get("gender") || null,
    minAge: qp.get("minAge") || null,
    maxAge: qp.get("maxAge") || null,
    religion: qp.get("religion") || null,
    caste: qp.get("caste") || null,
    city: qp.get("city") || null,
    search: qp.get("search") || null,
  };
}

// -----------------------------
// DUMMY PROFILES FOR LOGGED OUT USERS
// -----------------------------
function generateDummyProfiles() {
    const castes = ["96 Kuli Maratha", "Brahmin", "Kunbi", "Dhangar", "Mali"];
  const femaleNames = ["Priya", "Sneha", "Sayali", "Riya", "Aishwarya"];
  const maleNames = ["Aditya", "Rahul", "Yash", "Omkar", "Atharva"];
  const lastNames = ["Patil", "Deshmukh", "Pawar", "Jadhav", "More"];
  const cities = ["Pune", "Mumbai", "Kolhapur", "Nashik", "Satara"];

  const arr = [];
  for (let i = 0; i < 20; i++) {
    const female = Math.random() > 0.5;

    const name = female
      ? femaleNames[Math.floor(Math.random() * femaleNames.length)]
      : maleNames[Math.floor(Math.random() * maleNames.length)];

    arr.push({
      id: `guest-${i}`,
      name,
      gender: female ? "female" : "male",
      dateOfBirth: "1998-01-01",
      age: 22 + Math.floor(Math.random() * 8),
      height: 150 + Math.floor(Math.random() * 20),
      caste: castes[Math.floor(Math.random() * castes.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      picture: `https://i.pravatar.cc/150?img=${i + 20}`,
    });
  }
  return arr;
}


// -----------------------------
// MAIN SEARCH PAGE
// -----------------------------
export default function Search() {
  const { isLoggedIn } = useAuthContext();
 // const { data: fullProfiles = [], isLoading: loadingFeed } = useAllOppositeProfiles();


// Logged-in → API data
// Logged-out → dummyProfiles
const dummyProfiles = useMemo(() => generateDummyProfiles(), []);
const { data: apiProfiles = [], isLoading: loadingFeed } = useAllOppositeProfiles();

const fullProfiles = isLoggedIn ? apiProfiles : dummyProfiles;
 

  const location = useLocation();
  const navigate = useNavigate();

  const { results, search } = useSearch(fullProfiles);

  const initialFromUrl = useMemo(() => {
    return parseFiltersFromSearch(location.search || "");
  }, [location.search]);

  const [filters, setFilters] = useState(initialFromUrl);

  // run when: URL changes OR new fullProfiles from API
  useEffect(() => {
  // Avoid infinite loop: only update if filters actually changed
  const parsed = parseFiltersFromSearch(location.search || "");

  const sameFilters =
    JSON.stringify(parsed) === JSON.stringify(filters);

  if (!sameFilters) {
    setFilters(parsed);
    search(parsed);
  }
}, [location.search, fullProfiles]);

useEffect(() => {
  if (fullProfiles.length > 0) {
    search(filters);
  }
}, [fullProfiles]);


  const handleFilter = async (applied) => {
    const merged = { ...filters, ...applied };
    setFilters(merged);

    const qp = new URLSearchParams();
    Object.keys(merged).forEach((k) => merged[k] && qp.set(k, merged[k]));

    navigate(`/search?${qp.toString()}`, { replace: false });
    await search(merged);
  };
//for view profile 
  const viewProfileMutation = useViewProfile();

    const handleViewProfile = async (userId) => {
        if (!userId) return;
        try {
            await viewProfileMutation.mutateAsync(userId);
        } catch (err) {
            console.error("View profile track failed:", err);
        }
        navigate(`/user/details/${userId}`);
    };

  return (
    <div className="sb-search-page">
      <header className="sb-hero">
        <div className="sb-hero-inner">
          <h1>Your Perfect Matches</h1>
          <p>Find a partner who understands your values and respects your family.</p>
        </div>
      </header>

      <div className="sb-search-layout">
        <main className="sb-search-main">
          {(loadingFeed) && <div className="sb-loading">Searching...</div>}

          <SearchResults
            results={results}
            isLoggedIn={isLoggedIn}
            onSearchInput={(text) => handleFilter({ search: text })}
            onViewProfile={handleViewProfile}
          />
        </main>
      </div>
    </div>
  );
}
