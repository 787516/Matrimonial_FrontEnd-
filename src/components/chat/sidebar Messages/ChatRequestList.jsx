import React from "react";
import { useChatRequestList } from "../../../hooks/ChatHook/useChatRequestList";
import { useHandleRequestAction } from "../../../hooks/Matches/useHandleRequestAction";
import "./ChatRequestList.css"; // optional

export default function ChatRequestList() {
  const { data = [], isLoading } = useChatRequestList();
  const handleAction = useHandleRequestAction();

  if (isLoading) return <div>Loading chat requests...</div>;
  if (!data.length) return <div>No chat requests found.</div>;

  return (
    <div className="chat-req-container">
      {data.map((u) => (
        <div className="chat-req-item" key={u._id}>
          <img
            src={u.profilePhoto || "/default.png"}
            className="chat-req-avatar"
          />

          <div className="chat-req-info">
            <div className="chat-req-name">
              {u.firstName} {u.lastName}
            </div>
            <div className="chat-req-id">{u.registrationId}</div>
          </div>

          <div className="chat-req-actions">
            <button
              className="btn-accept"
              onClick={() =>
                handleAction.mutate({
                  requestId: u.requestId,
                  action: "Accepted",
                })
              }
            >
              Accept
            </button>

            <button
              className="btn-reject"
              onClick={() =>
                handleAction.mutate({
                  requestId: u.requestId,
                  action: "Rejected",
                })
              }
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
