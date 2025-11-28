import { NavLink } from "react-router-dom";
import "./SubNavbar.css";
import React from "react";

const SubNavbar = () => {
  return (
    <nav className="dashboard-subnav">
      <ul>
        <li><NavLink to="/dashboard" end>Dashboard</NavLink></li>
        <li><NavLink to="/partner-preferences">Partner Preference</NavLink></li>
        <li><NavLink to="/GalleryUpload">My Photos</NavLink></li>
        <li><NavLink to="/profile/appearance">My Profile</NavLink></li>
        <li><NavLink to="/inbox">Inbox</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </nav>
  );
};

export default SubNavbar;

// import { Link } from 'react-router-dom';
// import React from 'react'

// const SubNavbar = () => {
//   return (
//     <aside className="sidebar mt-10">
//       <div className="sidebar-menu">
//         <Link to="/dashboard" className="sidebar-item text-222rem">📊 Dashboard</Link>
//         <Link to="/partner-preferences" className="sidebar-item">🎯 Partner Preferences</Link>
//         <Link to ="/GalleryUpload" className="sidebar-item">📸 My Photos</Link>
//         <Link to="/chat" className="sidebar-item">💬 Chat</Link>
//         <Link to="/profile" className="sidebar-item">👤My Profile</Link>
//         <Link to="/settings" className="sidebar-item">⚙️ Settings</Link>
//       </div>
//     </aside>
//   );
// };

// export default SubNavbar;
