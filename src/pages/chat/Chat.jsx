import React from "react";
import MessageContainer from "../../components/chat/messages/MessageContainer.jsx";
import Sidebar from "../../components/chat/sidebar Messages/Sidebar.jsx";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        /* MAIN CHAT WRAPPER UNDER NAVBAR */
        .chat-wrapper {
          width: 100%;
          height: calc(100vh - 80px);      /* adjust 80 if navbar taller/shorter */
          max-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          background: #f5f5f5;
          overflow: hidden;
        }

        .chat-body {
          flex: 1;
          display: flex;
          height: 100%;
          overflow: hidden;                /* only inner areas scroll */
        }

        /* SIDEBAR (LEFT) */
        .chat-sidebar {
          width: 320px;
          min-width: 260px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* conversations inside sidebar */
        .sb-conversations {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .sb-conversations::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
        }

        /* CHAT AREA (RIGHT) */
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          background: #fafafa;
        }

        /* MESSAGE CONTAINER ROOT */
        .mc-root,
        .mc-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
        }

        /* HEADER (TOP OF CHAT) */
        .mc-header {
          height: 70px;
          padding: 16px 20px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        /* MESSAGES AREA – SCROLLABLE, SCROLLBAR HIDDEN */
        .mc-body,
        .mc-messages {
          flex: 1;
          min-height: 0;
          overflow-y: auto !important;
          padding: 16px 18px;
          background: #fafafa;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .mc-body::-webkit-scrollbar,
        .mc-messages::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }

        /* FOOTER (MESSAGE INPUT) */
        .mc-footer,
        .mc-input {
          padding: 14px 18px;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        /* ---------- RESPONSIVE ---------- */

        /* tablets / smaller laptops */
        @media (max-width: 1024px) {
          .chat-sidebar {
            width: 280px;
            min-width: 240px;
          }
        }

        /* REAL MOBILE STACKING: only below 576px now */
        @media (max-width: 576px) {
          .chat-wrapper {
            height: calc(100vh - 70px);
            max-height: calc(100vh - 70px);
          }

          .chat-body {
            flex-direction: column;
          }

          .chat-sidebar {
            width: 100%;
            min-width: 100%;
            height: 40%;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }

          .chat-main {
            height: 60%;
          }
        }
      `}</style>

      <div className="chat-wrapper">
        <div className="chat-body">
          <aside className="chat-sidebar">
            <Sidebar />
          </aside>

          <section className="chat-main">
            <MessageContainer />
          </section>
        </div>
      </div>
    </>
  );
};

export default Chat;
