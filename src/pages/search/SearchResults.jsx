import React from 'react';
const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <h2>Results</h2>
      {results.map((profile) => (
        <div key={profile.id} className="result-item">
          {profile.name}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
