import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./PaymentSuccess.css";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    axiosInstance.get("/subscription/me").then((res) => {
      setSubscription(res.data.subscription);
    });
  }, []);

  return (
    <div className="ps-container">

      {/* Success Icon */}
      <div className="ps-icon-wrapper">
        <FaCheckCircle className="ps-success-icon" />
      </div>

      <h1 className="ps-title">Payment Successful 🎉</h1>
      <p className="ps-subtitle">Your membership has been successfully activated.</p>

      {/* Subscription Card */}
      {subscription ? (
        <div className="ps-card glass">
          <h2 className="ps-plan-name">{subscription.planId.name}</h2>

          <p className="ps-plan-line">
            Valid Till: <strong>{new Date(subscription.endDate).toLocaleDateString()}</strong>
          </p>
        </div>
      ) : (
        <p className="ps-loading">Fetching your subscription details...</p>
      )}

      <button className="ps-btn" onClick={() => (window.location.href = "/dashboard")}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
