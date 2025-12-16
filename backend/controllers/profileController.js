const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    
    // Filter out sensitive fields
    delete updates.passwordHash;
    delete updates.role;
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};