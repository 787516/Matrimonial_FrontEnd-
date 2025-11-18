import { Link } from 'react-router-dom';
import React from 'react'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-item">📊 Dashboard</Link>
        <Link to="/search" className="sidebar-item">🔍 Search</Link>
        <Link to="/matches" className="sidebar-item">❤️ Matches</Link>
        <Link to="/chat" className="sidebar-item">💬 Chat</Link>
        <Link to="/profile" className="sidebar-item">👤 Profile</Link>
        <Link to="/plans" className="sidebar-item">💎 Plans</Link>
        <Link to="/settings" className="sidebar-item">⚙️ Settings</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
