const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const SUPERVISOR_ID = '68e63e313613f67e194b9111';
const PATIENT_ID = '68e63e313613f67e194b9113';

async function testChatEndpoints() {
  try {
    console.log('💬 Testing Chat/Messaging Functionality...\n');

    // Test sending a message from patient to supervisor
    console.log('1. Testing Send Message (Patient → Supervisor)...');
    const messageData = {
      senderId: PATIENT_ID,
      receiverId: SUPERVISOR_ID,
      content: 'Hello Dr. Wilson, I had a difficult day today and could use some guidance.',
      messageType: 'text',
      priority: 'normal'
    };
    
    const sentMessage = await axios.post(`${BASE_URL}/messages`, messageData);
    console.log('✅ Message Sent:', sentMessage.data);

    // Test sending a reply from supervisor to patient
    console.log('\n2. Testing Send Reply (Supervisor → Patient)...');
    const replyData = {
      senderId: SUPERVISOR_ID,
      receiverId: PATIENT_ID,
      content: 'Thank you for reaching out. I understand it\'s been challenging. Let\'s schedule a time to talk. How are you feeling right now?',
      messageType: 'text',
      priority: 'high'
    };
    
    const sentReply = await axios.post(`${BASE_URL}/messages`, replyData);
    console.log('✅ Reply Sent:', sentReply.data);

    // Test getting conversation between patient and supervisor
    console.log('\n3. Testing Get Conversation...');
    const conversation = await axios.get(`${BASE_URL}/messages/${PATIENT_ID}?with=${SUPERVISOR_ID}`);
    console.log('✅ Conversation:', JSON.stringify(conversation.data, null, 2));

    // Test marking message as read
    if (conversation.data.messages && conversation.data.messages.length > 0) {
      const messageId = conversation.data.messages[0]._id;
      console.log('\n4. Testing Mark Message as Read...');
      const readResponse = await axios.patch(`${BASE_URL}/messages/${messageId}/read`);
      console.log('✅ Message Marked as Read:', readResponse.data);
    }

    // Test getting conversation again to see read status
    console.log('\n5. Testing Updated Conversation...');
    const updatedConversation = await axios.get(`${BASE_URL}/messages/${PATIENT_ID}?with=${SUPERVISOR_ID}`);
    console.log('✅ Updated Conversation:', JSON.stringify(updatedConversation.data, null, 2));

    console.log('\n🎉 Chat functionality working successfully!');

  } catch (error) {
    console.error('❌ Error testing chat:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      console.log('💡 This might indicate missing message routes or endpoints');
    }
  }
}

testChatEndpoints();