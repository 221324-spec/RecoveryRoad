const io = require('socket.io-client');
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testSupervisorSendRealtime() {
    console.log('🧪 Testing Real-time Supervisor → Patient Messaging...\n');
    
    // Socket connections
    const supervisorSocket = io(BASE_URL);
    const patientSocket = io(BASE_URL);
    
    // User IDs from our demo data
    const supervisorId = '670e63e313613f67e194b9111'; // Dr. Emma Wilson
    const patientId = '670e63e313613f67e194b9113';    // Demo Patient
    
    // Setup socket connections
    supervisorSocket.emit('join', { userId: supervisorId, role: 'supervisor' });
    patientSocket.emit('join', { userId: patientId, role: 'patient' });
    
    // Patient listens for incoming messages
    patientSocket.on('new_message', (data) => {
        console.log('📱 Patient received real-time message:');
        console.log(`   From: ${data.sender.name}`);
        console.log(`   Message: ${data.content}`);
        console.log(`   Time: ${new Date(data.createdAt).toLocaleTimeString()}`);
        console.log('✅ Real-time delivery successful!\n');
    });
    
    // Wait for connections
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Supervisor sends message via API
    try {
        const response = await axios.post(`${BASE_URL}/api/messages`, {
            senderId: supervisorId,
            receiverId: patientId,
            content: 'Hello! This is your supervisor checking in. How are you feeling today?',
            messageType: 'text'
        });
        
        console.log('📤 Supervisor sent message via API:');
        console.log(`   Message ID: ${response.data.message._id}`);
        console.log(`   Content: ${response.data.message.content}`);
        console.log(`   Timestamp: ${new Date(response.data.message.createdAt).toLocaleTimeString()}\n`);
        
    } catch (error) {
        console.error('❌ Error sending message:', error.message);
    }
    
    // Wait for real-time delivery
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test patient reply
    console.log('🔄 Testing Patient Reply...\n');
    
    supervisorSocket.on('new_message', (data) => {
        console.log('👩‍⚕️ Supervisor received real-time reply:');
        console.log(`   From: ${data.sender.name}`);
        console.log(`   Message: ${data.content}`);
        console.log(`   Time: ${new Date(data.createdAt).toLocaleTimeString()}`);
        console.log('✅ Bidirectional real-time chat working!\n');
        
        // Close connections
        supervisorSocket.close();
        patientSocket.close();
        process.exit(0);
    });
    
    // Patient replies
    try {
        const replyResponse = await axios.post(`${BASE_URL}/api/messages`, {
            senderId: patientId,
            receiverId: supervisorId,
            content: "I'm doing better today, thank you for checking in! Had a good mood today.",
            messageType: 'text'
        });
        
        console.log('📤 Patient sent reply via API:');
        console.log(`   Message ID: ${replyResponse.data.message._id}`);
        console.log(`   Content: ${replyResponse.data.message.content}\n`);
        
    } catch (error) {
        console.error('❌ Error sending reply:', error.message);
    }
}

// Handle socket connection events
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled error:', err.message);
    process.exit(1);
});

testSupervisorSendRealtime().catch(console.error);