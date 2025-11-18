import React from 'react'

const PreferenceCard = ({ preferences }) => {
  return (
    <div className="preference-card">
      <h4>Looking For</h4>
      <ul>
        <li>Age: {preferences.ageMin} - {preferences.ageMax}</li>
        <li>Height: {preferences.heightMin} - {preferences.heightMax}</li>
        <li>Religion: {preferences.religion}</li>
        <li>Location: {preferences.location}</li>
      </ul>
    </div>
  );
};

export default PreferenceCard;
