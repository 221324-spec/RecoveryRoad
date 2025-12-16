const mongoose = require('mongoose');

const dbConnect = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/recoveryroad';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('⚠️ Server will continue without database. Some features may not work.');
    // Don't exit the process - allow server to run for UI testing
    // process.exit(1);
  }
};

module.exports = dbConnect;
