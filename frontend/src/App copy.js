// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// ---------------- GAMIFIED RECOVERY TOOLKIT IMPORTS ----------------
import GameDashboard from "./pages/GameDashboard";
import BreathingGame from "./pages/BreathingGame";
import MemoryGame from "./pages/MemoryGame";
import MoodPop from "./pages/MoodPop";
import SoundSoother from './pages/SoundSoother';
import SoundSootherSelection from './pages/SoundSootherSelection';
import EmotionalInsight from './pages/EmotionalInsight';
import MotivationBuilder from './pages/MotivationBuilder';
import EmotionCheckIn from "./pages/EmotionCheckIn"; 
import ThoughtJournal from './pages/ThoughtJournal';
import LearnHub from "./pages/LearnHub";
import MindWaveGame from "./pages/MindWaveGame";
import RecoveryWheelGame from "./pages/RecoveryWheelGame"; 
import Flashcards from "./pages/Flashcards";
import GroundingExercise from "./pages/GroundingExercise";
import MusicTherapy from "./pages/MusicTherapy";
import TriviaGame from "./pages/TriviaGame";
import ImagePuzzle from "./pages/ImagePuzzle";
import SelfReflectionGame from "./pages/SelfReflectionGame";
import NavigatorStyleGame from "./pages/NavigatorStyleGame";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import LearningLibrary from "./pages/LearningLibrary";
import DrugAddiction from "./pages/DrugAddiction";
import DrugTypes from "./pages/DrugTypes";
import AlcoholInfo from "./pages/AlcoholInfo";
import CocaineInfo from "./pages/CocaineInfo";
import MarijuanaInfo from "./pages/MarijuanaInfo";
import OpioidsInfo from "./pages/OpioidsInfo";
import CrystalMethInfo from "./pages/CrystalMethInfo";
import Awareness from "./pages/Awareness";
import Action from "./pages/Action";
import Progress from "./pages/Progress";
import MentalHealth from "./pages/MentalHealth";
import CausesOfDrugAddiction from "./pages/CausesOfDrugAddiction";

// ----------------  ----------------
import Login from './pages/Login';
import Register from './pages/Register';
import GoalsDashboard from './pages/GoalsDashboard';
import AssignGoal from './pages/AssignGoal';
import GoalsList from './pages/GoalsList';
import PatientGoals from './pages/PatientGoals';
import MilestoneDashboard from './pages/MilestoneDashboard';
import MyGoals from './pages/MyGoals';
import LandingPage from './pages/LandingPage';
import MilestoneUpdates from './pages/MilestoneUpdates';
import ProgressHistory from './pages/ProgressHistory';

// ---------------- PROTECTED ROUTE ----------------
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

// ---------------- HOME REDIRECT ----------------
function HomeRedirect() {
  return <Navigate to="/dashboard" replace />;
}

// ---------------- FINAL MERGED APP ----------------
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ---------- PUBLIC AUTH ROUTES ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ---------- DEFAULT REDIRECT ---------- */}
          <Route path="/" element={<HomeRedirect />} />

          {/* ---------- PUBLIC DASHBOARD (NO LOGIN) ---------- */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ----------------------------------------- */}
          {/*         GAMIFIED TOOLKIT ROUTES           */}
          {/* ----------------------------------------- */}
          <Route path="/GameDashboard" element={<GameDashboard />} />
          <Route path="/breathing" element={<BreathingGame />} />
          <Route path="/mindmatch" element={<MemoryGame />} />
          <Route path="/moodpop" element={<MoodPop />} />
          <Route path="/soundsoother" element={<SoundSoother />} />
          <Route path="/soundsootherselection" element={<SoundSootherSelection />} />
          <Route path="/emotionalinsight" element={<EmotionalInsight />} />
          <Route path="/motivationbuilder" element={<MotivationBuilder />} />
          <Route path="/emotioncheckin" element={<EmotionCheckIn />} />
          <Route path="/thoughtjournal" element={<ThoughtJournal />} />
          <Route path="/learnhub" element={<LearnHub />} />
          <Route path="/mindwavegame" element={<MindWaveGame />} />
          <Route path="/recoverywheelgame" element={<RecoveryWheelGame />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/groundingexercise" element={<GroundingExercise />} />
          <Route path="/musictherapy" element={<MusicTherapy />} />
          <Route path="/triviagame" element={<TriviaGame />} />
          <Route path="/imagepuzzle" element={<ImagePuzzle />} />
          <Route path="/selfreflectiongame" element={<SelfReflectionGame />} />
          <Route path="/navigatorstylegame" element={<NavigatorStyleGame />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/learninglibrary" element={<LearningLibrary />} />
          <Route path="/drugaddiction" element={<DrugAddiction />} />
          <Route path="/drugtypes" element={<DrugTypes />} />
          <Route path="/alcoholinfo" element={<AlcoholInfo />} />
          <Route path="/cocaineinfo" element={<CocaineInfo />} />
          <Route path="/marijuanainfo" element={<MarijuanaInfo />} />
          <Route path="/opioidsinfo" element={<OpioidsInfo />} />
          <Route path="/crystalmethinfo" element={<CrystalMethInfo />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/action" element={<Action />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/mentalhealth" element={<MentalHealth />} />
          <Route path="/causesofdrugaddiction" element={<CausesOfDrugAddiction />} />

          {/* ----------------------------------------- */}
          {/*           MODULE 3 GOALS (PROTECTED)      */}
          {/* ----------------------------------------- */}
          <Route
            path="/goalsdashboard"
            element={
              <ProtectedRoute>
                <GoalsDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assign-goal"
            element={
              <ProtectedRoute>
                <AssignGoal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/goals-list"
            element={
              <ProtectedRoute>
                <GoalsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-goals"
            element={
              <ProtectedRoute>
                <MyGoals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient-goals"
            element={
              <ProtectedRoute>
                <PatientGoals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/milestone-dashboard"
            element={
              <ProtectedRoute>
                <MilestoneDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/landingpage"
            element={
             
                <LandingPage />
             
            }
          />

          <Route
            path="/milestoneupdates"
            element={
              <ProtectedRoute>
                <MilestoneUpdates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/progresshistory"
            element={
              <ProtectedRoute>
                <ProgressHistory />
              </ProtectedRoute>
            }
          />

          {/* ---------- CATCH ALL ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


