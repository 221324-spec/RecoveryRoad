const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'recoveryroad-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated.'
      });
    }

    req.user = {
      userId: user._id,
      role: user.role,
      email: user.email
    };
    req.currentUser = user;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!roles.includes(req.user.role) && !roles.includes('all')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Check if user owns resource or has admin access
const ownsResource = (resourceUserIdField = 'userId') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id || req.params.userId;
      const resource = await getResourceById(req.params.resourceType, resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found.'
        });
      }

      const resourceUserId = resource[resourceUserIdField];

      // Admin can access everything
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // NGO can access patient data
      if (req.user.role === 'ngo' && resource.role === 'patient') {
        req.resource = resource;
        return next();
      }

      // Supervisor can access their assigned patients
      if (req.user.role === 'supervisor' && resourceUserId?.toString() === req.user.userId.toString()) {
        req.resource = resource;
        return next();
      }

      // User owns the resource
      if (resourceUserId?.toString() === req.user.userId.toString()) {
        req.resource = resource;
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not own this resource.'
      });

    } catch (error) {
      console.error('Resource ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Authorization check failed.'
      });
    }
  };
};

// Helper function to get resource by ID
async function getResourceById(resourceType, id) {
  const models = {
    user: require('../models/User'),
    message: require('../models/Message'),
    appointment: require('../models/Appointment'),
    moodentry: require('../models/MoodEntry'),
    activity: require('../models/Activity'),
    triggerlog: require('../models/TriggerLog'),
    alert: require('../models/Alert'),
    notification: require('../models/Notification')
  };

  const Model = models[resourceType.toLowerCase()];
  if (!Model) return null;

  return await Model.findById(id);
}

// Check if user can access patient data
const canAccessPatient = (patientId) => {
  return async (req, res, next) => {
    try {
      const patient = await User.findById(patientId);

      if (!patient || patient.role !== 'patient') {
        return res.status(404).json({
          success: false,
          message: 'Patient not found.'
        });
      }

      // Admin can access all patients
      if (req.user.role === 'admin') {
        req.patient = patient;
        return next();
      }

      // NGO can access all patients
      if (req.user.role === 'ngo') {
        req.patient = patient;
        return next();
      }

      // Supervisor can access assigned patients
      if (req.user.role === 'supervisor') {
        const supervisor = await User.findById(req.user.userId);
        if (supervisor && patient.assignedSupervisor?.toString() === supervisor._id.toString()) {
          req.patient = patient;
          return next();
        }
      }

      // Patient can access their own data
      if (patient._id.toString() === req.user.userId.toString()) {
        req.patient = patient;
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'Access denied. Cannot access this patient\'s data.'
      });

    } catch (error) {
      console.error('Patient access check error:', error);
      res.status(500).json({
        success: false,
        message: 'Access check failed.'
      });
    }
  };
};

// Rate limiting for sensitive operations
const rateLimit = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.user?.userId || req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!requests.has(key)) {
      requests.set(key, []);
    }

    const userRequests = requests.get(key);
    const recentRequests = userRequests.filter(time => time > windowStart);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    recentRequests.push(now);
    requests.set(key, recentRequests);

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  ownsResource,
  canAccessPatient,
  rateLimit
};
