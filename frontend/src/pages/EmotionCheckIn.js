// components/EmotionCheckIn.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EmotionCheckIn.css";

const emotions = {
  Happy: {
    questions: [
      "What made you happy today?",
      "How can you share this joy with others?",
      "What are you grateful for today?"
    ],
    activities: [
      { label: "Celebrate your mood 🎉", type: "text" },
      { label: "Share joy with someone 😄", type: "text" },
      { label: "Journal your good day 📓", type: "navigate", to: "/thoughtjournal" },
      { label: "Practice gratitude 🙏", type: "text" },
      { label: "Play something fun 🎈", type: "navigate", to: "/moodpop" }
    ]
  },
  Sad: {
    questions: [
      "What’s making you feel sad today?",
      "Have you talked to someone about it?",
      "What comforts you during sadness?"
    ],
    activities: [
      { label: "Watch a comforting movie 🎬", type: "text" },
      { label: "Talk to a friend 💬", type: "text" },
      { label: "Do light stretching 🧘‍♀️", type: "text" },
      { label: "Write down your thoughts 📝", type: "navigate", to: "/thoughtjournal" },
      { label: "Try a guided meditation 🧘", type: "navigate", to: "/breathing" }
    ]
  },
  Angry: {
    questions: [
      "What triggered your anger?",
      "Did you express it or hold it in?",
      "What helps you calm down in such times?"
    ],
    activities: [
      { label: "Go for a walk 🚶‍♂️", type: "text" },
      { label: "write in a Journal 📓", type: "navigate", to: "/thoughtjournal" },
      { label: "Practice deep breathing 🌬", type: "navigate", to: "/breathing" },
      { label: "Squeeze a stress ball 🧸", type: "text" },
      { label: "Listen to calming music 🎵", type: "navigate", to: "/soundsootherselection" }
    ]
  },
  Anxious: {
    questions: [
      "What’s making you feel anxious right now?",
      "Can you identify where this anxiety is felt in the body?",
      "Have you tried calming techniques today?"
    ],
    activities: [
      { label: "Try deep breathing 🌬", type: "navigate", to: "/breathing" },
      { label: "Listen to calm music 🎧", type: "navigate", to: "/soundsootherselection" },
      { label: "write in a Journal ✍️", type: "navigate", to: "/thoughtjournal" },
      { label: "Practice gratitude 🙏", type: "text" },
      { label: "Take a mindful walk 🚶‍♀️", type: "text" }
    ]
  },
  Bored: {
    questions: [
      "What’s making today feel boring?",
      "Is there something new you'd like to try?",
      "What have you enjoyed doing in the past?"
    ],
    activities: [
      { label: "Try a hobby 🎨", type: "text" },
      { label: "Guided Meditation 🧘", type: "navigate", to: "/breathing" },
      { label: "Play a quick puzzle game 🧩", type: "navigate", to: "/mindmatch" },
      { label: "Explore something new 🎓", type: "navigate", to: "/learnhub" },
      { label: "Organize your space 🧹", type: "text" }
    ]
  },
  Lonely: {
    questions: [
      "What kind of connection are you missing today?",
      "Have you reached out to someone recently?",
      "How do you feel when you're around others?"
    ],
    activities: [
      { label: "Call a loved one 📞", type: "text" },
      { label: "Go outside for fresh air 🌳", type: "text" },
      { label: "write in a Journal ✍️", type: "navigate", to: "/thoughtjournal" },
      { label: "Volunteer virtually ❤️", type: "text" },
      { label: "Join an online group 🌐", type: "text" }
    ]
  }
};

const EmotionCheckIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedEmotion, setSelectedEmotion] = useState(location.state?.selectedEmotion || null);
  const [step, setStep] = useState(location.state?.step || 0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [points, setPoints] = useState(0); // ✅ Points state

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setStep(1);
    setPoints(5); // ✅ Base points for starting check-in
  };

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateAnswers = () => {
    return answers.every((ans) => ans.trim() !== "");
  };

  const handleReflectionSubmit = () => {
    if (!validateAnswers()) {
      setError("Please answer all reflection questions before proceeding.");
      return;
    }
    setError("");
    setStep(2);
    setPoints(points + 15); // ✅ Reward points for completing reflections
    saveProgress(points + 15);
  };

  const handleActivityClick = (activity) => {
    setPoints(points + 5); // ✅ Reward points for trying activities
    saveProgress(points + 5);

    if (activity.type === "navigate") {
      navigate(activity.to, {
        state: { fromEmotionCheckIn: true, selectedEmotion, step: 2 }
      });
    } else {
      alert("Nice choice! Try this activity now.");
    }
  };

  const saveProgress = async (updatedPoints) => {
    try {
      const userId = "user123"; // Replace with actual logged-in user ID
      const game = "EmotionCheckIn";

      const response = await fetch("http://localhost:5000/api/progress/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, game, points: updatedPoints })
      });

      const data = await response.json();
      console.log("📤 Progress save response:", data);
    } catch (error) {
      console.error("❌ Error saving progress:", error);
    }
  };

  const goBack = () => {
    if (step === 1) {
      setSelectedEmotion(null);
      setStep(0);
    } else if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="emotion-container">
      <h2 className="title">🧠 Emotion Check-In</h2>

      {!selectedEmotion ? (
        <>
          <p className="subtitle">How are you feeling today?</p>
          <div className="emotion-grid">
            {Object.keys(emotions).map((emotion) => (
              <button
                key={emotion}
                onClick={() => handleEmotionClick(emotion)}
                className="emotion-button"
              >
                {emotion}
              </button>
            ))}
          </div>
        </>
      ) : step === 1 ? (
        <>
          <button onClick={goBack} className="back-btn">← Back</button>
          <h3 className="emotion-result">You feel: <span>{selectedEmotion}</span></h3>
          <p className="activity-title">Reflect on these questions:</p>
          <div className="reflection-section">
            {emotions[selectedEmotion].questions.map((q, i) => (
              <div key={i}>
                <p>{q}</p>
                <input
                  type="text"
                  className="reflection-textarea"
                  value={answers[i]}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  placeholder="Type your response here..."
                />
              </div>
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <br /><br />
          <button onClick={handleReflectionSubmit} className="submit-btn">Submit Reflections</button>
          
        </>
      ) : (
        <>
          <button onClick={goBack} className="back-btn">← Back</button>
          <h3 className="emotion-result">You feel: <span>{selectedEmotion}</span></h3>
          <div className="motivational-box">
            <p>Remember, every feeling is valid.<br />You're making progress. 🌟</p>
          </div>
          <p className="activity-title">Here are some self-care activities:</p>
          <div className="activity-list">
            {emotions[selectedEmotion].activities.map((activity, index) => (
              <button key={index} onClick={() => handleActivityClick(activity)} className="activity-btn">
                {activity.label}
              </button>
            ))}
          </div>
          <div className="badge-message">🏅 Streak badge earned for today!</div>
          <p className="points-earned">⭐ Points Earned: {points}</p>
        </>
      )}
    </div>
  );
};

export default EmotionCheckIn;
