import React from 'react'

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} />
      <h3>{profile.name}</h3>
      <p>{profile.age}, {profile.city}</p>
    </div>
  );
};

export default ProfileCard;
