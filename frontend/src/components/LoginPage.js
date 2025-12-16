import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Connect to real backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Real backend authentication successful
        const { token, user } = data.data;
        login(token, user.role);

        // Navigate based on role
        switch (user.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'supervisor':
            navigate('/supervisor/dashboard');
            break;
          case 'patient':
            navigate('/patient/dashboard');
            break;
          case 'ngo':
            navigate('/ngo/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <form className="login-form" onSubmit={handleLogin} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <button type="button" className="simple-back" onClick={() => navigate('/')}>Back</button>
        <h1 style={{ color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h1>

        {error && <div className="error-message" style={{
          color: '#dc3545',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>{error}</div>}

        <div style={{
          backgroundColor: '#e7f3ff',
          border: '1px solid #b8daff',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          color: '#004085'
        }}>
          <strong>Demo Accounts:</strong><br />
          <strong>Admin:</strong> admin@recoveryroad.com / admin123<br />
          <strong>Supervisor:</strong> sarah.johnson@recoveryroad.com / demo123<br />
          <strong>Patient:</strong> john.smith@recoveryroad.com / demo123<br />
          <strong>NGO:</strong> admin@hopecenter.org / demo123
        </div>

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
          placeholder="Password"
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '1rem'
          }}
        />

        <button
          className="login-button"
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="login-switch" style={{
          textAlign: 'center',
          color: '#666'
        }}>
          Don't have an account? <Link to="/signup" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
