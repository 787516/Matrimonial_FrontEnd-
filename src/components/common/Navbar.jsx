import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext.jsx"; // <-- must exist

import {
  useFetchNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllRead,
} from "../../hooks/Notification/useNotifications";
// import { formatDistanceToNow } from "date-fns"; // nice time format

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useContext(AuthContext);

  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔔 Notification hooks
  const { data: notificationsData, isLoading } = useFetchNotifications();
  const { data: unreadCount = 0 } = useUnreadCount();
  const markAsReadMutation = useMarkAsRead();
  const markAllReadMutation = useMarkAllRead();

  const notifications = notificationsData?.notifications || [];

  const handleMarkAsRead = (id) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllRead = () => {
    markAllReadMutation.mutate();
  };

  // Extract user details
  const firstName = authUser?.user?.firstName || "";
  const lastName = authUser?.user?.lastName || "";
  const email = authUser?.user?.email || "";
  const profilePhoto = authUser?.user?.profilePhoto || null;

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-navbar justify-content-center">
      <div className="navbarDiv d-flex align-items-center justify-content-between">
        {/* LEFT LOGO */}
        <Link className="navbar-brand" to="/">SnehaBandh.</Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto align-items-center gap-lg-3 gap-3">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

            {/* About us dropdown */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                About Us
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/terms">Terms & Conditions</Link></li>
                <li><Link className="dropdown-item" to="/privacy">Privacy Policy</Link></li>
                <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/disclaimer">Disclaimer</Link></li>
                <li><Link className="dropdown-item" to="/report-misuse">Report Misuse</Link></li>
                <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
              </ul>
            </li> */}
             <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>

            <li className="nav-item"><Link className="nav-link" to="/membership">Membership Plan</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/matches">Your Matches</Link></li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="right-nav d-flex align-items-center gap-2 ms-auto">

            {/* Notification Bell */}
            <div className="notif-container position-relative d-none d-lg-block">

              {/* BELL ICON */}
              <div className="notif-bell-wrapper" onClick={() => setNotifOpen(!notifOpen)}>
                <FaBell className="notif-bell" />
                {unreadCount > 0 && <span className="notif-dot">{unreadCount}</span>}
              </div>

              {/* DROPDOWN */}
              <div className={`notif-dropdown ${notifOpen ? "show" : ""}`}>
                <div className="notif-header">
                  <span>Notifications</span>
                  <button className="mark-all-btn" onClick={handleMarkAllRead}>
                    Mark all as read
                  </button>
                </div>

                {/* LOADING */}
                {isLoading && (
                  <div className="notif-loading">Loading...</div>
                )}

                {/* EMPTY */}
                {!isLoading && notifications.length === 0 && (
                  <div className="notif-empty">No notifications yet</div>
                )}

                {/* LIST */}
                <div className="notif-list">
                  {notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`notif-item ${!n.isRead ? "unread" : ""}`}
                      onClick={() => handleMarkAsRead(n._id)}
                    >
                      <div className="notif-text">
                        <strong>
                          {n.actorUserId?.firstName} {n.actorUserId?.lastName}
                        </strong>{" "}
                        {n.message}
                        <div className="notif-time">
                          {/* You can enable this if you import date-fns */}
                          {/* {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })} */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="notif-footer text-center">
                  <Link to="/notifications" className="view-all-btn">
                    View All Notifications →
                  </Link>
                </div>
              </div>
            </div>

            {/* IF USER LOGGED IN → SHOW PROFILE DROPDOWN */}
            {authUser ? (
              <div className="user-menu-container position-relative">
                <button
                  className="profile-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="user" className="nav-profile-img" />
                  ) : (
                    <div className="nav-profile-fallback">{initials}</div>
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {menuOpen && (
                  <div className="user-dropdown shadow-lg">
                    <div className="user-info-section">
                      {profilePhoto ? (
                        <img src={profilePhoto} className="user-info-img" />
                      ) : (
                        <div className="user-info-fallback">{initials}</div>
                      )}

                      <div>
                        <p className="user-info-name">{firstName} {lastName}</p>
                        <p className="user-info-email">{email}</p>
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      className="dropdown-item-custom"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaUser className="me-2" /> Profile Dashboard
                    </Link>

                    <hr className="dropdown-divider mt-1 mb-1" />

                    <button
                      className="dropdown-item-custom logout-btn"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // NOT LOGGED IN → SHOW LOGIN/REGISTER
              <div className="auth-buttons d-flex gap-2">
                <Link to="/login"><button className="btn-gradient">Log In</button></Link>
                <Link to="/register"><button className="btn-gradient">Register</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
