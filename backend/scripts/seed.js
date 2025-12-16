require('dotenv').config();
const mongoose = require('mongoose');
const dbConnect = require('../config/db');
const User = require('../models/User');
const MoodEntry = require('../models/MoodEntry');
const TriggerLog = require('../models/TriggerLog');
const Activity = require('../models/Activity');

const run = async () => {
  await dbConnect();
  await User.deleteMany({});
  await MoodEntry.deleteMany({});
  await TriggerLog.deleteMany({});
  await Activity.deleteMany({});

  const supervisor = await User.create({ name: 'Demo Supervisor', email: 'supervisor@example.com', role: 'supervisor' });
  const patient = await User.create({ name: 'Demo Patient', email: 'patient@example.com', role: 'patient', assignedSupervisor: supervisor._id });

  const moods = [ '😊', '😐', '😔', '😊', '😐', '😔', '😊' ];
  for (let i=0;i<moods.length;i++) {
    await MoodEntry.create({ patient: patient._id, mood: moods[i], moodValue: {'😊':4,'😐':3,'😔':2,'😠':1}[moods[i]], craving: Math.floor(Math.random()*8), journal: 'Sample entry ' + (i+1), dateString: new Date().toDateString() });
  }

  await TriggerLog.create({ patient: patient._id, triggers: ['stress'], customTrigger: null, dateString: new Date().toDateString() });
  await Activity.create({ patient: patient._id, activity: 'Morning Meditation', icon: '🧘', points: 15, category: 'Wellness', date: new Date().toDateString(), time: '07:00', status: 'completed' });

  console.log('Seed complete. Supervisor id:', supervisor._id.toString(), 'Patient id:', patient._id.toString());
  process.exit(0);
};

run().catch(err=>{console.error(err); process.exit(1)});
