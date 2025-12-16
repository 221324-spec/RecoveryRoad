import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SupervisorDashboard from './components/supervisor/SupervisorDashboard';
import PatientDashboard from './components/patient/PatientDashboard';
import NgoDashboard from './components/ngo/NgoDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DemoDataInitializer from './components/DemoDataInitializer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SupervisorProfile from './components/supervisor/Profile';
import PatientProfile from './components/patient/Profile';

function App() {
  return (
    <AuthProvider>
      <DemoDataInitializer />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/supervisor/dashboard" element={<ProtectedRoute allowedRoles={['supervisor']}><SupervisorDashboard /></ProtectedRoute>} />
          <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/ngo/dashboard" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route
            path="/supervisor/profile"
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <SupervisorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/profile"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
