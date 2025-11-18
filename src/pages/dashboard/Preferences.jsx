import { useState } from 'react';
import Button from '../../components/UI/Button';
import React from 'react';
const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    city: '',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to update profile
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
        <Button>Save Changes</Button>
      </form>
    </div>
  );
};

export default EditProfile;
