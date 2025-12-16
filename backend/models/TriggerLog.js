const mongoose = require('mongoose');

const TriggerLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  triggerType: { type: String, required: true },
  intensity: { type: Number, min: 1, max: 10 },
  notes: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('TriggerLog', TriggerLogSchema);