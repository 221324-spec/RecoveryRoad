import React from 'react';
// Use image from public folder - homepageimage.png
import './HomePage.css';


const roles = [
  { label: 'Supervisor', value: 'supervisor' },
  { label: 'Patient', value: 'patient' },
];

const ChooseRolePage = ({ onSelectRole, onBack }) => {
  return (
    <div className="homepage-bg" style={{ backgroundImage: `url(/homepageimage.png)` }}>
      <div className="homepage-overlay">
        <div className="homepage-content">
          <h1 className="homepage-title">Choose Your Role</h1>
          <div className="role-btn-group">
            {roles.map(role => (
              <button
                key={role.value}
                className="homepage-start-btn role-btn"
                onClick={() => onSelectRole(role.value)}
              >
                {role.label}
              </button>
            ))}
          </div>
          <button className="homepage-start-btn simple-back" onClick={onBack} style={{marginTop: '2rem', background: '#64748b'}}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRolePage;
