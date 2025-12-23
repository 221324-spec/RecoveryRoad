const express = require("express");
const router = express.Router();
const GoalProgress = require("../models/GoalProgress");
const  protect   = require("../middleware/authMiddleware");

// POST - Add a new progress update (User)
router.post("/", protect, async (req, res) => {
  try {
    const { goalId, progress, note } = req.body;

    const newProgress = await GoalProgress.create({
      goal: goalId,
      user: req.user._id,
      progress,
      note
    });

    res.status(201).json(newProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Get progress history for a goal (User)
router.get("/:goalId", protect, async (req, res) => {
  try {
    const history = await GoalProgress.find({
      goal: req.params.goalId,
      user: req.user._id
    }).sort({ createdAt: 1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PUT - Update milestone status
router.put("/milestones/update-status", protect, async (req, res) => {
  try {
    const { goalId, milestoneId, status } = req.body;

    // Import your Goal model (assuming milestones are inside Goal)
    const Goal = require("../models/Goal");

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    const milestone = goal.milestones.id(milestoneId);
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });

    milestone.status = status;
    await goal.save();

    res.json({ message: "Milestone status updated", milestone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router; // ✅ Must export the router

