// src/pages/dashboard/DashboardModal.jsx
import React from "react";
import "./DashboardModal.css";

// React Icons (Matching your previous FA icons)
import { FaEye, FaCheck, FaTimes, FaHeart, FaComment } from "react-icons/fa";

const DashboardModal = ({
    isOpen,
    onClose,
    title,
    loading,
    rows,
    onViewProfile,
    onAccept,
    onSendInterest,
    onChat,
    setConfirmReject
}) => {

    if (!isOpen) return null;

    return (
        <div className="dashboard-modal" onClick={onClose}>
            <div
                className="dashboard-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button className="close-modal" onClick={onClose}>
                    &times;
                </button>

                {/* Title */}
                <h4 className="modal-title">{title}</h4>

                {/* Loader */}
                {loading && <div className="shimmer-loader"></div>}

                {!loading && (
                    <div id="tableContainer">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>Photo</th>
                                    <th>Reg. ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>City</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows.map((p, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>

                                        {/* Photo */}
                                        <td>
                                            <img
                                                src={p.profilePhoto || "/no-photo.png"}
                                                width="45"
                                                height="45"
                                                className="rounded-circle"
                                            />
                                        </td>

                                        <td>{p.registrationId || "—"}</td>

                                        <td>{p.firstName} {p.lastName}</td>

                                        <td>{p.age || "—"}</td>

                                        <td>{p.city || "—"}</td>

                                        <td>{p.status}</td>

                                        {/* ACTION BUTTONS */}
                                        <td className="action-buttons">

                                            {/* VIEW PROFILE */}
                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => onViewProfile(p._id)}
                                            >
                                                <FaEye />
                                            </button>

                                            {/* ACCEPT */}
                                            {p.status === "Pending" && (
                                                <button
                                                    className="action-btn accept-btn"
                                                    onClick={() => onAccept(p.requestId)}
                                                >
                                                    <FaCheck />
                                                </button>
                                            )}

                                            {/* REJECT */}
                                            {p.status === "Pending" && (
                                                <button
                                                    className="action-btn reject-btn"
                                                    onClick={() =>
                                                        setConfirmReject({
                                                            show: true,
                                                            requestId: p.requestId
                                                        })
                                                    }
                                                >
                                                    <FaTimes />
                                                </button>
                                            )}

                                            {/* RE-SEND INTEREST */}
                                            {p.status === "Rejected" && (
                                                <button
                                                    className="action-btn interest-btn"
                                                    onClick={() => onSendInterest(p._id)}
                                                >
                                                    <FaHeart />
                                                </button>
                                            )}

                                            {/* CHAT */}
                                            <button
                                                className="action-btn chat-btn"
                                                onClick={() => onChat(p._id)}
                                            >
                                                <FaComment />
                                            </button>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardModal;
