import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import startChattingImage from "../../../assets/startChatting.png";
import { MdOutlineChat } from "react-icons/md";
import { HiOutlineBan } from "react-icons/hi";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  if (!selectedConversation) return <NoChatSelected />;

  return (
    <>
      <style>{`
        .mc-root {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          width: 100%;
          background: #ffffff;
        }

        /* ---------------- HEADER ---------------- */
        .mc-header {
          padding: 16px 20px 12px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          flex-shrink: 0;
        }

        .mc-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: nowrap;
        }

        .mc-user-block {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .mc-avatar {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .mc-online-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #22c55e;
          border: 2px solid #ffffff;
          position: absolute;
          bottom: -1px;
          right: -1px;
        }

        .mc-name {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 2px;
          white-space: nowrap;
        }

        .mc-status {
          font-size: 0.8rem;
          color: #22c55e;
        }

        .mc-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .mc-btn {
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #111827;
          white-space: nowrap;
        }

        .mc-btn-danger {
          border-color: #f04438;
          background: #f04438;
          color: #ffffff;
        }

        /* ---------------- BODY (MESSAGES) ---------------- */
        .mc-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto !important;
          padding: 16px 20px;

          /* your bg (keep as you like) */
          background-image: url("assets\\Gemini_Generated_Image_e9yarbe9yarbe9ya.png");
          background-size: cover;
          background-repeat: repeat;
          background-position: center;

          position: relative;

          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        .mc-body::-webkit-scrollbar {
          width: 0 !important;
        }

        /* ---------------- FOOTER ---------------- */
        .mc-footer {
          padding: 10px 20px 14px;
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          flex-shrink: 0;
        }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 992px) {
          .mc-header {
            padding: 14px 14px 10px;
          }
        }

        @media (max-width: 768px) {
          .mc-header-row {
            flex-wrap: wrap;
            gap: 10px;
          }
          .mc-header-actions {
            width: 100%;
            justify-content: flex-end;
            gap: 6px;
          }
        }
      `}</style>

      <div className="mc-root">
        {/* HEADER */}
        <div className="mc-header">
          <div className="mc-header-row">
            <div className="mc-user-block">
              <div className="position-relative">
                <img
                  src={selectedConversation?.profilePic}
                  alt="profile"
                  className="mc-avatar"
                />
                <span className="mc-online-dot" />
              </div>

              <div>
                <div className="mc-name">{selectedConversation.fullName}</div>
                <div className="mc-status">online</div>
              </div>
            </div>

            <div className="mc-header-actions">
              <button type="button" className="mc-btn">
                <MdOutlineChat size={18} />
                <span>Accept Chat</span>
              </button>

              <button type="button" className="mc-btn mc-btn-danger">
                <HiOutlineBan size={18} />
                <span>Block User</span>
              </button>
            </div>
          </div>
        </div>

        {/* BODY (SCROLLABLE MESSAGE AREA) */}
        <div className="mc-body">
          <Messages />
        </div>

        {/* FOOTER (MESSAGE INPUT) */}
        <div className="mc-footer">
          <MessageInput />
          <p className="text-center text-muted small mt-2 mb-0">
            Never share bank details, OTP or money requests. Report suspicious activity instantly.
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageContainer;

/* --------------- NO CHAT SELECTED --------------- */

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  const firstName = authUser?.user?.firstName || "User";

  return (
    <>
      <style>{`
        .nochat-wrapper {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f6fa;
        }

        /* FULL-SCREEN CARD ON RIGHT SIDE */
        .nochat-card {
          width: 100%;
          height: 100%;
          border-radius: 0;
          border-left: 1px solid #e5e7eb;
          border-top: none;
          border-right: none;
          border-bottom: none;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .nochat-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #111111;
        }

        .nochat-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
        }
      `}</style>

      <div className="nochat-wrapper">
        <div className="nochat-card">
          <h5 className="nochat-title mb-1">
            Welcome {firstName} 👋
          </h5>
          <p className="nochat-subtitle mb-3">
            Start a new conversation
          </p>
          <img
            src={startChattingImage}
            alt="start chat"
            style={{ width: 220, maxWidth: "90%" }}
          />
        </div>
      </div>
    </>
  );
};
