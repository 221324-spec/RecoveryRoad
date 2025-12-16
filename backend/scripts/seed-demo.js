const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('../config/db');
const User = require('../models/User');
const Message = require('../models/Message');
const MoodEntry = require('../models/MoodEntry');
const TriggerLog = require('../models/TriggerLog');
const Activity = require('../models/Activity');
const Appointment = require('../models/Appointment');
const Alert = require('../models/Alert');
const Notification = require('../models/Notification');
const Organization = require('../models/Organization');

async function seed() {
  try {
    await dbConnect();

    // Clear existing data
    await User.deleteMany({});
    await Message.deleteMany({});
    await MoodEntry.deleteMany({});
    await TriggerLog.deleteMany({});
    await Activity.deleteMany({});
    await Appointment.deleteMany({});
    await Alert.deleteMany({});
    await Notification.deleteMany({});
    await Organization.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Hash password for demo users
    const salt = await bcrypt.genSalt(12);
    const demoPassword = await bcrypt.hash('demo123', salt);

    // Create Admin User
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@recoveryroad.com',
      passwordHash: await bcrypt.hash('admin123', salt),
      role: 'admin',
      phone: '+1-555-0100',
      address: {
        street: '123 Admin Street',
        city: 'System City',
        state: 'SC',
        zipCode: '12345'
      },
      isActive: true,
      preferences: {
        notifications: { email: true, sms: false, push: true }
      }
    });

    // Create Supervisors
    const supervisor1 = await User.create({
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@recoveryroad.com',
      passwordHash: demoPassword,
      role: 'supervisor',
      phone: '+1-555-0101',
      address: {
        street: '456 Health Ave',
        city: 'Medical City',
        state: 'MC',
        zipCode: '23456'
      },
      specialization: ['addiction', 'mental-health', 'dual-diagnosis'],
      licenseNumber: 'PSY123456',
      yearsOfExperience: 8,
      maxPatients: 25,
      availability: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' }
      },
      isActive: true,
      preferences: {
        notifications: { email: true, sms: true, push: true }
      }
    });

    const supervisor2 = await User.create({
      name: 'Dr. Michael Chen',
      email: 'michael.chen@recoveryroad.com',
      passwordHash: demoPassword,
      role: 'supervisor',
      phone: '+1-555-0102',
      address: {
        street: '789 Wellness Blvd',
        city: 'Wellness City',
        state: 'WC',
        zipCode: '34567'
      },
      specialization: ['trauma', 'anxiety', 'depression'],
      licenseNumber: 'LCSW789012',
      yearsOfExperience: 12,
      maxPatients: 20,
      availability: {
        monday: { start: '08:00', end: '16:00' },
        tuesday: { start: '08:00', end: '16:00' },
        wednesday: { start: '08:00', end: '16:00' },
        thursday: { start: '08:00', end: '16:00' },
        friday: { start: '08:00', end: '16:00' }
      },
      isActive: true,
      preferences: {
        notifications: { email: true, sms: false, push: true }
      }
    });

    // Create NGO Users
    const ngo1 = await User.create({
      name: 'Hope Center Admin',
      email: 'admin@hopecenter.org',
      passwordHash: demoPassword,
      role: 'ngo',
      phone: '+1-555-0103',
      address: {
        street: '321 Support Lane',
        city: 'Hope City',
        state: 'HC',
        zipCode: '45678'
      },
      organizationName: 'Hope Recovery Center',
      organizationType: 'treatment-facility',
      services: ['detox', 'counseling', 'housing', 'therapy'],
      isActive: true,
      preferences: {
        notifications: { email: true, sms: true, push: true }
      }
    });

    const ngo2 = await User.create({
      name: 'Community Support Director',
      email: 'director@communitysupport.org',
      passwordHash: demoPassword,
      role: 'ngo',
      phone: '+1-555-0104',
      address: {
        street: '654 Community St',
        city: 'Community City',
        state: 'CC',
        zipCode: '56789'
      },
      organizationName: 'Community Support Network',
      organizationType: 'support-group',
      services: ['support-groups', 'peer-counseling', 'education'],
      isActive: true,
      preferences: {
        notifications: { email: true, sms: false, push: true }
      }
    });

    // Create Patients
    const patients = [];
    const patientData = [
      {
        name: 'John Smith',
        email: 'john.smith@recoveryroad.com',
        phone: '+1-555-0201',
        assignedSupervisor: supervisor1._id,
        sobrietyDate: new Date('2024-01-15'),
        emergencyContacts: [
          { name: 'Jane Smith', phone: '+1-555-0301', relationship: 'Spouse' }
        ],
        medicalHistory: 'Previous alcohol dependence, anxiety disorder',
        currentMedications: ['Sertraline 50mg', 'Multivitamin']
      },
      {
        name: 'Maria Garcia',
        email: 'maria.garcia@recoveryroad.com',
        phone: '+1-555-0202',
        assignedSupervisor: supervisor1._id,
        sobrietyDate: new Date('2024-03-01'),
        emergencyContacts: [
          { name: 'Carlos Garcia', phone: '+1-555-0302', relationship: 'Brother' }
        ],
        medicalHistory: 'Opioid dependence, depression',
        currentMedications: ['Buprenorphine', 'Xanax 0.5mg']
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@recoveryroad.com',
        phone: '+1-555-0203',
        assignedSupervisor: supervisor2._id,
        sobrietyDate: new Date('2023-11-20'),
        emergencyContacts: [
          { name: 'Lisa Wilson', phone: '+1-555-0303', relationship: 'Sister' }
        ],
        medicalHistory: 'Benzodiazepine dependence, PTSD',
        currentMedications: ['Clonazepam 1mg', 'Zoloft 100mg']
      },
      {
        name: 'Emily Johnson',
        email: 'emily.johnson@recoveryroad.com',
        phone: '+1-555-0204',
        assignedSupervisor: supervisor2._id,
        sobrietyDate: new Date('2024-02-10'),
        emergencyContacts: [
          { name: 'Robert Johnson', phone: '+1-555-0304', relationship: 'Father' }
        ],
        medicalHistory: 'Polysubstance dependence, bipolar disorder',
        currentMedications: ['Lamictal 200mg', 'Abilify 15mg']
      }
    ];

    for (const data of patientData) {
      const patient = await User.create({
        ...data,
        passwordHash: demoPassword,
        role: 'patient',
        address: {
          street: `${Math.floor(Math.random() * 1000)} Patient Ave`,
          city: 'Recovery City',
          state: 'RC',
          zipCode: String(10000 + Math.floor(Math.random() * 90000))
        },
        dob: new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        recoveryPoints: Math.floor(Math.random() * 500) + 100,
        isActive: true,
        preferences: {
          notifications: { email: true, sms: false, push: true }
        }
      });
      patients.push(patient);
    }

    // Create Organizations
    const organizations = await Organization.insertMany([
      {
        name: 'Hope Recovery Center',
        type: 'treatment-facility',
        description: 'Comprehensive addiction treatment and recovery services',
        address: {
          street: '321 Support Lane',
          city: 'Hope City',
          state: 'HC',
          zipCode: '45678'
        },
        contact: {
          phone: '+1-555-0103',
          email: 'info@hopecenter.org',
          website: 'https://hopecenter.org'
        },
        services: [
          { name: 'Detox Program', description: 'Medical detoxification services', category: 'medical' },
          { name: 'Individual Counseling', description: 'One-on-one therapy sessions', category: 'counseling' },
          { name: 'Group Therapy', description: 'Peer support group sessions', category: 'therapy' },
          { name: 'Housing Support', description: 'Transitional housing assistance', category: 'housing' }
        ],
        capacity: { total: 50, current: 32 },
        accreditation: ['CARF', 'JCAHO'],
        operatingHours: {
          monday: { open: '08:00', close: '20:00', closed: false },
          tuesday: { open: '08:00', close: '20:00', closed: false },
          wednesday: { open: '08:00', close: '20:00', closed: false },
          thursday: { open: '08:00', close: '20:00', closed: false },
          friday: { open: '08:00', close: '20:00', closed: false },
          saturday: { open: '09:00', close: '17:00', closed: false },
          sunday: { open: '10:00', close: '16:00', closed: false }
        },
        admins: [ngo1._id],
        rating: 4.5,
        reviews: [
          {
            userId: patients[0]._id,
            rating: 5,
            comment: 'Excellent facility with caring staff',
            createdAt: new Date()
          }
        ]
      },
      {
        name: 'Community Support Network',
        type: 'support-group',
        description: 'Peer support and community resources for recovery',
        address: {
          street: '654 Community St',
          city: 'Community City',
          state: 'CC',
          zipCode: '56789'
        },
        contact: {
          phone: '+1-555-0104',
          email: 'info@communitysupport.org',
          website: 'https://communitysupport.org'
        },
        services: [
          { name: 'Peer Support Groups', description: 'Weekly peer-led support meetings', category: 'support' },
          { name: 'Educational Workshops', description: 'Recovery education and skill-building', category: 'education' },
          { name: 'Resource Navigation', description: 'Help accessing community resources', category: 'support' }
        ],
        capacity: { total: 100, current: 75 },
        accreditation: ['Peer-Run'],
        admins: [ngo2._id],
        rating: 4.2
      }
    ]);

    // Create Sample Messages
    const messages = [];
    const messageTemplates = [
      { content: 'Hello! How are you feeling today?', isCrisis: false },
      { content: 'I\'m having a rough day with cravings.', isCrisis: false },
      { content: 'That\'s completely normal. Let\'s work through this together.', isCrisis: false },
      { content: 'Remember your coping strategies we discussed.', isCrisis: false },
      { content: 'I\'m feeling anxious about tomorrow\'s appointment.', isCrisis: false },
      { content: 'That\'s understandable. I\'m here to support you.', isCrisis: false },
      { content: 'Great job on your recovery milestones!', isCrisis: false },
      { content: 'Thank you for your encouragement.', isCrisis: false }
    ];

    for (const patient of patients) {
      const supervisor = patient.assignedSupervisor;
      for (let i = 0; i < 5; i++) {
        const isFromPatient = Math.random() > 0.5;
        const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];

        messages.push({
          senderId: isFromPatient ? patient._id : supervisor,
          receiverId: isFromPatient ? supervisor : patient._id,
          content: template.content,
          messageType: 'text',
          isCrisis: template.isCrisis,
          isUrgent: Math.random() > 0.9,
          priority: template.isCrisis ? 'high' : 'normal',
          read: Math.random() > 0.3,
          readAt: Math.random() > 0.3 ? new Date() : null,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Last 30 days
        });
      }
    }

    await Message.insertMany(messages);

    // Create Mood Entries
    const moodEntries = [];
    for (const patient of patients) {
      for (let i = 0; i < 14; i++) { // 2 weeks of data
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        moodEntries.push({
          userId: patient._id,
          moodValue: Math.floor(Math.random() * 8) + 2, // 2-10 range
          cravingLevel: Math.floor(Math.random() * 8) + 2,
          notes: i % 3 === 0 ? 'Feeling motivated today' : i % 5 === 0 ? 'Had a challenging day' : null,
          journalEntry: i % 4 === 0 ? 'Today I practiced mindfulness and it really helped with my anxiety.' : null,
          date: date
        });
      }
    }
    await MoodEntry.insertMany(moodEntries);

    // Create Trigger Logs
    const triggerLogs = [];
    const triggers = ['stress', 'social situations', 'boredom', 'arguments', 'financial worries', 'loneliness', 'celebrations'];
    for (const patient of patients) {
      for (let i = 0; i < 7; i++) {
        const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        triggerLogs.push({
          userId: patient._id,
          triggerType: triggers[Math.floor(Math.random() * triggers.length)],
          intensity: Math.floor(Math.random() * 8) + 2,
          notes: Math.random() > 0.5 ? 'Managed to use coping strategies' : 'Struggled but got through it',
          date: date
        });
      }
    }
    await TriggerLog.insertMany(triggerLogs);

    // Create Activities
    const activities = [];
    const activityTypes = [
      { type: 'Morning Meditation', points: 15, category: 'Wellness' },
      { type: 'Exercise Session', points: 20, category: 'Physical' },
      { type: 'Support Group Meeting', points: 25, category: 'Social' },
      { type: 'Journaling', points: 10, category: 'Mental' },
      { type: 'Healthy Meal Prep', points: 15, category: 'Nutrition' },
      { type: 'Reading Recovery Literature', points: 12, category: 'Education' },
      { type: 'Volunteer Work', points: 18, category: 'Service' },
      { type: 'Therapy Session', points: 30, category: 'Professional' }
    ];

    for (const patient of patients) {
      for (let i = 0; i < 10; i++) {
        const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const date = new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000);

        activities.push({
          userId: patient._id,
          activityType: activity.type,
          duration: Math.floor(Math.random() * 120) + 15, // 15-135 minutes
          intensity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          pointsEarned: activity.points,
          notes: Math.random() > 0.7 ? 'Really enjoyed this activity' : null,
          date: date,
          completed: Math.random() > 0.2
        });
      }
    }
    await Activity.insertMany(activities);

    // Create Appointments
    const appointments = [];
    for (const patient of patients) {
      for (let i = 0; i < 3; i++) {
        const date = new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000); // Next few weeks
        date.setHours(10 + Math.floor(Math.random() * 6), [0, 30][Math.floor(Math.random() * 2)], 0, 0);

        appointments.push({
          patientId: patient._id,
          supervisorId: patient.assignedSupervisor,
          title: ['Weekly Check-in', 'Therapy Session', 'Progress Review', 'Crisis Intervention'][Math.floor(Math.random() * 4)],
          description: 'Regular follow-up appointment to discuss progress and challenges.',
          date: date,
          duration: 60,
          status: i === 0 ? 'scheduled' : ['scheduled', 'completed', 'cancelled'][Math.floor(Math.random() * 3)],
          meetingLink: Math.random() > 0.5 ? 'https://meet.recoveryroad.com/' + Math.random().toString(36).substr(2, 9) : null,
          notes: i > 0 && Math.random() > 0.5 ? 'Patient showed good progress this session.' : null
        });
      }
    }
    await Appointment.insertMany(appointments);

    // Create Sample Alerts
    const alerts = await Alert.insertMany([
      {
        title: 'Welcome to Recovery Road',
        message: 'Welcome to our recovery platform! We\'re here to support your journey.',
        type: 'success',
        priority: 'medium',
        targetRoles: ['patient'],
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'Emergency Resources Available',
        message: 'If you\'re in crisis, please contact the National Suicide Prevention Lifeline at 988.',
        type: 'warning',
        priority: 'high',
        targetRoles: ['patient', 'supervisor'],
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'New Support Group Meeting',
        message: 'Join our weekly peer support group meeting every Thursday at 7 PM.',
        type: 'info',
        priority: 'medium',
        targetRoles: ['patient'],
        targetUsers: patients.slice(0, 2).map(p => p._id),
        isActive: true,
        createdBy: supervisor1._id
      }
    ]);

    console.log('✅ Demo data seeded successfully!');
    console.log('\n👥 Created Users:');
    console.log(`   Admin: ${admin.email} / admin123`);
    console.log(`   Supervisors: ${supervisor1.email}, ${supervisor2.email} / demo123`);
    console.log(`   NGOs: ${ngo1.email}, ${ngo2.email} / demo123`);
    console.log(`   Patients: ${patients.map(p => p.email).join(', ')} / demo123`);

    console.log('\n📊 Created Data:');
    console.log(`   Organizations: ${organizations.length}`);
    console.log(`   Messages: ${messages.length}`);
    console.log(`   Mood Entries: ${moodEntries.length}`);
    console.log(`   Activities: ${activities.length}`);
    console.log(`   Appointments: ${appointments.length}`);
    console.log(`   Alerts: ${alerts.length}`);

    console.log('\n🎯 Next Steps:');
    console.log('   1. Start the backend: npm run dev');
    console.log('   2. Start the frontend: cd ../frontend && npm start');
    console.log('   3. Login with any of the demo accounts above');

    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
