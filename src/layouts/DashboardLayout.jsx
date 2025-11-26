import Navbar from '../components/common/Navbar';
import SubNavbar from '../components/common/SubNavbar';
import Footer from '../components/common/Footer';
import React from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: "60px" }}>

        <SubNavbar />
        <main className="dashboard-main">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
