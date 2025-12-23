// ===============================
// MERGED SERVER.JS (FINAL VERSION)
// ===============================

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ----------------------
// Middleware
// ----------------------
app.use(cors());
app.use(express.json());

// Request logger (from Module 3)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Authorization header:", req.headers.authorization);
  next();
});

// ----------------------
// MongoDB Connection
// ----------------------
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`✅ Connected to MongoDB - ${MONGO_URI}`))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------
// Existing Gamified Recovery Toolkit Routes
// ----------------------
app.use("/api/progress", require("./routes/progress"));


// ----------------------
// MODULE 3 ROUTES (Added Exactly As-Is)
// ----------------------
try {
  const authRoutes = require("./routes/auth");
  app.use("/api/auth", authRoutes);
  console.log("Auth routes loaded successfully");
} catch (error) {
  console.error("ERROR LOADING AUTH ROUTES:", error.message);
}

try {
  const goalsRoutes = require("./routes/goals");
  app.use("/api/goals", goalsRoutes);
  console.log("Goals routes loaded successfully");
} catch (error) {
  console.error("ERROR LOADING GOALS ROUTES:", error.message);
}

try {
  const usersRouter = require("./routes/users");
  app.use("/api/users", usersRouter);
  console.log("Users routes loaded successfully");
} catch (error) {
  console.error("ERROR LOADING USERS ROUTES:", error.message);
}

try {
  const goalProgressRoutes = require("./routes/goalProgressRoutes");
  app.use("/api/goal-progress", goalProgressRoutes);
  console.log("Goal Progress routes loaded successfully");
} catch (error) {
  console.error("ERROR LOADING GOAL PROGRESS ROUTES:", error.message);
}

try {
  const milestoneRoutes = require("./routes/milestones");
  app.use("/api/milestones", milestoneRoutes);
  console.log("Milestones routes loaded successfully");
} catch (error) {
  console.error("ERROR LOADING MILESTONES ROUTES:", error.message);
}
// ----------------------
// Progress History Routes (Patients / Goals / Milestones)
// ----------------------
try {
  const progressHistoryRoutes = require("./routes/ProgressHistory");
  app.use("/api/ProgressHistory", progressHistoryRoutes);
  console.log("Progress History routes loaded successfully");
} catch (error) {
  console.error("ERROR LOADING PROGRESS HISTORY ROUTES:", error.message);
}



// ----------------------
// Health Check
// ----------------------
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ----------------------
// 404 Handler
// ----------------------
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.url);
  res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
});

// ----------------------
// Error Handler
// ----------------------
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ----------------------
// Server Start
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Merged Server running on port ${PORT}`)
);
