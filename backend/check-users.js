const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkUsers() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/recoveryroad');
    console.log('Connected successfully');

    const count = await User.countDocuments();
    console.log(`Total users: ${count}`);

    const users = await User.find({}, 'name email role _id').limit(10);
    console.log(`Found ${users.length} users:`);
    users.forEach(u => {
      console.log(`${u._id}: ${u.name} (${u.role}) - ${u.email}`);
    });

    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

checkUsers();