import React from "react";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import ChatRequestList from "./ChatRequestList.jsx";

const Sidebar = () => {

  const [activeTab, setActiveTab] = useState("primary");

  return (
    <>
      <style>{`
        /* FULL HEIGHT, WHITE PANEL, THIN RIGHT BORDER */
        .sb-wrapper {
          width: 320px;
          min-width: 280px;
          height: 100%;
          min-height: 0;                /* allow flex parent to control height */
          background: #ffffff;
          border-right: 1px solid #e5e7eb; /* thin divider like design */
          display: flex;
          flex-direction: column;
        }

        /* TOP TITLE / TABS SECTION */
        .sb-header {
       
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          flex-shrink: 0;
        }

        .sb-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #111827;
          text-align: center;
          margin-bottom: 6px;
        }

        .sb-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
          text-align: center;
          margin-bottom: 12px;
        }

        /* PRIMARY / REQUESTS PILLS – like design */
        .sb-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .sb-tab-pill {
          padding: 6px 20px;
          border-radius: 999px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          font-size: 0.8rem;
          color: #374151;
          cursor: pointer;
          white-space: nowrap;
        }

        .sb-tab-pill.active {
          border-color: #111827;
          box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.08);
          font-weight: 600;
        }

        .sb-header-divider {
          height: 1px;
          background: #e5e7eb;
          margin-top: 8px;
        }

        /* ============ SEARCH ROW (ATTRACTIVE) ============ */
        .sb-search {
          padding: 12px 16px 10px;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          position: relative;
          flex-shrink: 0;
        }

        .sb-search::before {
          content: "🔍";
          position: absolute;
          left: 26px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #9ca3af;
          pointer-events: none;
        }

        .sb-search input[type="text"],
        .sb-search input {
          width: 100%;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #f3f4f6;
          padding: 8px 14px 8px 34px; /* space for icon */
          font-size: 0.9rem;
          color: #111827;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .sb-search input::placeholder {
          color: #9ca3af;
        }

        .sb-search input:focus {
          background: #ffffff;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
        }

        /* CONVERSATION LIST – scrollable */
        .sb-list {
          flex: 1;
          min-height: 0;               /* important for flex scroll */
          overflow-y: auto;
          padding: 8px 10px 8px;
          background: #ffffff;
        }

        .sb-list > * {
          margin-bottom: 6px;
        }

        /* LOGOUT FOOTER */
        .sb-footer {
          padding: 10px 14px;
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          flex-shrink: 0;
        }

        /* ----------- RESPONSIVE: TABLET ----------- */
        @media (max-width: 992px) {
          .sb-wrapper {
            width: 280px;
          }
        }

        /* ----------- RESPONSIVE: MOBILE ----------- */
        @media (max-width: 768px) {
          .sb-wrapper {
            width: 100%;           /* full width on mobile */
            min-width: 0;
            height: 100%;
            border-right: none;    /* no vertical divider on mobile */
            border-bottom: 1px solid #e5e7eb;
          }

          .sb-header {
        
            padding-top:2px;
            padding-bottom:4px;
          }

          .sb-title {
            font-size: 1.1rem;
            
          }

          .sb-subtitle {
            font-size: 0.8rem;
          }

          .sb-tabs {
            gap: 6px;
          }

          .sb-tab-pill {
            padding: 5px 14px;
            font-size: 0.75rem;
          }

          .sb-search {
            padding: 10px 12px 8px;
          }

          .sb-search::before {
            left: 20px;
          }

          .sb-search input[type="text"],
          .sb-search input {
            padding: 7px 12px 7px 30px;
            font-size: 0.85rem;
          }
        }

        /* EXTRA SMALL SCREENS */
        @media (max-width: 480px) {
          .sb-title {
            font-size: 1rem;
          }
          .sb-subtitle {
            font-size: 0.75rem;
          }
          .sb-tab-pill {
            flex: 1;
            text-align: center;
          }
        }
          /* Tabs Wrapper */
.sb-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* Default Tab */
.sb-tab-pill {

  border-radius: 30px;
  border: 1.8px solid #ddd;
  background: #fff;
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* Hover */
.sb-tab-pill:hover {
  border-color: #D31027;
  color: #D31027;
}

/* 🔥 Active Tab */
.sb-tab-pill.active {
  background: linear-gradient(135deg, #D31027, #ff3366);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(211, 16, 39, 0.35);
  transform: translateY(-1px);
}

      `}</style>

      <div className="sb-wrapper">
        {/* Messages / Conversations / Pills */}
        <div className="sb-header">
          <div className="sb-title">Messages</div>
         

          <div className="sb-tabs">
            <button
              className={`sb-tab-pill ${activeTab === "primary" ? "active" : ""}`}
              onClick={() => setActiveTab("primary")}
            >
              Primary
            </button>

            <button
              className={`sb-tab-pill ${activeTab === "requests" ? "active" : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </button>
          </div>


          <div className="sb-header-divider" />
        </div>

        {/* Search bar */}
        <div className="sb-search">
          <SearchInput />
        </div>

        {/* Conversation list */}
        <div className="sb-list">
          {activeTab === "primary" && <Conversations />}
          {activeTab === "requests" && <ChatRequestList />}
        </div>


        {/* Logout button */}
        <div className="sb-footer">
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
