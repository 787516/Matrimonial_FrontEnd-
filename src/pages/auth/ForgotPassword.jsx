import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import Button from '../../components/UI/Button';
import React from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to send reset link
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button>Send Reset Link</Button>
        </form>
      ) : (
        <div className="success-message">
          <p>Reset link sent to your email!</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
