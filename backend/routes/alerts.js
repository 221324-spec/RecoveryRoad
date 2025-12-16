const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticate);

// Get alerts for current user
router.get('/', alertController.getAlerts);

// Mark alert as read
router.patch('/:alertId/read', alertController.markAsRead);

// Record response to alert
router.post('/:alertId/response', alertController.recordResponse);

// Admin/Supervisor only routes
router.post('/', authorize('admin', 'supervisor'), alertController.createAlert);
router.put('/:alertId', authorize('admin', 'supervisor'), alertController.updateAlert);
router.delete('/:alertId', authorize('admin', 'supervisor'), alertController.deleteAlert);

// Admin only routes
router.get('/admin/stats', authorize('admin'), alertController.getAlertStats);

module.exports = router;