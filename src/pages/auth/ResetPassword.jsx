import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PasswordField from '../../components/auth/PasswordField';
import Button from '../../components/UI/Button';
import React from 'react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to reset password
  };

  return (
    <div className="reset-password-page">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <PasswordField label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button>Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
