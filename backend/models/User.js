const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['patient', 'supervisor', 'admin', 'ngo'],
    default: 'patient'
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  dob: Date,
  gender: String,

  // Patient-specific fields
  assignedSupervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recoveryPoints: { type: Number, default: 0 },
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  medicalHistory: String,
  currentMedications: [String],
  sobrietyDate: Date,

  // Supervisor-specific fields
  specialization: [String], // e.g., ['addiction', 'mental-health', 'dual-diagnosis']
  licenseNumber: String,
  yearsOfExperience: Number,
  maxPatients: { type: Number, default: 20 },
  availability: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String }
  },

  // NGO-specific fields
  organizationName: String,
  organizationType: String, // e.g., 'recovery-center', 'support-group', 'treatment-facility'
  website: String,
  services: [String], // e.g., ['detox', 'counseling', 'housing']
  capacity: Number,
  accreditation: [String],

  // Common fields
  profilePicture: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    privacy: {
      showProfile: { type: Boolean, default: true },
      showActivity: { type: Boolean, default: false }
    }
  },

  // Real-time status
  onlineStatus: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'offline'
  },
  lastSeen: Date,

  // Security
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String
}, { timestamps: true });

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ assignedSupervisor: 1 });
UserSchema.index({ onlineStatus: 1 });
UserSchema.index({ 'preferences.notifications.push': 1 });

// Virtual for full profile
UserSchema.virtual('fullProfile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    phone: this.phone,
    address: this.address,
    profilePicture: this.profilePicture,
    onlineStatus: this.onlineStatus,
    lastSeen: this.lastSeen,
    preferences: this.preferences
  };
});

// Instance method to check if user can access patient data
UserSchema.methods.canAccessPatient = function(patientId) {
  if (this.role === 'admin') return true;
  if (this.role === 'ngo') return true;
  if (this.role === 'supervisor' && patientId.toString() === this.assignedSupervisor?.toString()) return true;
  return false;
};

// Instance method to get dashboard data based on role
UserSchema.methods.getDashboardData = function() {
  const baseData = {
    user: this.fullProfile,
    stats: {}
  };

  switch (this.role) {
    case 'patient':
      baseData.stats = {
        recoveryPoints: this.recoveryPoints,
        assignedSupervisor: this.assignedSupervisor,
        sobrietyDays: this.sobrietyDate ? Math.floor((Date.now() - this.sobrietyDate) / (1000 * 60 * 60 * 24)) : 0
      };
      break;
    case 'supervisor':
      baseData.stats = {
        patientsCount: 0, // Will be populated by controller
        specialization: this.specialization,
        yearsOfExperience: this.yearsOfExperience
      };
      break;
    case 'ngo':
      baseData.stats = {
        organizationName: this.organizationName,
        services: this.services,
        capacity: this.capacity
      };
      break;
    case 'admin':
      baseData.stats = {
        totalUsers: 0, // Will be populated by controller
        systemHealth: 'good'
      };
      break;
  }

  return baseData;
};

module.exports = mongoose.model('User', UserSchema);