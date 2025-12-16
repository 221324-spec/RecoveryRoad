const io = require('socket.io-client');
const axios = require('axios');

async function testRealTimeCommunication() {
    console.log('🧪 Testing Real-Time Patient ↔ Supervisor Communication...\n');
    
    // Create socket connections for both users
    const patientSocket = io('http://localhost:5000');
    const supervisorSocket = io('http://localhost:5000');
    
    const PATIENT_ID = '68e63e313613f67e194b9113';
    const SUPERVISOR_ID = '68e63e313613f67e194b9111';
    
    // Setup promises to track message delivery
    let patientReceivedMessage = false;
    let supervisorReceivedMessage = false;
    
    // Patient socket setup
    patientSocket.on('connect', () => {
        console.log('👤 Patient connected to Socket.IO');
        patientSocket.emit('join', { userId: PATIENT_ID });
    });
    
    patientSocket.on('message:new', (data) => {
        console.log('📱 Patient received real-time message:');
        console.log(`   From: ${data.message.senderId}`);
        console.log(`   Content: ${data.message.content}`);
        patientReceivedMessage = true;
    });
    
    // Supervisor socket setup
    supervisorSocket.on('connect', () => {
        console.log('👩‍⚕️ Supervisor connected to Socket.IO');
        supervisorSocket.emit('join', { userId: SUPERVISOR_ID });
    });
    
    supervisorSocket.on('message:new', (data) => {
        console.log('👩‍⚕️ Supervisor received real-time message:');
        console.log(`   From: ${data.message.senderId}`);
        console.log(`   Content: ${data.message.content}`);
        supervisorReceivedMessage = true;
    });
    
    // Wait for connections
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
        // Test 1: Supervisor sends message to patient
        console.log('\n🔄 Test 1: Supervisor → Patient');
        const supervisorMsg = await axios.post('http://localhost:5000/api/messages', {
            senderId: SUPERVISOR_ID,
            receiverId: PATIENT_ID,
            content: '🔥 Real-time test: Hello patient! Can you receive this instantly?'
        });
        console.log('✅ Supervisor message sent via API');
        
        // Wait for real-time delivery
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test 2: Patient replies to supervisor
        console.log('\n🔄 Test 2: Patient → Supervisor');
        const patientMsg = await axios.post('http://localhost:5000/api/messages', {
            senderId: PATIENT_ID,
            receiverId: SUPERVISOR_ID,
            content: '🎉 Yes! I received your message instantly! This is amazing!'
        });
        console.log('✅ Patient reply sent via API');
        
        // Wait for real-time delivery
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Results
        console.log('\n📊 REAL-TIME TEST RESULTS:');
        console.log(`👤 Patient received supervisor message in real-time: ${patientReceivedMessage ? '✅ YES' : '❌ NO'}`);
        console.log(`👩‍⚕️ Supervisor received patient message in real-time: ${supervisorReceivedMessage ? '✅ YES' : '❌ NO'}`);
        
        if (patientReceivedMessage && supervisorReceivedMessage) {
            console.log('\n🎉 PERFECT! Real-time communication is working both ways!');
            console.log('💬 Users can now chat instantly without page refresh');
        } else {
            console.log('\n⚠️ Real-time delivery is not working properly');
        }
        
    } catch (error) {
        console.error('❌ Error during testing:', error.message);
    }
    
    // Cleanup
    patientSocket.close();
    supervisorSocket.close();
    process.exit(0);
}

testRealTimeCommunication();