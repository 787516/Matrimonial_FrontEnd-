import { useState } from 'react';
import useSearch from '../../hooks/useSearch';
import ProfileCard from '../../components/profile/ProfileCard';
import React from 'react';
const Search = () => {
  const [filters, setFilters] = useState({});
  const { results, loading, search } = useSearch();

  const handleSearch = async () => {
    await search(filters);
  };

  return (
    <div className="search-page">
      <h1>Search Profiles</h1>
      <div className="search-filters">
        {/* Filter UI */}
      </div>
      {loading && <p>Loading...</p>}
      <div className="search-results">
        {results.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Search;
