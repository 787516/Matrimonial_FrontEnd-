// src/components/profile/ProfileSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaRegIdCard,
  FaBaby,
  FaPrayingHands,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaLeaf,
} from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import "./ProfileSidebar.css";

const ProfileSidebar = () => {
  const menuItems = [
    {
      to: "/profile/appearance",
      label: "Profile Appearance",
      icon: <FaUserCircle />,
    },
    {
      to: "/profile/about-me",
      label: "About Me",
      icon: <BiUser />,
    },
    {
      to: "/profile/edit-personal",
      label: "Edit Personal Profile",
      icon: <FaRegIdCard />,
    },
    {
      to: "/profile/Horoscope-details",
      label: "Horoscope",
      icon: <FaBaby />,
    },
    {
      to: "/profile/religious-background",
      label: "Religious Background",
      icon: <FaPrayingHands />,
    },
    {
      to: "/profile/education-career",
      label: "Education & Career",
      icon: <FaGraduationCap />,
    },
    {
      to: "/profile/location",
      label: "Location",
      icon: <FaMapMarkerAlt />,
    },
    {
      to: "/profile/lifestyle",
      label: "Life Style",
      icon: <FaLeaf />,
    },
  ];

  return (
    <aside className="mp-sidebar">
      <h3 className="mp-sidebar-title">Manage Your Profile</h3>

      <nav className="mp-sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "mp-sidebar-item" + (isActive ? " active" : "")
            }
          >
            <span className="mp-sidebar-icon">{item.icon}</span>
            <span className="mp-sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
