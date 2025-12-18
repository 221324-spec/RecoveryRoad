import React, { useEffect, useState } from "react";

const PatientGoals = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Fetch patient's goals from backend
    const fetchPatientGoals = async () => {
      // Replace with API call
      const data = [
        { id: 1, title: "Complete Exercise A", progress: 50 },
        { id: 2, title: "Read Chapter 3", progress: 20 },
      ];
      setGoals(data);
    };
    fetchPatientGoals();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Goals</h2>
      {goals.length === 0 ? (
        <p>No goals assigned yet.</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              {goal.title} — Progress: {goal.progress}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientGoals;
