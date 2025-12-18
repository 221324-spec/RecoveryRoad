// frontend/src/pages/Dashboard.js

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout} style={{ padding: 10, marginTop: 20 }}>Logout</button>
    </div>
  );
}
