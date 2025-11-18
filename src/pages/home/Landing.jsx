import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import React from 'react';
const Landing = () => {
  return (
    <div className="landing-page">
      <div className="hero">
        <h1>Find Your Perfect Match</h1>
        <p>Join thousands of couples who found their soulmate</p>
        <div className="hero-buttons">
          <Link to="/register"><Button variant="primary">Get Started</Button></Link>
          <Link to="/about"><Button variant="secondary">Learn More</Button></Link>
        </div>
      </div>
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Your privacy is our priority</p>
          </div>
          <div className="feature-card">
            <h3>👥 Large Community</h3>
            <p>Connect with thousands of users</p>
          </div>
          <div className="feature-card">
            <h3>💬 Real Conversations</h3>
            <p>Chat with potential matches</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
