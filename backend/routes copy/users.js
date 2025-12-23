const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const requireRole = require('../middleware/roleMiddleware');

// GET all patients (role === 'user') — only accessible by supervisors
router.get('/patients', authMiddleware, requireRole('supervisor'), async (req, res) => {
  try {
 const patients = await User.find({ role: 'user' }).select('_id name username');

    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
