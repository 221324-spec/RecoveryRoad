const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController');

// Get all patients assigned to a supervisor
router.get('/:supervisorId/patients', supervisorController.getPatients);

// Get detailed overview of a specific patient
router.get('/:supervisorId/patients/:patientId/overview', supervisorController.getPatientOverview);

// Get aggregated statistics for all patients
router.get('/:supervisorId/statistics', supervisorController.getPatientStatistics);

// Get alerts and notifications
router.get('/:supervisorId/alerts', supervisorController.getAlerts);

module.exports = router;