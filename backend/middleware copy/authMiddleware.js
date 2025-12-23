const jwt = require('jsonwebtoken');

// Auth middleware that verifies JWT and attaches user info to `req.user`.
// Uses the same `JWT_SECRET` and claim names as the rest of the backend.
const authMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key-change-in-production'
      );

      // Keep shape compatible with other code (use _id property where appropriate)
      req.user = { _id: decoded.userId || decoded.id, email: decoded.email, role: decoded.role };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = authMiddleware;
