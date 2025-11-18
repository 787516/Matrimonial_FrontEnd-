import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import InputField from '../../components/auth/InputField';
import PasswordField from '../../components/auth/PasswordField';
import Button from '../../components/UI/Button';
import React from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: error });
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errors.submit && <div className="error">{errors.submit}</div>}
        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
      </form>
    </div>
  );
};

export default Login;
