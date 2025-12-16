const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moodValue: { type: Number, required: true, min: 1, max: 10 },
  cravingLevel: { type: Number, min: 1, max: 10 },
  notes: String,
  journalEntry: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);