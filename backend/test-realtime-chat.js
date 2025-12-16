const io = require('socket.io-client');

const SOCKET_URL = 'http://localhost:5000';
const SUPERVISOR_ID = '68e63e313613f67e194b9111';
const PATIENT_ID = '68e63e313613f67e194b9113';

async function testRealTimeChat() {
  console.log('🔄 Testing Real-time Chat with Socket.IO...\n');

  // Create supervisor connection
  const supervisorSocket = io(SOCKET_URL);
  
  // Create patient connection  
  const patientSocket = io(SOCKET_URL);

  // Set up event listeners
  supervisorSocket.on('connect', () => {
    console.log('✅ Supervisor connected to Socket.IO');
    supervisorSocket.emit('join', { userId: SUPERVISOR_ID });
  });

  patientSocket.on('connect', () => {
    console.log('✅ Patient connected to Socket.IO');
    patientSocket.emit('join', { userId: PATIENT_ID });
  });

  // Listen for new messages
  supervisorSocket.on('message:new', (data) => {
    console.log('📨 Supervisor received real-time message:', data.message.content);
  });

  patientSocket.on('message:new', (data) => {
    console.log('📨 Patient received real-time message:', data.message.content);
  });

  // Wait for connections to establish
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('\n💬 Sending test messages...');

  // Simulate sending messages through Socket.IO
  supervisorSocket.emit('message:send', {
    from: SUPERVISOR_ID,
    to: PATIENT_ID,
    content: 'This is a real-time message from supervisor!'
  });

  patientSocket.emit('message:send', {
    from: PATIENT_ID,
    to: SUPERVISOR_ID,
    content: 'This is a real-time reply from patient!'
  });

  // Wait to see real-time messages
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Cleanup
  supervisorSocket.disconnect();
  patientSocket.disconnect();
  
  console.log('\n🏁 Real-time test completed!');
}

// Run test
testRealTimeChat().catch(console.error);