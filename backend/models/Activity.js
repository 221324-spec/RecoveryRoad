const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true },
  duration: Number, // in minutes
  intensity: { type: String, enum: ['low', 'medium', 'high'] },
  pointsEarned: { type: Number, default: 0 },
  notes: String,
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);