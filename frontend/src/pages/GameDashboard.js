import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTrophy,
  FaGamepad,
  FaSearch,
} from "react-icons/fa";
import "./GameDashboard.css";
import RecoveryRoadLogo from "../assets/logoo.png";
import RecoveryRoadLogoo from "../assets/logo.png";
import Leaderboard from "../assets/leaderboard.jpeg";


// ✅ Add image imports (put cover images in /assets/covers)
import BreathingCover from "../assets/waves-min.jpg";
import MindMatchCover from "../assets/memorypuzzle-min.jpg";
import MusicTherapyCover from "../assets/rhythm-min.jpg";
import SoundSootherCover from "../assets/landscape-min.jpg";
import ImagePuzzleCover from "../assets/puzzlee-min.jpeg";
import GroundingCover from "../assets/nature-min.jpg";
import EmotionCheckinCover from "../assets/moodtracker-min.jpeg";
import NavigatorsCover from "../assets/navigators-min.jpeg";
import RecoveryWheelCover from "../assets/wheel-min.jpeg";

const games = [
  {
    id: "breathing",
    title: "Breathing Game",
    description: "Relax and calm your mind with guided breathing.",
    category: "Mindfulness",
    image: BreathingCover,
  },
  {
    id: "navigatorstylegame",
    title: "Navigators",
    description: "Calming game with recovery affirmations.",
    category: "Mindfulness",
    image: NavigatorsCover,
  },
  {
    id: "musictherapy",
    title: "Music Therapy",
    description: "Relax with a calming music session.",
    category: "Relaxation",
    image: MusicTherapyCover,
  },
  {
    id: "soundsoother",
    title: "Sound Soother",
    description: "Relax with calming nature scenes.",
    category: "Cognitive",
    image: SoundSootherCover,
  },
  {
    id: "imagepuzzle",
    title: "Image Puzzle",
    description: "Solve an inspiring image puzzle.",
    category: "Cognitive",
    image: ImagePuzzleCover,
  },
  {
    id: "groundingexercise",
    title: "Grounding Exercise",
    description: "Try the 5-4-3-2-1 grounding technique.",
    category: "Mindfulness",
    image: GroundingCover,
  },
  {
    id: "emotioncheckin",
    title: "Emotion Check-In",
    description: "Daily mood check-in with suggested self-care activities.",
    category: "Emotional Wellness",
    image: EmotionCheckinCover,
  },
  {
    id: "mindmatch",
    title: "Mind Match",
    description: "Match cards to improve memory and focus.",
    category: "Cognitive",
    image: MindMatchCover,
  },
  {
    id: "recoverywheelgame",
    title: "Recovery Wheel",
    description: "Spin the wheel for recovery prompts.",
    category: "Emotional Wellness",
    image: RecoveryWheelCover,
  },
];

const categories = [
  {
    id: "Mindfulness",
    icon: "🧘",
    title: "Mindfulness",
    desc: "Games to help you relax, breathe, and stay grounded.",
  },
  {
    id: "Cognitive",
    icon: "🧠",
    title: "Cognitive",
    desc: "Challenge your memory, focus, and mental flexibility.",
  },
  {
    id: "Relaxation",
    icon: "🎶",
    title: "Relaxation",
    desc: "Unwind with music therapy and calming exercises.",
  },
  {
    id: "Emotional Wellness",
    icon: "🌳",
    title: "Emotional Wellness",
    desc: "Track your feelings and build emotional resilience.",
  },
];

function GameDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoriesRowRef = useRef(null);
  const gamesSectionRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ✅ Track drag to prevent accidental clicks
  const dragStartX = useRef(0);
  const dragMoved = useRef(false);

  useEffect(() => {
    const row = categoriesRowRef.current;
    if (!row) return;

    const update = () => {
      setCanScrollLeft(row.scrollLeft > 5);
      setCanScrollRight(
        row.scrollWidth > row.clientWidth &&
          row.scrollLeft + row.clientWidth < row.scrollWidth - 5
      );
    };

    update();
    row.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleCardClick = (gameId) => {
    if (gameId === "soundsoother") navigate("/soundsootherselection");
    else navigate(`/${gameId}`);
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const suggestions = searchTerm
    ? games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (gameId) => {
    setShowSuggestions(false);
    handleCardClick(gameId);
  };

  const scrollAmount = () => {
    const el = categoriesRowRef.current;
    return el ? Math.round(el.clientWidth * 0.7) : 300;
  };
  const scrollLeft = () => {
    categoriesRowRef.current?.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    categoriesRowRef.current?.scrollBy({
      left: scrollAmount(),
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (category) => {
    if (dragMoved.current) return; // ✅ Ignore clicks if user dragged
    setSelectedCategory(category);

    // ✅ Scroll directly to games section instead of top
    if (gamesSectionRef.current) {
      gamesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Main */}
      <main className="main-content">
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

          <div className="search-section center-search">
            <div className="search-box">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => setShowSuggestions(true)}
              />
              <button className="search-btn">
                <FaSearch />
              </button>

              {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((game) => (
                    <li
                      key={game.id}
                      onClick={() => handleSuggestionClick(game.id)}
                    >
                      {game.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ✅ Sidebar links moved into header */}
          <nav className="header-links">
            <ul>
              <li onClick={() => navigate("/")}>
                <FaHome /> Home
              </li>
              <li
                onClick={() => {
                  const gamesSection = document.getElementById("games-section");
                  if (gamesSection) {
                    gamesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <FaGamepad /> Games
              </li>
              <li onClick={() => navigate("/leaderboard")}>
                <FaTrophy /> Leaderboard
              </li>
            </ul>
          </nav>
        </header>

        {/* Page Heading */}
        <div className="dashboard-heading">
          <h1 className="page-title"> Games Dashboard</h1>
          <p className="page-subtitle">
            These therapeutic games are designed to support individuals in{" "}
            <strong>drug addiction recovery and counseling</strong>, helping
            improve focus, emotional well-being, and mindfulness in a fun,
            engaging way.
          </p>
        </div>

        {/* Games Grid */}
        <div id="games-section" ref={gamesSectionRef} className="game-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-image">
                <img src={game.image} alt={game.title} loading="lazy" />
              </div>
              <h2 className="game-title">{game.title}</h2>
              <p className="game-desc">{game.description}</p>

              {/* ✅ Play Now Button */}
              <button
                className="play-now-btn"
                onClick={() => handleCardClick(game.id)}
              >
                ▶ Play Now
              </button>
            </div>
          ))}
        </div>

        {/* Leaderboard Section */}
        <section className="dashboard-section">
          <h2 className="section-title">Leaderboard</h2>

          <div className="section-content">
            <div
              className="dashboard-leaderboard-card"
              onClick={() => navigate("/leaderboard")}
            >
              <img
                src={Leaderboard}
                alt="Leaderboard"
                className="dashboard-leaderboard-icon"
              />
              <h3 className="dashboard-leaderboard-heading">
                View Leaderboard
              </h3>
              <p className="dashboard-leaderboard-desc">
                Check out the top players and see who’s leading across all
                recovery games.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <h2 className="page-title">Game Categories</h2>
          <p className="page-subtitle">
            Explore different types of recovery-focused games crafted to support
            your journey.
          </p>

          {canScrollLeft && (
            <button className="scroll-btn left" onClick={scrollLeft}>
              {"<"}
            </button>
          )}

          <div
            className="categories-row"
            ref={categoriesRowRef}
            onMouseDown={(e) => {
              dragStartX.current = e.clientX;
              dragMoved.current = false;
            }}
            onMouseMove={(e) => {
              if (Math.abs(e.clientX - dragStartX.current) > 5) {
                dragMoved.current = true;
              }
            }}
            onMouseUp={() => {
              setTimeout(() => {
                dragMoved.current = false;
              }, 50);
            }}
          >
            <div
              className={`category-card ${
                selectedCategory === "All" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              <span className="category-icon">📂</span>
              <h3>All</h3>
              <p>View all available recovery games.</p>
            </div>

            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-card ${
                  selectedCategory === cat.id ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <span className="category-icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button className="scroll-btn right" onClick={scrollRight}>
              {">"}
            </button>
          )}
        </section>

        {/* About the Games Section */}
        <section className="about-games-section">
          <h2 className="page-title">About the Games</h2>
          <p className="page-subtitle">
            These therapeutic games are carefully designed to support
            individuals on their journey toward recovery from substance use.
            Each game incorporates evidence-based techniques that promote
            mindfulness, cognitive training, emotional awareness, and stress
            reduction.
          </p>
          <p className="page-subtitle">
            By engaging with these interactive exercises, users can improve
            focus, enhance emotional well-being, and develop healthy coping
            mechanisms in a supportive and engaging digital environment. The
            games are structured to encourage reflection, skill-building, and
            gradual progress toward personal recovery goals.
          </p>
        </section>

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
                Recovery Toolkit is designed to support individuals on their
                journey to wellness and recovery through engaging and
                therapeutic games.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li
                  onClick={() => {
                    const gamesSection =
                      document.getElementById("games-section");
                    if (gamesSection) {
                      gamesSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Games
                </li>
                <li onClick={() => navigate("/leaderboard")}>Leaderboard</li>
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
    </div>
  );
}

export default GameDashboard;
