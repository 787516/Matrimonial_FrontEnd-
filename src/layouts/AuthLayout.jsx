import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <Navbar />
      <main className="auth-main">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
