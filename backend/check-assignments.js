const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkAssignments() {
  try {
    console.log('Connecting to database...');
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/recoveryroad';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected. Finding patients...');
    const patients = await User.find({role: 'patient'}, 'name assignedSupervisor').populate('assignedSupervisor', 'name');
    console.log(`Found ${patients.length} patients`);
    console.log('Patient assignments:');
    patients.forEach(p => {
      console.log(`${p.name}: ${p.assignedSupervisor ? p.assignedSupervisor.name : 'None'}`);
    });
    await mongoose.disconnect();
    console.log('Done.');
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

checkAssignments();