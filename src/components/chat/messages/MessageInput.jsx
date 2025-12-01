import React, { useState } from "react";
import { BsEmojiSmile, BsPaperclip, BsSend } from "react-icons/bs";
import useSendMessage from "../../../hooks/ChatHook/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <style>{`
        /* FOOTER FORM – FULL WIDTH */
        .mi-bar {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* MAIN INPUT WRAPPER (RECTANGLE, LIGHT BG) */
        .mi-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 10px;                 /* small radius, not pill */
          border: 1px solid #d1d5db;
          background: #f3f4f6;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
        }

        .mi-input-wrap:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
          background: #ffffff;
        }

        .mi-input {
          flex: 1;
          border: none !important;
          outline: none !important;
          background: transparent;
          font-size: 0.92rem;
          color: #111827;
        }

        .mi-input::placeholder {
          color: #9ca3af;
        }

        /* small icon buttons inside input bar */
        .mi-icon-btn {
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          color: #9ca3af;
        }

        .mi-icon-btn:hover {
          color: #6b7280;
        }

        /* SEND BUTTON – compact rectangular button */
        .mi-send-btn {
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          background: #ff0000;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 15px rgba(99, 102, 241, 0.25);
          white-space: nowrap;
        }

        .mi-send-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 18px rgba(99, 102, 241, 0.35);
        }

        .mi-send-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .mi-bar {
            gap: 8px;
          }
          .mi-send-btn {
            padding: 8px 14px;
          }
        }
      `}</style>

      <form className="mi-bar" onSubmit={handleSubmit}>
        {/* FULL-WIDTH INPUT BOX */}
        <div className="mi-input-wrap">
          <input
            type="text"
            className="mi-input"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="button"
            className="mi-icon-btn"
            tabIndex={-1}
            aria-label="Emoji"
          >
            <BsEmojiSmile />
          </button>

          <button
            type="button"
            className="mi-icon-btn"
            tabIndex={-1}
            aria-label="Attach file"
          >
            <BsPaperclip />
          </button>
        </div>

        {/* SEND BUTTON ON RIGHT */}
        <button
          type="submit"
          className="mi-send-btn"
          disabled={loading || !message.trim()}
        >
          <BsSend />
          <span>Send</span>
        </button>
      </form>
    </>
  );
};

export default MessageInput;
