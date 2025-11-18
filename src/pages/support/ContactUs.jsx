import { useState } from 'react';
import Button from '../../components/UI/Button';
import React from 'react';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to send contact form
  };

  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
        <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
        <Button>Send</Button>
      </form>
    </div>
  );
};

export default ContactUs;
