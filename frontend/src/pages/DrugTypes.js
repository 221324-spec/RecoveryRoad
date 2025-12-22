// DrugTypes.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {  } from "react-icons/fa";
import RecoveryRoadLogo from "../assets/logoo.png";
import RecoveryRoadLogoo from "../assets/logo.png";
import "./DrugTypes.css";

function DrugTypes() {
  const navigate = useNavigate();

  const drugTypes = [
    { id: 1, name: "Alcohol", path: "/alcoholinfo" },
    { id: 2, name: "Crystal Meth", path: "/crystalmethinfo" },
    { id: 3, name: "Cocaine", path: "/cocaineinfo" },
    { id: 4, name: "Opioids", path: "/opioidsinfo" },
    { id: 5, name: "Marijuana", path: "/marijuanainfo" },
  ];

  const recoveryStages = [
    { id: 1, name: "Awareness", path: "/awareness" },
    { id: 2, name: "Action", path: "/action" },
    { id: 3, name: "Progress", path: "/progress" },
  ];

  return (
    <div className="drug-types-layout">
      <main className="main-content flex flex-col min-h-screen">
        {/* Header */}
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
                 Home
              </li>
              <li onClick={() => navigate("/gamedashboard")}> Games</li>
              <li onClick={() => navigate("/learninglibrary")}> Learning Library</li>
              <li onClick={() => navigate("/drugaddiction")}> Drug Addiction</li>
              <li onClick={() => navigate("/drugtypes")}> Drug Types</li>
            </ul>
          </nav>
        </header>

        {/* Page Heading */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="dashboard-heading text-center mb-10">
            <h1 className="page-title">Types of Drugs</h1>
            <p className="page-subtitle">
              Explore different categories of drugs, their risks, and recovery resources. 
              Click a drug type to learn more.
            </p>
          </div>

          {/* Grid of Cards - Drug Types */}
          <div className="dashboard-cards">
            {drugTypes.map((drug) => (
              <div
                key={drug.id}
                className="drug-card cursor-pointer"
                onClick={() => navigate(drug.path)}
              >
                <h2 className="drug-name">{drug.name}</h2>
              </div>
            ))}
          </div>

          {/* ✅ Recovery Stages Section */}
          <div className="dashboard-heading text-center mt-16 mb-10">
            <h1 className="page-title">Stages of Recovery</h1>
            <p className="page-subtitle">
              Recovery is a journey of growth. Here are the 3 key stages:
            </p>
          </div>

          <div className="dashboard-cards">
            {recoveryStages.map((stage) => (
              <div
                key={stage.id}
                className="drug-card cursor-pointer"
                onClick={() => navigate(stage.path)}
              >
                <h2 className="drug-name">{stage.name}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-container">
            <div className="footer-brand">
              <img
                src={RecoveryRoadLogoo}
                alt="Recovery Road Logo"
                className="footer-logo"
                loading="lazy"
              />
              <p>
                Recovery Toolkit helps individuals on their path to wellness with
                engaging games and educational resources for addiction recovery.
              </p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/gamedashboard")}>Games</li>
                <li onClick={() => navigate("/learninglibrary")}>Learning Library</li>
                <li onClick={() => navigate("/drugaddiction")}>Drug Addiction</li>
                <li onClick={() => navigate("/drugtypes")}>Drug Types</li>
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
      </main>
    </div>
  );
}

export default DrugTypes;
