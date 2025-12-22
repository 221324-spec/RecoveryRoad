import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaMinus } from "react-icons/fa";
import RecoveryRoadLogo from "../assets/logoo.png";
import RecoveryRoadLogoo from "../assets/logo.png";
import AwarenessHero from "../assets/softbg.jpg";
import AwarenessVideo from "../assets/hope.mp4";

// New section images
import SignsImg from "../assets/attention.jpeg";
import BenefitsImg from "../assets/freedom.jpg";
import ChallengesImg from "../assets/challenges.jpg";
//import TipsImg from "../assets/softbg.jpg";

import "./Awareness.css";

function Awareness() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What does awareness mean in recovery?",
      answer:
        "Awareness is the first stage of recovery. It involves recognizing the problem, understanding the consequences of substance use, and acknowledging the need for change.",
    },
    {
      question: "Why is awareness important?",
      answer:
        "Without awareness, change cannot begin. It helps individuals take responsibility for their choices and motivates them to seek help.",
    },
    {
      question: "How can I build awareness?",
      answer:
        "Through self-reflection, journaling, therapy, and honest conversations with trusted friends or professionals.",
    },
  ];

  return (
    <div className="awareness-layout">
      {/* Header */}
      <header className="topbar">
        <div className="brand-logo">
          <img src={RecoveryRoadLogo} alt="Recovery Road Logo" className="brand-image" loading="lazy"/>
        </div>
        <nav className="header-links">
          <ul>
            <li onClick={() => navigate("/")}>
              <FaHome /> Home
            </li>
            <li onClick={() => navigate("/drugtypes")}>🧪 Drug Types</li>
          </ul>
        </nav>
      </header>

      <main className="main-container">
        {/* ✅ Hero */}
        <section className="hero">
          <img src={AwarenessHero} alt="Awareness Stage" className="hero-img" />
          <div className="hero-overlay"></div>
          <div className="hero-text-overlay">
            <h1>The Awareness Stage of Recovery</h1>
            <p>
              Recovery begins with awareness The realization that life can be
              better without addiction. This stage lays the foundation for
              positive change and growth.
            </p>
          </div>
        </section><br></br><br></br>

        {/* ✅ Article Intro */}
        <section className="article-header">
          <h1>Awareness: The First Step in Recovery</h1>
          <p className="awareness-text">
  Recovery begins with awareness. It is the moment when a person realizes
  that life can be healthier, happier, and more fulfilling without addiction.
  This stage lays the foundation for positive change and long-term growth.
</p>

<p className="awareness-text">
  Awareness opens the door to self-reflection, helping individuals understand
  how their choices impact their body, mind, and relationships. It is not
  about instant change but about recognizing the need for change.
</p>

<p className="awareness-text">
  With awareness comes the courage to face the truth, the strength to seek
  support, and the hope that a better future is possible. This first step,
  though small, is the beginning of a powerful journey toward recovery.
</p>

        </section><br></br><br></br><br></br><br></br>

        
      {/* ✅ Video Section */}
<section className="video-section">
  <div className="video-text">
    <h2> The Power of Awareness</h2>
    <p>
      Awareness opens the door to self-reflection, helping individuals understand
      how their choices impact their body, mind, and relationships. It is not
      about instant change but about recognizing the need for change.
    </p>
  </div>
  <div className="video-container">
    <video controls>
      <source src={AwarenessVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</section>


        {/* ✅ Detailed Sections */}
        <section className="detailed-sections">
          {/* Signs */}
          <div className="detail-row">
            <img src={SignsImg} alt="Signs of Awareness" className="detail-img" />
            <div className="detail-text">
              {/* Signs Section */}
<section className="signs-section">
  <h2>Signs You’re Becoming Aware</h2>
  <p>
    Awareness often begins with small yet powerful realizations. It is the stage where
    you start observing your thoughts, emotions, and behaviors with honesty.
    These early signs reflect the growing understanding that change is possible 
    and that life can improve without relying on substances. Recognizing these 
    moments of clarity is an essential step toward building self-awareness and
    embracing healthier choices.
  </p>

  <ul>
    <li>
      Noticing repeated <strong>patterns of unhealthy habits</strong> and
      questioning why they occur.
    </li>
    <li>
      Experiencing feelings of <strong>guilt, regret, or dissatisfaction</strong>
      after substance use and realizing they do not align with your true values.
    </li>
    <li>
      Feeling an increasing <strong>desire for change</strong> and imagining a
      life that is healthier, more fulfilling, and free from dependency.
    </li>
    <li>
      Becoming more <strong>mindful of triggers</strong>—such as stress,
      environment, or social circles—that lead to substance use.
    </li>
    <li>
      Developing moments of <strong>self-reflection</strong>, where you
      consciously think about how your current actions impact your
      relationships, health, and future.
    </li>
  </ul>

  <p>
    These signs are not about weakness but about <em>growth and awareness</em>.
    Recognizing them shows that you are paying attention to yourself in new ways
    and taking the first courageous steps toward transformation.
  </p>
</section>

            </div>
          </div>

{/* Benefits */}
<section className="benefits-section">
  <div className="benefits-row reverse">
    <img 
      src={BenefitsImg} 
      alt="Benefits of Awareness" 
      className="benefits-img" 
    />
    <div className="benefits-text">
      <h2>Benefits of Awareness</h2>
      <p>
        Becoming aware is one of the most powerful turning points in the recovery journey. 
        Awareness is more than just recognizing a problem  it is the spark that opens the 
        door to change, healing, and growth. With awareness, you begin to understand the 
        connection between your actions, emotions, and overall well-being, which allows you 
        to take back control and move toward a healthier, more fulfilling life.
      </p>
      <ul>
        <li><strong>Improved self-understanding:</strong> Recognizing personal triggers, emotions, and patterns helps you respond with clarity rather than impulse.</li>
        <li><strong>Stronger motivation to seek help:</strong> Awareness builds the courage to reach out for support and take the first steps toward recovery.</li>
        <li><strong>Better communication with loved ones:</strong> As you grow in awareness, you express yourself more openly and foster deeper trust in relationships.</li>
        <li><strong>Greater resilience:</strong> Awareness provides the strength to face challenges head-on and turn setbacks into opportunities for growth.</li>
      </ul>
      <p>
        Every step toward awareness creates a ripple effect  improving your mental health, 
        strengthening your relationships, and helping you rediscover a sense of purpose. 
        It’s not just about overcoming addiction, but about building a healthier, more 
        empowered version of yourself. 
      </p>
    </div>
  </div>
</section>



          {/* Challenges */}
<section className="challenges-section">
  <div className="challenges-row">
    <img 
      src={ChallengesImg} 
      alt="Challenges in Awareness" 
      className="challenges-img" 
    />
    <div className="challenges-text">
      <h2>Challenges in the Awareness Stage</h2>
      <p>
        The awareness stage is powerful, but it can also feel overwhelming. 
        It is natural to experience moments of doubt, fear, or denial as you 
        begin confronting the truth. These challenges are not signs of weakness, 
        but stepping stones that push you to grow stronger and more resilient.
      </p>
      <ul>
        <li><strong>Fear of change:</strong> Taking the first steps may feel uncertain, but each small effort builds confidence for the journey ahead.</li>
        <li><strong>Denial of the problem:</strong> It can be difficult to fully accept the impact of addiction, but acknowledgment is the first step toward freedom.</li>
        <li><strong>Peer and social pressure:</strong> External influences can hold you back, yet awareness empowers you to make decisions that align with your values.</li>
        <li><strong>Emotional ups and downs:</strong> Facing reality can trigger stress, guilt, or sadness, but these feelings are part of healing and growth.</li>
        <li><strong>Uncertainty about the future:</strong> The road ahead may seem unclear, but awareness opens the door to hope and possibilities.</li>
      </ul>
      <p>
        Challenges are not barriers they are opportunities to build strength, 
        resilience, and determination. With support, self-reflection, and a 
        positive mindset, these obstacles can become milestones on the path 
        toward recovery and transformation. 
      </p>
    </div>
  </div>
</section>


        </section>

        {/* ✅ FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ✅ Footer */}
      <footer className="dashboard-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src={RecoveryRoadLogoo} alt="Recovery Road Logo" className="footer-logo" loading="lazy"/>
            <p>
              Recovery Toolkit helps individuals on their path to wellness with
              engaging games and educational resources for addiction recovery.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
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
    </div>
  );
}

export default Awareness;
