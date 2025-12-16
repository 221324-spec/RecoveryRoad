const MoodEntry = require('../models/MoodEntry');
const TriggerLog = require('../models/TriggerLog');
const Activity = require('../models/Activity');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.postMood = async (req, res) => {
  try {
    const patientId = req.params.id;
    const { mood, craving, journal, timestamp } = req.body;
    const moodValueMap = { '😊': 4, '😐': 3, '😔': 2, '😠': 1, 'great':4,'okay':3,'down':2,'angry':1 };
    const moodEntry = new MoodEntry({
      patient: patientId,
      mood,
      moodValue: moodValueMap[mood] || 3,
      craving,
      journal,
      timestamp: timestamp ? new Date(timestamp) : undefined,
      dateString: new Date().toDateString()
    });
    await moodEntry.save();
    res.json({ success: true, moodEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save mood' });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const patientId = req.params.id;
    const limit = parseInt(req.query.limit) || 7;
    const moods = await MoodEntry.find({ patient: patientId }).sort({ createdAt: -1 }).limit(limit);
    res.json({ moods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
};

exports.getMoodStats = async (req, res) => {
  try {
    const patientId = req.params.id;
    const range = parseInt(req.query.range) || 7;
    const moodHistory = await MoodEntry.find({ patient: patientId }).sort({ createdAt: -1 }).limit(range);
    const triggerLog = await TriggerLog.find({ patient: patientId }).limit(100);

    const recentEntries = moodHistory || [];
    const lowCravingDays = recentEntries.filter(entry => (entry.craving || 0) <= 3).length;
    const totalCheckIns = await MoodEntry.countDocuments({ patient: patientId });
    const avgMood = recentEntries.length > 0
      ? recentEntries.reduce((sum, entry) => sum + (entry.moodValue || 3), 0) / recentEntries.length
      : 3;

    res.json({
      streakDays: lowCravingDays,
      totalCheckIns,
      avgMood,
      triggersIdentified: triggerLog.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute stats' });
  }
};

exports.postTrigger = async (req, res) => {
  try {
    const patientId = req.params.id;
    const { triggers, customTrigger } = req.body;
    const entry = new TriggerLog({ patient: patientId, triggers, customTrigger, dateString: new Date().toDateString() });
    await entry.save();
    res.json({ success: true, entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save trigger' });
  }
};

exports.getTriggers = async (req, res) => {
  try {
    const patientId = req.params.id;
    const limit = parseInt(req.query.limit) || 20;
    const triggers = await TriggerLog.find({ patient: patientId }).sort({ createdAt: -1 }).limit(limit);
    res.json({ triggers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch triggers' });
  }
};

exports.getTopTriggers = async (req, res) => {
  try {
    const patientId = req.params.id;
    const range = parseInt(req.query.range) || 30;
    const triggerEntries = await TriggerLog.find({ patient: patientId }).sort({ createdAt: -1 }).limit(range);

    const counts = {};
    triggerEntries.forEach(entry => {
      if (entry.triggers) {
        entry.triggers.forEach(trigger => {
          counts[trigger] = (counts[trigger] || 0) + 1;
        });
      }
      if (entry.customTrigger && entry.customTrigger.name) {
        counts[entry.customTrigger.name] = (counts[entry.customTrigger.name] || 0) + 1;
      }
    });

    const sortedTriggers = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const top = sortedTriggers[0] || null;

    res.json({ top, counts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute top triggers' });
  }
};

exports.postActivity = async (req, res) => {
  try {
    const patientId = req.params.id;
    const { activity, icon, points, category, date, time, status, notes } = req.body;
    const act = new Activity({ patient: patientId, activity, icon, points, category, date, time, status, notes });
    await act.save();

    if (status === 'completed') {
      await User.findByIdAndUpdate(patientId, { $inc: { recoveryPoints: points || 0 } });
    }

    res.json({ success: true, activity: act });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save activity' });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const patientId = req.params.id;
    const activities = await Activity.find({ patient: patientId }).sort({ createdAt: -1 }).limit(100);
    res.json({ activities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

exports.getPoints = async (req, res) => {
  try {
    const patientId = req.params.id;
    const user = await User.findById(patientId);
    res.json({ points: user ? user.recoveryPoints || 0 : 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch points' });
  }
};