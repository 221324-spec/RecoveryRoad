const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkAll() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/recoveryroad';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const count = await User.countDocuments();
    console.log('Total users:', count);

    const roles = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    console.log('Users by role:', roles);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkAll();