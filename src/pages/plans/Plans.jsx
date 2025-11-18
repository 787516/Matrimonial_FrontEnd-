import { useState, useEffect } from 'react';
import usePayment from '../../hooks/usePayment';
import Button from '../../components/UI/Button';
import React from 'react';
const Plans = () => {
  const [plans, setPlans] = useState([]);
  const { initiatePaymentProcess } = usePayment();

  useEffect(() => {
    // Fetch plans
  }, []);

  const handleUpgrade = async (planId) => {
    await initiatePaymentProcess(planId);
  };

  return (
    <div className="plans-page">
      <h1>Upgrade Plan</h1>
      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.name}</h3>
            <p className="price">${plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <Button onClick={() => handleUpgrade(plan.id)}>Choose Plan</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
