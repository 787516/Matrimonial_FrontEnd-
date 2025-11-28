import { useParams } from 'react-router-dom';
import ProfileInfo from '../../components/profile/ProfileInfo';
import GallerySlider from '../../components/profile/GallerySlider';
import Button from '../../components/UI/Button';
import React from 'react';
const MyProfile = () => {
  const { userId } = useParams();

  const profile = {
    id: userId,
    name: 'Sample User',
    age: 28,
    city: 'New York',
    photo: '',
    bio: 'Sample bio',
    education: 'Bachelor',
    occupation: 'Engineer',
    photos: [],
  };

  return (
    <div className="view-profile-page">
      <GallerySlider photos={profile.photos} />
      <ProfileInfo profile={profile} />
      <div className="profile-actions">
        <Button variant="primary">Send Interest</Button>
        <Button variant="secondary">Send Message</Button>
      </div>
    </div>
  );
};

export default MyProfile;
