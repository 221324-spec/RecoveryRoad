// backend/routes/goals.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // your middleware
const requireRole = require('../middleware/roleMiddleware'); // optional
const Goal = require('../models/Goal');
const User = require('../models/User');



// POST /api/goals  (supervisor creates)
router.post('/', auth, requireRole ? requireRole('supervisor') : (req,res,next)=>next(), async (req, res) => {
  try {
    const { title, description, category, goalType, user: userId, milestones = [] } = req.body;
    if (!title || !userId) return res.status(400).json({ message: 'title and user are required' });

    const userExists = await User.findById(userId); // use _id
    if (!userExists) return res.status(404).json({ message: 'Assigned user not found' });

    const goal = new Goal({
      title,
      description,
      category,
      goalType,
      supervisor: req.user._id,
      user: userExists._id, // store _id
      milestones: milestones.map(m => ({ title: m.title || m }))
    });

    const done = goal.milestones.filter(m => m.completed).length;
    goal.progress = goal.milestones.length ? Math.round((done / goal.milestones.length)*100) : 0;

    await goal.save();
  const supervisor = await User.findById(req.user._id); // fetch full user
res.status(201).json({
  message: 'Goal assigned successfully',
  supervisorName: supervisor.name || supervisor.username,
  patientName: userExists.name,
  goalTitle: title,
});


  } catch (err) {
    console.error('POST /api/goals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/goals/my  — goals for logged-in patient
router.get('/my', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const goals = await Goal.find({ user: userId }).populate('supervisor', 'name email');
    res.json(goals);
  } catch (err) {
    console.error('GET /api/goals/my error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/goals/supervisor  — goals created by logged-in supervisor
router.get('/supervisor', auth, async (req, res) => {
  try {
    const supId = req.user._id;
    const goals = await Goal.find({ supervisor: supId }).populate('user', 'name email');
    res.json(goals);
  } catch (err) {
    console.error('GET /api/goals/supervisor error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/goals/:id/milestone  — toggle milestone
router.post('/:id/milestone', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const index = parseInt(req.body.index, 10);
    if (isNaN(index)) return res.status(400).json({ message: 'index required' });

    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    const isSupervisorOwner = req.user.role === 'supervisor' && goal.supervisor.toString() === req.user._id.toString();
    const isAssignedUser = goal.user.toString() === req.user._id.toString();
    if (!isSupervisorOwner && !isAssignedUser && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ms = goal.milestones[index];
    if (!ms) return res.status(400).json({ message: 'milestone not found' });

    ms.completed = !ms.completed;
    ms.completedAt = ms.completed ? new Date() : undefined;

    const doneCount = goal.milestones.filter(m => m.completed).length;
    goal.progress = goal.milestones.length ? Math.round((doneCount / goal.milestones.length)*100) : 0;

    if (goal.progress === 100 && !goal.completed) {
      goal.completed = true;
      goal.completedAt = new Date();
    } else if (goal.progress < 100 && goal.completed) {
      goal.completed = false;
      goal.completedAt = null;
    }

    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error('POST /api/goals/:id/milestone error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/goals/:id  — delete (supervisor or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (req.user.role === 'supervisor' && goal.supervisor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await goal.remove();
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    console.error('DELETE /api/goals/:id error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
