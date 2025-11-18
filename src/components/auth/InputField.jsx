import React from 'react'

const InputField = ({ label, type = 'text', value, onChange, error }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputField;
