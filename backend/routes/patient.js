const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Moods
router.post('/:id/moods', patientController.postMood);
router.get('/:id/moods', patientController.getMoods);
router.get('/:id/moods/stats', patientController.getMoodStats);

// Triggers
router.post('/:id/triggers', patientController.postTrigger);
router.get('/:id/triggers', patientController.getTriggers);
router.get('/:id/triggers/top', patientController.getTopTriggers);

// Activities
router.post('/:id/activities', patientController.postActivity);
router.get('/:id/activities', patientController.getActivities);
router.get('/:id/points', patientController.getPoints);

module.exports = router;