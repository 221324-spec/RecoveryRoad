const axios = require('axios');

async function setupDemoUsers() {
  try {
    console.log('🔧 Setting up demo users for testing...');
    
    
    const healthCheck = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend health check:', healthCheck.data);
    
  
    const supervisorId = '68e63e313613f67e194b9111';
    
    try {
      const patientsResponse = await axios.get(`http://localhost:5000/api/supervisors/${supervisorId}/patients`);
      console.log('📋 Current patients for supervisor:', patientsResponse.data);
      
      if (patientsResponse.data.patients && patientsResponse.data.patients.length > 0) {
        console.log('✅ Supervisor already has patients assigned');
        return;
      }
    } catch (error) {
      console.log('⚠️ No patients found or endpoint error:', error.response?.data || error.message);
    }
    
    console.log('🔧 Creating demo patient and assigning to supervisor...');
    

    const testMessage = {
      senderId: '68e63e313613f67e194b9111', 
      receiverId: '68e63e313613f67e194b9113', 
      content: 'Hello! This is a test message from supervisor to patient.'
    };
    
    const messageResponse = await axios.post('http://localhost:5000/api/messages', testMessage, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('✅ Test message sent successfully:', messageResponse.data);
    
  
    const messagesResponse = await axios.get(`http://localhost:5000/api/messages/68e63e313613f67e194b9113?with=68e63e313613f67e194b9111`);
    console.log('📨 Retrieved messages:', messagesResponse.data);
    
  } catch (error) {
    console.error('❌ Error setting up demo users:', error.response?.data || error.message);
  }
}

setupDemoUsers();