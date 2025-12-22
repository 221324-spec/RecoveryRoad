// Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import RecoveryRoadLogo from "../assets/logoo.png";
import RecoveryRoadLogoo from "../assets/logo.png";
import GamesCover from "../assets/games.jpg";
import LibraryCover from "../assets/learning.jpg";
import GoalsCover from "../assets/goal.jpg"; // ✅ Image for Goals Assignment card

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <main className="main-content flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="topbar">
          <div className="brand-logo">
            <img
              src={RecoveryRoadLogo}
              alt="Recovery Road Logo"
              className="brand-image"
              loading="lazy"
            />
          </div>

          {/* Navigation links */}
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

        {/* Center content wrapper */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* Page Heading */}
          <div className="dashboard-heading text-center mb-10">
            <h1 className="page-title">Recovery Road Dashboard</h1>
            <p className="page-subtitle">
              Choose a module to support{" "}
              <strong>drug addiction recovery and counseling</strong>.  
              Play games or explore educational resources.
            </p>
          </div>

          {/* Centered Cards */}
          <div className="dashboard-cards">
            {/* Games Card */}
            <div
              className="game-card cursor-pointer"
              onClick={() => navigate("/gamedashboard")}
            >
              <div className="game-image">
                <img
                  src={GamesCover}
                  alt="Games"
                  className="rounded-lg object-contain w-full max-h-48"
                />
              </div>
              <h2 className="game-title">Games</h2>
              <p className="game-desc">
                Play interactive and therapeutic games to improve focus,
                mindfulness, and well-being.
              </p>
              <button className="play-now-btn">Explore Games</button>
            </div>

            {/* Learning Library Card */}
            <div
              className="game-card cursor-pointer"
              onClick={() => navigate("/learninglibrary")}
            >
              <div className="game-image">
                <img
                  src={LibraryCover}
                  alt="Learning Library"
                  className="rounded-lg object-contain w-full max-h-48"
                />
              </div>
              <h2 className="game-title">Learning Library</h2>
              <p className="game-desc">
                Access bite-sized lessons, articles, and videos about addiction
                recovery and healthy living.
              </p>
              <button className="play-now-btn">Go to Library</button>
            </div>

            {/* Goals Assignment Card */}
            <div
              className="game-card cursor-pointer"
              onClick={() => navigate("/landingpage")}
            >
              <div className="game-image">
                <img
                  src={GoalsCover}
                  alt="Goals Assignment"
                  className="rounded-lg object-contain w-full max-h-48"
                />
              </div>
              <h2 className="game-title">Goals Assignment by Supervisor</h2>
              <p className="game-desc">
                View your assigned goals and track progress as directed by your supervisor.
              </p>
              <button className="play-now-btn">View Goals</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-container">
            {/* About / Brand */}
            <div className="footer-brand">
              <img
                src={RecoveryRoadLogoo}
                alt="Recovery Road Logo"
                className="footer-logo"
                loading="lazy"
              />
              <p>
                Recovery Toolkit helps individuals on their path to wellness
                with engaging games and educational resources for addiction
                recovery.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/gamedashboard")}>Games</li>
                <li onClick={() => navigate("/learninglibrary")}>Learning Library</li>
              </ul>
            </div>

            {/* Contact / Info */}
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Email: support@recoverytoolkit.com</p>
              <p>Phone: +92 300 1234567</p>
              <p>© 2025 Recovery Toolkit. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Inline CSS for centering cards */}
      <style>{`
        .dashboard-layout {
          background: #ffffff;
        }
        .dashboard-cards {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 2.5rem;
          flex-wrap: nowrap; /* 3 cards in a row */
          width: 100%;
          max-width: 1300px; /* fit all 3 cards */
          margin: 0 auto;
        }
        @media (max-width: 1200px) {
          .dashboard-cards {
            flex-wrap: wrap; /* wrap on smaller screens */
            gap: 1.5rem;
          }
        }

        .game-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 20px;
          width: 400px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .game-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .game-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 8px;
        }
        .game-desc {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 16px;
        }
        .play-now-btn {
          background-color: #2563eb;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .play-now-btn:hover {
          background-color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
