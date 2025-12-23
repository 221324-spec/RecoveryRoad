const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // Use the same claim name (`userId`) and the same default secret
  // as the rest of the backend to avoid signature/claim mismatches.
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
