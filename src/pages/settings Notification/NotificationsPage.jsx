// src/pages/notifications/NotificationsPage.jsx
import React, { useState } from "react";
import "./NotificationsPage.css";
import { FaBell, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import {
  useUnreadCount,
  useMarkAsRead,
  useMarkAllRead,
} from "../../hooks/Notification/useNotifications";

const NotificationsPage = () => {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const limit = 10;

  // 🔔 Unread count (badge)
  const { data: unreadCountData } = useUnreadCount();
  const unreadCount = unreadCountData ?? 0;

  // 📥 All notifications (paginated)
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications-page", { page, limit, unreadOnly }],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications/all?page=1&limit=10&unreadOnly=false", {
        params: {
          page,
          limit,
          unreadOnly: unreadOnly ? "true" : "false",
        },
      });
      return res.data; // { total, unreadCount, notifications, ... }
    },
    keepPreviousData: true,
  });

  const notifications = data?.notifications || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // ✅ Mutations
  const markAsReadMutation = useMarkAsRead();
  const markAllReadMutation = useMarkAllRead();

  const handleToggleUnread = () => {
    setUnreadOnly((prev) => !prev);
    setPage(1);
  };

  const handleMarkAsRead = (n) => {
    if (n.isRead) return;
    markAsReadMutation.mutate(n._id);
  };

  const handleMarkAll = () => {
    if (!total) return;
    markAllReadMutation.mutate();
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString(); // simple & safe
  };

  return (
    <div className="notifications-page-container">
      <div className="notifications-page-card">
        {/* HEADER */}
        <div className="notifications-page-header">
          <div className="notifications-page-title-block">
            <FaBell className="notifications-page-icon" />
            <div>
              <h3>Notifications</h3>
              <p className="notifications-page-sub">
                Interests, chat requests, profile views & more — all in one place.
              </p>
            </div>
          </div>

          <div className="notifications-page-actions">
            <button
              type="button"
              className={`notif-chip ${unreadOnly ? "active" : ""}`}
              onClick={handleToggleUnread}
            >
              Unread Only ({unreadCount})
            </button>

            <button
              type="button"
              className="notif-chip"
              onClick={handleMarkAll}
              disabled={markAllReadMutation.isPending || !total}
            >
              <FaCheckCircle className="me-1" />
              Mark all as read
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="notifications-page-body">
          {isLoading && (
            <div className="notif-page-state">Loading notifications...</div>
          )}

          {isError && (
            <div className="notif-page-state error">
              Failed to load notifications. Please try again.
            </div>
          )}

          {!isLoading && !isError && notifications.length === 0 && (
            <div className="notif-page-state empty">
              <FaBell className="empty-icon" />
              <p>No notifications yet.</p>
              <span>
                Once someone interacts with you, their activity will appear here.
              </span>
            </div>
          )}

          {!isLoading && !isError && notifications.length > 0 && (
            <>
              <ul className="notif-page-list">
                {notifications.map((n) => (
                  <li
                    key={n._id}
                    className={`notif-page-item ${!n.isRead ? "unread" : ""}`}
                    onClick={() => handleMarkAsRead(n)}
                  >
                    {/* Initial avatar */}
                    <div className="notif-page-avatar">
                      {(n.actorUserId?.firstName?.[0] || "U").toUpperCase()}
                    </div>

                    {/* Text block */}
                    <div className="notif-page-content">
                      <div className="notif-page-message">
                        <strong>
                          {n.actorUserId?.firstName} {n.actorUserId?.lastName}
                        </strong>{" "}
                        {n.message}
                      </div>

                      <div className="notif-page-meta">
                        <span className="notif-page-time">
                          {formatTime(n.createdAt)}
                        </span>
                        {!n.isRead && (
                          <span className="notif-page-pill">New</span>
                        )}
                      </div>
                    </div>

                    {/* (Optional) icon on right – we’re not deleting here yet */}
                    <button
                      type="button"
                      className="notif-page-delete"
                      onClick={(e) => e.stopPropagation()}
                      title={n.isRead ? "Notification" : "Tap to mark as read"}
                    >
                      <FaTrashAlt style={{ opacity: 0.15 }} />
                    </button>
                  </li>
                ))}
              </ul>

              {/* PAGINATION */}
              <div className="notif-page-pagination">
                <button
                  type="button"
                  className="page-btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </button>

                <span className="page-info">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  className="page-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
