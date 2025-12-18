import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function ProgressHistory() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/progressHistory/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch progress history: ${errText}`);
        }

        const data = await res.json();
        setHistory(data.history || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (loading) {
    return <div style={styles.container}><p>Loading progress history...</p></div>;
  }

  if (!token) {
    return (
      <div style={styles.container}>
        <h2>Welcome!</h2>
        <p>
          Please <a href="/login" style={styles.link}>login</a> to view your progress history.
        </p>
      </div>
    );
  }

  if (error) {
    return <div style={styles.container}><p style={{ color: "red" }}>Error: {error}</p></div>;
  }

  if (!history.length) {
    return <div style={styles.container}><p>No progress history found.</p></div>;
  }

  return (
    <div style={styles.container}>
      <h2>Your Progress History</h2>
      <div style={styles.timeline}>
        {history.map((item, index) => (
          <div key={item._id} style={styles.timelineItem}>
            <div style={styles.timelineDot}></div>
            <div style={styles.timelineContent}>
              <span style={styles.date}>{new Date(item.updatedAt).toLocaleString()}</span>
              <h4 style={styles.goal}>{item.goalTitle}</h4>
              <p style={styles.milestone}>
                {item.milestoneTitle} - <span style={{ color: getStatusColor(item.status), fontWeight: "bold" }}>{item.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Color-coded status
function getStatusColor(status) {
  if (status === "Done") return "green";
  if (status === "In Progress") return "orange";
  return "gray";
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  timeline: {
    position: "relative",
    paddingLeft: "20px",
    marginTop: "20px",
    borderLeft: "2px solid #ccc",
  },
  timelineItem: {
    position: "relative",
    marginBottom: "30px",
  },
  timelineDot: {
    position: "absolute",
    left: "-9px",
    top: "5px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    border: "2px solid white",
  },
  timelineContent: {
    marginLeft: "20px",
    padding: "5px 10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  },
  date: {
    fontSize: "0.85rem",
    color: "#555",
  },
  goal: {
    margin: "5px 0",
  },
  milestone: {
    margin: 0,
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};
