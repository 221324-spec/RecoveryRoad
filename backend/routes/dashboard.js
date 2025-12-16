const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticate);

// Get dashboard data
router.get('/', dashboardController.getDashboard);

// Get real-time stats
router.get('/stats', dashboardController.getRealtimeStats);

module.exports = router;