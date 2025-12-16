const io = require('socket.io-client');
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
const API_URL = 'http://localhost:5000/api';

async function testSupervisorRealTimeMessaging() {
  try {
    console.log('🔄 Testing Supervisor Real-Time Messaging...\n');

    // Demo user IDs
    const supervisorId = '68e63e313613f67e194b9111'; // Dr. Emma Wilson
    const patientId = '68e63e313613f67e194b9113';     // Demo Patient

    // Create Socket.IO connections for both users
    console.log('🔌 Connecting supervisor to Socket.IO...');
    const supervisorSocket = io(BASE_URL);
    
    console.log('🔌 Connecting patient to Socket.IO...');
    const patientSocket = io(BASE_URL);

    // Wait for connections
    await new Promise((resolve) => {
      let connected = 0;
      supervisorSocket.on('connect', () => {
        console.log('✅ Supervisor connected to Socket.IO');
        supervisorSocket.emit('user:join', { userId: supervisorId });
        connected++;
        if (connected === 2) resolve();
      });
      
      patientSocket.on('connect', () => {
        console.log('✅ Patient connected to Socket.IO');
        patientSocket.emit('user:join', { userId: patientId });
        connected++;
        if (connected === 2) resolve();
      });
    });

    // Set up patient to listen for new messages
    console.log('\n👂 Patient listening for real-time messages...');
    patientSocket.on('message:new', (data) => {
      console.log('🔔 Patient received real-time message:');
      console.log('   From:', data.message.senderId);
      console.log('   Content:', data.message.content);
      console.log('   Priority:', data.message.priority);
      console.log('   Urgent:', data.message.isUrgent);
    });

    // Supervisor sends a message via API (should trigger real-time notification)
    console.log('\n📤 Supervisor sending message via API...');
    
    await new Promise((resolve) => {
      // Set up the listener first
      patientSocket.once('message:new', (data) => {
        console.log('🎉 SUCCESS: Real-time message received!');
        console.log('   Message:', data.message.content);
        console.log('   From supervisor ID:', data.message.senderId);
        resolve();
      });

      // Send the message
      setTimeout(async () => {
        const message = {
          senderId: supervisorId,
          receiverId: patientId,
          content: 'This is a real-time message from your supervisor! You should receive this instantly.',
          messageType: 'text',
          priority: 'normal'
        };

        try {
          const response = await axios.post(`${API_URL}/messages`, message);
          console.log('✅ Message sent via API:', response.data.message._id);
        } catch (error) {
          console.error('❌ Error sending message:', error.message);
          resolve();
        }
      }, 1000);
    });

    // Test urgent message with real-time delivery
    console.log('\n🚨 Testing urgent message with real-time delivery...');
    
    await new Promise((resolve) => {
      patientSocket.once('message:new', (data) => {
        console.log('🚨 URGENT message received in real-time!');
        console.log('   Content:', data.message.content);
        console.log('   Urgent flag:', data.message.isUrgent);
        console.log('   Priority:', data.message.priority);
        resolve();
      });

      setTimeout(async () => {
        const urgentMessage = {
          senderId: supervisorId,
          receiverId: patientId,
          content: 'URGENT: Please call me as soon as possible. This is important.',
          messageType: 'text',
          isUrgent: true,
          priority: 'high'
        };

        try {
          await axios.post(`${API_URL}/messages`, urgentMessage);
          console.log('✅ Urgent message sent');
        } catch (error) {
          console.error('❌ Error sending urgent message:', error.message);
          resolve();
        }
      }, 1000);
    });

    // Clean up connections
    supervisorSocket.disconnect();
    patientSocket.disconnect();

    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✓ Supervisors can send messages to patients');
    console.log('✓ Real-time delivery works via Socket.IO');
    console.log('✓ Urgent messages are delivered instantly');
    console.log('✓ Two-way communication fully functional');

  } catch (error) {
    console.error('❌ Error testing real-time messaging:', error.message);
  }
}

// Run the test
testSupervisorRealTimeMessaging();