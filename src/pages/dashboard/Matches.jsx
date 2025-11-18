import { useState, useEffect } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import React from 'react';
const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch matches
  }, []);

  return (
    <div className="matches-page">
      <h1>Matches</h1>
      <div className="matches-grid">
        {matches.map((match) => (
          <ProfileCard key={match.id} profile={match} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
