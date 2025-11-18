import { useState } from 'react';
import React from 'react'

const PasswordField = ({ label, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-field">
      <label>{label}</label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default PasswordField;
