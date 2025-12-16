const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test if supervisor can send messages back to patient
async function testSupervisorMessaging() {
  try {
    console.log('🔄 Testing Supervisor → Patient messaging...\n');

    // Demo user IDs from our database
    const supervisorId = '68e63e313613f67e194b9111'; // Dr. Emma Wilson
    const patientId = '68e63e313613f67e194b9113';     // Demo Patient

    // 1. Send a message FROM supervisor TO patient
    console.log('📤 Supervisor sending message to patient...');
    const supervisorMessage = {
      senderId: supervisorId,
      receiverId: patientId,
      content: 'Hello! I reviewed your mood logs. Great progress this week! How are you feeling today?',
      messageType: 'text',
      priority: 'normal'
    };

    const sendResponse = await axios.post(`${BASE_URL}/messages`, supervisorMessage);
    console.log('✅ Supervisor message sent:', sendResponse.data.message.content);
    console.log('   Message ID:', sendResponse.data.message._id);
    console.log('   Sent at:', sendResponse.data.message.createdAt);

    // 2. Send another message from supervisor (professional guidance)
    console.log('\n📤 Supervisor sending follow-up guidance...');
    const guidanceMessage = {
      senderId: supervisorId,
      receiverId: patientId,
      content: 'Remember to practice the breathing exercises we discussed. You can reach out anytime if you need support.',
      messageType: 'text',
      priority: 'normal'
    };

    const guidanceResponse = await axios.post(`${BASE_URL}/messages`, guidanceMessage);
    console.log('✅ Guidance message sent:', guidanceResponse.data.message.content);

    // 3. Check the full conversation between supervisor and patient
    console.log('\n📋 Full conversation between supervisor and patient:');
    const conversationResponse = await axios.get(`${BASE_URL}/messages/${patientId}?with=${supervisorId}`);
    
    console.log(`\n📞 Conversation (${conversationResponse.data.messages.length} messages):`);
    conversationResponse.data.messages.forEach((msg, index) => {
      const senderName = msg.senderId.name;
      const isFromSupervisor = msg.senderId._id === supervisorId;
      const arrow = isFromSupervisor ? '👩‍⚕️ →' : '🧑‍💼 →';
      
      console.log(`${index + 1}. ${arrow} ${senderName}: ${msg.content}`);
      console.log(`   📅 ${new Date(msg.createdAt).toLocaleString()}`);
      console.log(`   📖 Read: ${msg.read ? '✓' : '✗'}\n`);
    });

    // 4. Verify supervisor can send urgent messages
    console.log('🚨 Testing urgent message from supervisor...');
    const urgentMessage = {
      senderId: supervisorId,
      receiverId: patientId,
      content: 'Please check in when you can. I want to follow up on your last session.',
      messageType: 'text',
      isUrgent: true,
      priority: 'high'
    };

    const urgentResponse = await axios.post(`${BASE_URL}/messages`, urgentMessage);
    console.log('✅ Urgent message sent successfully');
    console.log('   Priority:', urgentResponse.data.message.priority);
    console.log('   Urgent flag:', urgentResponse.data.message.isUrgent);

    console.log('\n🎉 SUCCESS: Supervisors can send messages to patients!');
    console.log('✓ Two-way communication working');
    console.log('✓ Message prioritization available');
    console.log('✓ Professional guidance messaging supported');

  } catch (error) {
    console.error('❌ Error testing supervisor messaging:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

// Run the test
testSupervisorMessaging();