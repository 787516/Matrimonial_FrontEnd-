// src/pages/plans/Plans.jsx
import React, { useEffect, useState } from "react";
import usePayment from "../../hooks/Payment/usePayment";
import "./Plans.css";
import axiosInstance from "../../api/axiosInstance";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const { initiatePaymentProcess } = usePayment();

  // 1️⃣ Fetch real plans from backend
  useEffect(() => {
    axiosInstance
      .get("/subscription/plans") // <-- your route
      .then((res) => setPlans(res.data.plans))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  // 2️⃣ Handle payment link creation
  const handleUpgrade = async (planId) => {
    await initiatePaymentProcess(planId);
  };

  return (
    <div className="membership-page">
      <div className="membership-pricing-wrap">
        <div className="membership-heading">
          <h1>Membership Plans</h1>
          <p>Choose a premium membership that suits your search</p>
        </div>

        <div className="membership-cards-row">
          {plans.map((plan) => (
            <article
              key={plan._id}
              className="membership-card"
            >
              <div className="membership-card-head-center">
                <span className="membership-plan-dot" />
                <h4>{plan.name}</h4>

                {/* Price */}
                <div className="membership-price">₹{plan.price}</div>

                {/* Duration */}
                <div className="membership-duration">
                  {plan.durationInDays} Days
                </div>
              </div>

              {/* Features */}
              <ul className="membership-features">

                <li>
                  <span className={`membership-feature-icon ${plan.features.canViewProfiles ? "membership-feature-icon--tick" : "membership-feature-icon--cross"}`}>
                    <i className={`fa-solid ${plan.features.canViewProfiles ? "fa-check" : "fa-xmark"}`} />
                  </span>
                  View Profiles
                </li>

                <li>
                  <span className={`membership-feature-icon ${plan.features.canChat ? "membership-feature-icon--tick" : "membership-feature-icon--cross"}`}>
                    <i className={`fa-solid ${plan.features.canChat ? "fa-check" : "fa-xmark"}`} />
                  </span>
                  Chat
                </li>

                <li>
                  <span className={`membership-feature-icon ${plan.features.canViewContactDetails ? "membership-feature-icon--tick" : "membership-feature-icon--cross"}`}>
                    <i className={`fa-solid ${plan.features.canViewContactDetails ? "fa-check" : "fa-xmark"}`} />
                  </span>
                  View Contact Details
                </li>

              </ul>

              {/* Button */}
              <button
                className="membership-choose-btn"
                onClick={() => handleUpgrade(plan._id)}
              >
                Choose Plan
              </button>

            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
