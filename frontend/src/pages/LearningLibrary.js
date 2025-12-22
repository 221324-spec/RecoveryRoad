// LearningLibrary.js
import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RecoveryRoadLogo from "../assets/logoo.png";
import "./LearningLibrary.css"; // ✅ External CSS file
import dd from "../assets/dd.jpeg";

import addiction from "../assets/therapy.jpg"; // 👉 New image for Drug Addiction
import mental from "../assets/addiction.jpg"; // 👉 New image for Mental Health
import causes from "../assets/causes.jpg"; // 👉 New image for Causes of Drug Addiction

export default function LearningLibrary() {
  const navigate = useNavigate();

  return (
    <div className="ll-wrapper">
      {/* ✅ Header same as Dashboard */}
      <header className="topbar">
        <div className="brand-logo">
          <img
            src={RecoveryRoadLogo}
            alt="Recovery Road Logo"
            className="brand-image"
            loading="lazy"
          />
        </div>

        <nav className="header-links">
          <ul>
            <li onClick={() => navigate("/")}>
              <FaHome /> Home
            </li>
            <li onClick={() => navigate("/gamedashboard")}>🎮 Games</li>
            <li onClick={() => navigate("/learninglibrary")}>📚 Learning Library</li>
          </ul>
        </nav>
      </header>

      {/* ✅ Centered Heading */}
      <header className="ll-hero ll-center">
        <div className="ll-center-text">
          <h1>Learning & Awareness Library</h1>
          <p>
            Explore key resources on drug types, addiction, and mental health.  
            Click a card below to learn more.
          </p>
        </div>
      </header>

      {/* ✅ Grid with 2 cards per row */}
      <section className="ll-grid ll-center">
        {/* Drug Types Card */}
        <article
          className="ll-round-card"
          onClick={() => navigate("/drugtypes")}
        >
          <img src={dd} alt="Drug Types" />
          <div className="ll-round-body">
            <h3>Drug Types</h3>
            <p>
              Learn about different categories of drugs, their effects, and associated risks.
            </p>
          </div>
        </article>

        {/* Drug Addiction Card */}
        <article
          className="ll-round-card"
          onClick={() => navigate("/drugaddiction")}
        >
          <img src={addiction} alt="Drug Addiction" />
          <div className="ll-round-body">
            <h3>Drug Addiction</h3>
            <p>
              Understand addiction, recovery challenges, and strategies for long-term wellness.
            </p>
          </div>
        </article>

        {/* Mental Health Card */}
        <article
          className="ll-round-card"
          onClick={() => navigate("/mentalhealth")}
        >
          <img src={mental} alt="Mental Health" />
          <div className="ll-round-body">
            <h3>Drug Addiction & Mental Health</h3>
            <p>
              Explore the connection between mental well-being and recovery, including coping strategies.
            </p>
          </div>
        </article>

        {/* ✅ Causes of Drug Addiction Card */}
        <article
          className="ll-round-card"
          onClick={() => navigate("/causesofdrugaddiction")}
        >
          <img src={causes} alt="Causes of Drug Addiction" />
          <div className="ll-round-body">
            <h3>Causes of Drug Addiction</h3>
            <p>
              Discover the underlying social, psychological, and biological factors that contribute to drug addiction.
            </p>
          </div>
        </article>
      </section>

      {/* Footer same as Dashboard */}
      <footer className="dashboard-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img
              src={RecoveryRoadLogo}
              alt="Recovery Road Logo"
              className="footer-logo"
              loading="lazy"
            />
            <p>
              Recovery Toolkit helps individuals on their path to wellness
              with engaging games and educational resources for addiction recovery.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/gamedashboard")}>Games</li>
              <li onClick={() => navigate("/learninglibrary")}>Learning Library</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@recoverytoolkit.com</p>
            <p>Phone: +92 300 1234567</p>
            <p>© 2025 Recovery Toolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
