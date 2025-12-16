require('dotenv').config();
const mongoose = require('mongoose');
const dbConnect = require('../config/db');
const User = require('../models/User');
const MoodEntry = require('../models/MoodEntry');
const TriggerLog = require('../models/TriggerLog');
const Activity = require('../models/Activity');

const run = async () => {
  try {
    await dbConnect();
    console.log('Connected to database...');
    
    // Clear existing data
    await User.deleteMany({});
    await MoodEntry.deleteMany({});
    await TriggerLog.deleteMany({});
    await Activity.deleteMany({});
    console.log('Cleared existing data...');

    // Create demo supervisor and patient
    const supervisor = await User.create({ 
      name: 'Dr. Emma Wilson', 
      email: 'supervisor@example.com', 
      role: 'supervisor' 
    });
    
    const patient = await User.create({ 
      name: 'Demo Patient', 
      email: 'patient@example.com', 
      role: 'patient', 
      assignedSupervisor: supervisor._id,
      recoveryPoints: 150
    });
    console.log('Created demo users...');

    // Create sample mood entries
    const moodData = [
      { moodValue: 8, cravingLevel: 2, notes: 'Feeling great today!', journalEntry: 'Had a productive morning with meditation.' },
      { moodValue: 6, cravingLevel: 4, notes: 'Decent day', journalEntry: 'Some stress at work but managed it well.' },
      { moodValue: 4, cravingLevel: 6, notes: 'Struggling a bit', journalEntry: 'Tough day, had some triggers but stayed strong.' }
    ];

    for (const mood of moodData) {
      await MoodEntry.create({
        userId: patient._id,
        ...mood,
        date: new Date()
      });
    }
    console.log('Created mood entries...');

    // Create sample trigger logs
    await TriggerLog.create({
      userId: patient._id,
      triggerType: 'stress',
      intensity: 6,
      notes: 'Work deadline pressure',
      date: new Date()
    });

    await TriggerLog.create({
      userId: patient._id,
      triggerType: 'social',
      intensity: 4,
      notes: 'Social event with alcohol present',
      date: new Date()
    });
    console.log('Created trigger logs...');

    // Create sample activities
    const activities = [
      { activityType: 'meditation', duration: 30, intensity: 'medium', pointsEarned: 15, notes: 'Morning mindfulness session' },
      { activityType: 'exercise', duration: 45, intensity: 'high', pointsEarned: 25, notes: 'Cardio workout at gym' },
      { activityType: 'therapy', duration: 60, intensity: 'medium', pointsEarned: 30, notes: 'Weekly therapy session' }
    ];

    for (const activity of activities) {
      await Activity.create({
        userId: patient._id,
        ...activity,
        date: new Date()
      });
    }
    console.log('Created activities...');

    console.log('🎉 Seed complete!');
    console.log('Supervisor ID:', supervisor._id.toString());
    console.log('Patient ID:', patient._id.toString());
    console.log('Demo data created successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

run();