import React from 'react'

const ProfileInfo = ({ profile }) => {
  return (
    <div className="profile-info">
      <div className="info-section">
        <h4>About</h4>
        <p>{profile.bio}</p>
      </div>
      <div className="info-section">
        <h4>Education</h4>
        <p>{profile.education}</p>
      </div>
      <div className="info-section">
        <h4>Occupation</h4>
        <p>{profile.occupation}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
