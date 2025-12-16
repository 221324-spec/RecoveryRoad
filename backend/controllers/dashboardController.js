const User = require('../models/User');
const Message = require('../models/Message');
const Appointment = require('../models/Appointment');
const MoodEntry = require('../models/MoodEntry');
const Activity = require('../models/Activity');
const TriggerLog = require('../models/TriggerLog');
const Alert = require('../models/Alert');
const Notification = require('../models/Notification');
const Organization = require('../models/Organization');

const dashboardController = {
  // Get dashboard data for current user
  getDashboard: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      let dashboardData = {
        user: user.fullProfile,
        stats: {},
        recentActivity: [],
        notifications: [],
        alerts: []
      };

      // Get role-specific data
      switch (user.role) {
        case 'patient':
          dashboardData = await getPatientDashboard(user, dashboardData);
          break;
        case 'supervisor':
          dashboardData = await getSupervisorDashboard(user, dashboardData);
          break;
        case 'admin':
          dashboardData = await getAdminDashboard(user, dashboardData);
          break;
        case 'ngo':
          dashboardData = await getNGODashboard(user, dashboardData);
          break;
      }

      // Get recent notifications
      dashboardData.notifications = await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('createdBy', 'name role');

      // Get active alerts
      dashboardData.alerts = await Alert.find({
        $or: [
          { targetRoles: user.role },
          { targetRoles: 'all' },
          { targetUsers: userId }
        ],
        isActive: true,
        $or: [
          { expiresAt: { $exists: false } },
          { expiresAt: { $gt: new Date() } }
        ]
      }).sort({ priority: -1, createdAt: -1 }).limit(5);

      res.json({
        success: true,
        data: dashboardData
      });

    } catch (error) {
      console.error('Get dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get dashboard data',
        error: error.message
      });
    }
  },

  // Get real-time stats for dashboard
  getRealtimeStats: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      const stats = {};

      switch (user.role) {
        case 'patient':
          stats.unreadMessages = await Message.countDocuments({
            receiverId: userId,
            read: false
          });
          stats.upcomingAppointments = await Appointment.countDocuments({
            patientId: userId,
            date: { $gte: new Date() },
            status: 'scheduled'
          });
          stats.moodTrend = await getMoodTrend(userId);
          break;

        case 'supervisor':
          stats.assignedPatients = await User.countDocuments({
            assignedSupervisor: userId,
            role: 'patient'
          });
          stats.unreadMessages = await Message.countDocuments({
            receiverId: userId,
            read: false
          });
          stats.upcomingAppointments = await Appointment.countDocuments({
            supervisorId: userId,
            date: { $gte: new Date() },
            status: 'scheduled'
          });
          stats.crisisAlerts = await Alert.countDocuments({
            targetUsers: userId,
            type: 'crisis',
            isActive: true
          });
          break;

        case 'admin':
          stats.totalUsers = await User.countDocuments();
          stats.activeUsers = await User.countDocuments({ onlineStatus: 'online' });
          stats.totalMessages = await Message.countDocuments();
          stats.activeAlerts = await Alert.countDocuments({ isActive: true });
          break;

        case 'ngo':
          const organization = await Organization.findOne({ admins: userId });
          if (organization) {
            stats.organizationCapacity = organization.capacity;
            stats.currentOccupancy = organization.capacity.current;
            stats.pendingReferrals = 0; // Would need a referral system
          }
          break;
      }

      // Emit real-time update
      const io = req.app.get('io');
      if (io) {
        io.to(`user:${userId}`).emit('dashboard:stats', stats);
      }

      res.json({
        success: true,
        data: { stats }
      });

    } catch (error) {
      console.error('Get realtime stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get realtime stats',
        error: error.message
      });
    }
  }
};

// Helper functions for role-specific dashboard data
async function getPatientDashboard(user, dashboardData) {
  const userId = user._id;

  // Basic stats
  const unreadMessages = await Message.countDocuments({ receiverId: userId, read: false });
  const upcomingAppointments = await Appointment.countDocuments({
    patientId: userId,
    date: { $gte: new Date() },
    status: 'scheduled'
  });

  // Calculate recovery metrics from mood and trigger logs
  const recentMoodEntries = await MoodEntry.find({ userId }).sort({ createdAt: -1 }).limit(7);
  const triggerLog = await TriggerLog.find({ userId }).limit(100);

  const lowCravingDays = recentMoodEntries.filter(entry => (entry.cravingLevel || 0) <= 3).length;
  const totalCheckIns = await MoodEntry.countDocuments({ userId });
  const avgMood = recentMoodEntries.length > 0
    ? recentMoodEntries.reduce((sum, entry) => sum + (entry.moodValue || 3), 0) / recentMoodEntries.length
    : 0;

  dashboardData.stats = {
    recoveryPoints: user.recoveryPoints,
    sobrietyDays: user.sobrietyDate ? Math.floor((Date.now() - user.sobrietyDate) / (1000 * 60 * 60 * 24)) : 0,
    unreadMessages,
    upcomingAppointments,
    streakDays: lowCravingDays,
    totalCheckIns,
    avgMood,
    triggersIdentified: triggerLog.length
  };

  // Recent activity
  const recentMessages = await Message.find({ receiverId: userId })
    .populate('senderId', 'name role')
    .sort({ createdAt: -1 })
    .limit(5);

  const recentMoodFeed = await MoodEntry.find({ userId })
    .sort({ createdAt: -1 })
    .limit(3);

  const recentActivities = await Activity.find({ userId })
    .sort({ createdAt: -1 })
    .limit(3);

  dashboardData.recentActivity = [
    ...recentMessages.map(m => ({
      type: 'message',
      title: `Message from ${m.senderId.name}`,
      description: m.content.substring(0, 100),
      timestamp: m.createdAt,
      data: m
    })),
    ...recentMoodFeed.map(m => ({
      type: 'mood',
      title: 'Mood Check-in',
      description: `Mood: ${m.moodValue}/10`,
      timestamp: m.createdAt,
      data: m
    })),
    ...recentActivities.map(a => ({
      type: 'activity',
      title: 'Activity Logged',
      description: `${a.activityType} - ${a.duration} minutes`,
      timestamp: a.createdAt,
      data: a
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

  return dashboardData;
}

async function getSupervisorDashboard(user, dashboardData) {
  const userId = user._id;

  // Get assigned patients
  const assignedPatients = await User.find({
    assignedSupervisor: userId,
    role: 'patient'
  }).select('name email onlineStatus lastSeen recoveryPoints');

  dashboardData.stats = {
    assignedPatients: assignedPatients.length,
    unreadMessages: await Message.countDocuments({ receiverId: userId, read: false }),
    upcomingAppointments: await Appointment.countDocuments({
      supervisorId: userId,
      date: { $gte: new Date() },
      status: 'scheduled'
    }),
    activeAlerts: await Alert.countDocuments({
      $or: [
        { targetUsers: userId },
        { targetRoles: 'supervisor' }
      ],
      isActive: true
    })
  };

  // Recent patient activity
  const recentPatientActivity = [];
  for (const patient of assignedPatients.slice(0, 5)) {
    const latestMood = await MoodEntry.findOne({ userId: patient._id })
      .sort({ createdAt: -1 });

    const latestTrigger = await TriggerLog.findOne({ userId: patient._id })
      .sort({ createdAt: -1 });

    if (latestMood) {
      recentPatientActivity.push({
        type: 'patient_mood',
        title: `${patient.name} - Mood Update`,
        description: `Mood: ${latestMood.moodValue}/10`,
        timestamp: latestMood.createdAt,
        patient: patient
      });
    }

    if (latestTrigger) {
      recentPatientActivity.push({
        type: 'patient_trigger',
        title: `${patient.name} - Trigger Logged`,
        description: `Trigger: ${latestTrigger.triggerType}`,
        timestamp: latestTrigger.createdAt,
        patient: patient
      });
    }
  }

  dashboardData.recentActivity = recentPatientActivity
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

  dashboardData.assignedPatients = assignedPatients;

  return dashboardData;
}

async function getAdminDashboard(user, dashboardData) {
  dashboardData.stats = {
    totalUsers: await User.countDocuments(),
    activeUsers: await User.countDocuments({ onlineStatus: 'online' }),
    totalMessages: await Message.countDocuments(),
    totalAppointments: await Appointment.countDocuments(),
    activeAlerts: await Alert.countDocuments({ isActive: true }),
    systemHealth: 'good' // Could be enhanced with actual health checks
  };

  // Recent system activity
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email role createdAt');

  const recentAlerts = await Alert.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('createdBy', 'name');

  dashboardData.recentActivity = [
    ...recentUsers.map(u => ({
      type: 'new_user',
      title: 'New User Registered',
      description: `${u.name} (${u.role})`,
      timestamp: u.createdAt,
      data: u
    })),
    ...recentAlerts.map(a => ({
      type: 'alert_created',
      title: 'Alert Created',
      description: a.title,
      timestamp: a.createdAt,
      data: a
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

  return dashboardData;
}

async function getNGODashboard(user, dashboardData) {
  const userId = user._id;

  // Get organization data
  const organization = await Organization.findOne({ admins: userId });

  dashboardData.stats = {
    organizationName: user.organizationName,
    services: user.services || [],
    unreadMessages: await Message.countDocuments({ receiverId: userId, read: false }),
    activeReferrals: 0, // Would need referral system
    capacity: organization ? organization.capacity : null
  };

  // Recent organization activity
  const recentMessages = await Message.find({ receiverId: userId })
    .populate('senderId', 'name role')
    .sort({ createdAt: -1 })
    .limit(5);

  dashboardData.recentActivity = recentMessages.map(m => ({
    type: 'message',
    title: `Message from ${m.senderId.name}`,
    description: m.content.substring(0, 100),
    timestamp: m.createdAt,
    data: m
  }));

  if (organization) {
    dashboardData.organization = organization;
  }

  return dashboardData;
}

// Helper function to get mood trend
async function getMoodTrend(userId) {
  const last7Days = await MoodEntry.find({
    userId,
    date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  }).sort({ date: 1 });

  if (last7Days.length === 0) return null;

  const avgMood = last7Days.reduce((sum, entry) => sum + entry.moodValue, 0) / last7Days.length;
  const trend = last7Days.length >= 2 ?
    (last7Days[last7Days.length - 1].moodValue > last7Days[0].moodValue ? 'up' :
     last7Days[last7Days.length - 1].moodValue < last7Days[0].moodValue ? 'down' : 'stable') : 'stable';

  return { average: Math.round(avgMood * 10) / 10, trend, days: last7Days.length };
}

module.exports = dashboardController;