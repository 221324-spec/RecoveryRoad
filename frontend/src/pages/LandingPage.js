import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // Navigate to dashboard
  };


   const goToMilestoneUpdates = () => {
    navigate("/milestoneupdates"); // Navigate to dashboard
  };

 // const goToProgressHistory = () => {
    //navigate("/progresshistory"); // Navigate to dashboard
  //};
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Goal Assignment & Tracking Module</h1>
        <p>
          Empower supervisors to assign goals and track patient progress in a
          professional, intuitive, and efficient way.
        </p>
        <button className="cta-btn" onClick={goToDashboard}>
          Go to Dashboard
        </button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {/* Assign Goals card navigates to login */}
          <div className="feature-card" onClick={goToLogin}>
            <h3>Assign Goals</h3>
            <p>Supervisors can assign personalized goals to each patient.</p>
          </div>

          {/* Other cards can go to dashboard directly */}
         
          <div className="feature-card" onClick={goToMilestoneUpdates}>
            <h3>Milestone Updates</h3>
            <p>Patients can update status: To Do, Doing, Done, with notes.</p>
          </div>
         
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 Module 3 | Goal Assignment System</p>
      </footer>
    </div>
  );
}
