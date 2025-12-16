import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Star, Shield, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
// Use image from public folder - homepageimage.png

const HomePage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { 
      value: "500+", 
      label: "Expert Supervisors", 
      icon: Users,
      description: "Certified supervisors ready to help"
    },
    { 
      value: "24/7", 
      label: "Online Support", 
      icon: Clock,
      description: "Round-the-clock medical assistance"
    },
    { 
      value: "100k+", 
      label: "Happy Patients", 
      icon: Star,
      description: "Families trust our care"
    }
  ];

  return (
    <div className="homepage" style={{ backgroundImage: `url(/homepageimage.avif)` }}>
      <nav className={`homepage-nav colorful-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <Heart className="logo-icon" />
          <span>RecoveryRoad</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              Safe • Secure • Supportive</span>
            <h1>Your Health Journey Starts Here</h1>
            <p>
              Find hope, guidance, and personalized support for addiction recovery.
  Connect with supervisors, track your progress and rebuild your life one day at a time.
            </p>
            <button className="start-button" onClick={() => navigate('/login')}>
              Get Started <ArrowRight className="arrow-icon" size={20} />
            </button>
          </div>
          <div className="hero-image">
            <div className="hero-stats">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">
                      <IconComponent size={24} />
                    </div>
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                    <p className="stat-description">{stat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Heart className="logo-icon" />
            <span>Road Recovery</span>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-info">
            <span>© {new Date().getFullYear()} Road Recovery. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
