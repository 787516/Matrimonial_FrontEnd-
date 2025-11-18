import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import React from 'react'

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-main">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
