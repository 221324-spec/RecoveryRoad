import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('supervisor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = e => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === email);
    if (emailExists) {
      setError('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In a real app, this would be hashed
      role,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    setError('');
    setSuccess('Account created successfully! Redirecting to login...');

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="login-container" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <form className="login-form" onSubmit={handleSignup} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <button type="button" className="simple-back" onClick={() => navigate('/')}>Back</button>
        <h1 style={{ color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h1>

        {error && <div className="error-message" style={{
          color: '#dc3545',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>{error}</div>}

        {success && <div style={{
          color: '#155724',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>{success}</div>}

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full Name"
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        />

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            backgroundColor: 'white'
          }}
        >
          <option value="supervisor">Supervisor</option>
          <option value="patient">Patient</option>
          <option value="ngo">NGO/Rehab Center</option>
        </select>

        <button
          className="login-button"
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          Create Account
        </button>

        <div className="login-switch" style={{
          textAlign: 'center',
          color: '#666'
        }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
