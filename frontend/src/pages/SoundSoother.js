import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // For saving to MongoDB

import beachSound from '../assets/beach.mp3';
import rainSound from '../assets/rain.mp3';
import forestSound from '../assets/forest.mp3';
import fireSound from '../assets/fire.mp3';

import beachVideo from '../assets/beach.mp4';
import rainVideo from '../assets/rain.mp4';
import forestVideo from '../assets/forest.mp4';
import fireVideo from '../assets/fire.mp4';

const sceneData = {
  beach: {
    name: "Beach",
    audio: beachSound,
    background: "#b3e5fc",
    video: beachVideo
  },
  rain: {
    name: "Rain",
    audio: rainSound,
    background: "#cfd8dc",
    video: rainVideo
  },
  forest: {
    name: "Forest",
    audio: forestSound,
    background: "#a5d6a7",
    video: forestVideo
  },
  fire: {
    name: "Campfire",
    audio: fireSound,
    background: "#ffe082",
    video: fireVideo
  }
};

function SoundSoother() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialScene = location.state?.scene || null;

  const [selectedScene, setSelectedScene] = useState(initialScene);
  const [gameStarted, setGameStarted] = useState(false);
  const [, setWatchTime] = useState(0); // Remove ESLint warning
  const [pointsAwarded, setPointsAwarded] = useState(false);
  const ambientRef = useRef(null);

  // ⏱ Track watch time and give points after 2 minutes
  useEffect(() => {
    let interval;

    if (gameStarted && !pointsAwarded) {
      interval = setInterval(() => {
        setWatchTime(prev => {
          const newTime = prev + 1;

          if (newTime === 120) {
            setPointsAwarded(true);
            axios.post("http://localhost:5000/api/progress/save", {
              userId: "user123", // Replace with actual user ID
              game: "SoundSoother",
              points: 10
            }).then(() => {
              console.log("Points awarded for 2-minute relaxation ✅");
            }).catch(err => {
              console.error("Error saving points:", err);
            });
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted, pointsAwarded]);

  const startRelaxation = () => {
    setGameStarted(true);
    const ambient = new Audio(sceneData[selectedScene].audio);
    ambient.loop = true;
    ambient.volume = 0.4;
    ambient.play();
    ambientRef.current = ambient;
  };

  const goBack = () => {
    if (ambientRef.current) {
      ambientRef.current.pause();
    }
    navigate('/soundsootherselection');
  };

  useEffect(() => {
    return () => {
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
    };
  }, [selectedScene]);

  return (
    <div
      style={{
        backgroundColor: selectedScene ? sceneData[selectedScene].background : "#fff",
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        zIndex: 1
      }}
    >
      {/* Background Video */}
      {selectedScene && gameStarted && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1
          }}
        >
          <source src={sceneData[selectedScene].video} type="video/mp4" />
        </video>
      )}

      {/* UI content */}
      {!selectedScene ? (
        <>
          <h1>Sound Soother</h1>
          <p>Choose a calming scene to begin:</p>
          {Object.keys(sceneData).map(scene => (
            <button key={scene} onClick={() => setSelectedScene(scene)} style={buttonStyle}>
              {sceneData[scene].name}
            </button>
          ))}
        </>
      ) : !gameStarted ? (
        <>
          <h2>{sceneData[selectedScene].name}</h2>
          <button onClick={startRelaxation} style={buttonStyle}>Start Relaxing</button>
          <button onClick={goBack} style={backButtonStyle}>Back</button>
        </>
      ) : (
        <>
          <h2>{sceneData[selectedScene].name}</h2>
          <p>Enjoy the relaxing ambient sound.</p>
          <p
            onClick={goBack}
            style={{
              color: '#000',
              fontSize: '16px',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Choose Another Scene
          </p>
        </>
      )}
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '12px 24px',
  fontSize: '16px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  minWidth: '200px'
};

const backButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#79cdc9ff'
};

export default SoundSoother;
