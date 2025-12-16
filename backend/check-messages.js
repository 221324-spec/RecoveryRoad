require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/Message');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const messages = await Message.find({});
  console.log('📬 Messages in database:', messages.length);
  
  if (messages.length > 0) {
    messages.forEach(m => {
      console.log(`- From: ${m.senderId} → To: ${m.receiverId}`);
      console.log(`  Content: ${m.content.substring(0, 100)}...`);
      console.log(`  Time: ${m.createdAt}`);
      console.log('---');
    });
  } else {
    console.log('No messages found in database');
  }
  
  process.exit(0);
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});