import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';
import InputField from '../../components/auth/InputField';
import PasswordField from '../../components/auth/PasswordField';
import Button from '../../components/UI/Button';
import React from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/otp-verify');
    } catch (err) {
      setErrors({ submit: error });
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {errors.submit && <div className="error">{errors.submit}</div>}
        <InputField label="First Name" value={formData.firstName} onChange={handleChange} />
        <InputField label="Last Name" value={formData.lastName} onChange={handleChange} />
        <InputField label="Email" type="email" value={formData.email} onChange={handleChange} />
        <PasswordField label="Password" value={formData.password} onChange={handleChange} />
        <PasswordField label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <Button disabled={loading}>{loading ? 'Loading...' : 'Register'}</Button>
      </form>
    </div>
  );
};

export default Register;
