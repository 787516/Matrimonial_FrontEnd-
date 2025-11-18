 import React from 'react';
 
 const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Profile Views</h3>
          <p>150</p>
        </div>
        <div className="card">
          <h3>Interests Received</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Matches</h3>
          <p>42</p>
        </div>
        <div className="card">
          <h3>Messages</h3>
          <p>18</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
