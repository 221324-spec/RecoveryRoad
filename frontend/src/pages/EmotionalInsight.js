import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmotionalInsight.css';

const scenarios = [
  {
    id: 1,
    text: "You feel overwhelmed after receiving criticism at work.",
    correct: "Needs Regulation"
  },
  {
    id: 2,
    text: "You remember a mistake you made years ago.",
    correct: "Can Be Let Go"
  },
  {
    id: 3,
    text: "You feel distant from a close friend and want to reconnect.",
    correct: "Needs Expression"
  },
  {
    id: 4,
    text: "You feel anxious about an upcoming presentation.",
    correct: "Needs Reflection"
  }
];

const options = ["Needs Expression", "Needs Regulation", "Needs Reflection", "Can Be Let Go"];

const activityMap = {
  "Needs Expression": {
    text: "📝 Take a moment to write or talk about what you're feeling.",
    redirectGame: null
  },
  "Needs Regulation": {
    text: "🧘 Try a 3-breath grounding exercise. Inhale 4s, hold 4s, exhale 4s.",
    redirectGame: "/breathing"
  },
  "Needs Reflection": {
    text: "🔍 Ask yourself: What’s really bothering me? What does it remind you of?",
    redirectGame: null
  },
  "Can Be Let Go": {
    text: "🌬️ Let it go. Imagine placing this feeling on a leaf floating down a stream.",
    redirectGame: null
  }
};

function EmotionalInsight() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [expressionText, setExpressionText] = useState("");
  const [reflection, setReflection] = useState({ why: '', memory: '' });
  const [showBreathingPrompt, setShowBreathingPrompt] = useState(false);
  const [hasScored, setHasScored] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setConfirmed(false);

    if (option === scenarios[current].correct && !hasScored) {
      setScore(prev => prev + 1);
      setEarnedPoints(prev => prev + 10); // ✅ add 10 points
      setHasScored(true);
    }

    if (option === "Needs Regulation") {
      setShowBreathingPrompt(true);
    }
  };

  const handleNext = () => {
    if (activityMap[selected]?.redirectGame && selected !== "Needs Regulation") {
      navigate(activityMap[selected].redirectGame);
      return;
    }

    setSelected(null);
    setConfirmed(false);
    setExpressionText("");
    setReflection({ why: '', memory: '' });
    setShowBreathingPrompt(false);
    setHasScored(false); // reset scoring flag for next question

    if (current < scenarios.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      console.log("✅ Points Earned:", earnedPoints);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setEarnedPoints(0);
    setSelected(null);
    setShowResult(false);
    setConfirmed(false);
    setExpressionText("");
    setReflection({ why: '', memory: '' });
    setShowBreathingPrompt(false);
    setHasScored(false);
  };

  const renderMiniTask = () => {
    if (selected === "Needs Regulation" && showBreathingPrompt) {
      return (
        <div className="mini-task breathing-confirm">
          <h3>🧘 Breathing Activity</h3>
          <p>Would you like to do the breathing exercise now?</p>
          <div className="breathing-buttons">
            <button onClick={() => navigate("/breathing")}>Yes</button>
            <button onClick={() => setShowBreathingPrompt(false)}>No</button>
          </div>
        </div>
      );
    }

    switch (selected) {
      case "Needs Expression":
        return (
          <div className="mini-task">
            <h3>📝 Express Yourself</h3>
            <textarea
              placeholder="Write something about how you feel..."
              value={expressionText}
              onChange={(e) => {
                const val = e.target.value;
                setExpressionText(val);
                setConfirmed(val.length >= 10);
              }}
              rows={4}
            />
            <p className="tip">Write at least 10 characters to proceed.</p>
          </div>
        );

      case "Needs Reflection":
        return (
          <div className="mini-task">
            <h3>🔍 Reflect on Your Emotion</h3>
            <input
              type="text"
              placeholder="What triggered this?"
              value={reflection.why}
              onChange={(e) => {
                const val = e.target.value;
                setReflection(prev => ({ ...prev, why: val }));
                setConfirmed(val.length > 5 && reflection.memory.length > 5);
              }}
            />
            <input
              type="text"
              placeholder="What does it remind you of?"
              value={reflection.memory}
              onChange={(e) => {
                const val = e.target.value;
                setReflection(prev => ({ ...prev, memory: val }));
                setConfirmed(reflection.why.length > 5 && val.length > 5);
              }}
            />
            <p className="tip">Both inputs must be at least 6 characters.</p>
          </div>
        );

      case "Can Be Let Go":
        return (
          <div className="mini-task">
            <h3>🌬️ Let It Go</h3>
            <p>Focus for 10 seconds and click “Done” after imagining the feeling floating away.</p>
            <button className="confirm-btn" onClick={() => setConfirmed(true)}>
              Done
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="insight-container">
      <h1>🧠 Emotional Insight</h1>

      {!showResult ? (
        <>
          <div className="score-box">
            <p>✅ Score: <strong>{score}</strong> / {scenarios.length}</p>
            <p>🏅 Points Earned: <strong>{earnedPoints}</strong></p>
          </div>

          <p className="scenario">{scenarios[current].text}</p>
          <div className="option-grid">
            {options.map(option => (
              <button
                key={option}
                className={`option-btn ${selected === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {selected && (
            <div className="activity-box">
              <p><strong>Activity:</strong> {activityMap[selected].text}</p>
              {renderMiniTask()}
            </div>
          )}

          {selected && !showBreathingPrompt && (
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!confirmed}
            >
              {current === scenarios.length - 1 ? "Finish" : "Next"}
            </button>
          )}
        </>
      ) : (
        <div className="result">
          <h2>Your Score: {score} / {scenarios.length}</h2>
          <h3>🏅 Points Earned: {earnedPoints}</h3>
          <button className="restart-btn" onClick={handleRestart}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default EmotionalInsight;
