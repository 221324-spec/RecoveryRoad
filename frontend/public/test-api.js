// Simple test to verify API functionality
const API_BASE = 'http://localhost:5000/api';
const DEMO_SUPERVISOR_ID = '68e63e313613f67e194b9111';
const DEMO_PATIENT_ID = '68e63e313613f67e194b9113';

async function testAPIMessage() {
  try {
    console.log('🧪 Testing API message sending...');
    
    const response = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: DEMO_SUPERVISOR_ID,
        receiverId: DEMO_PATIENT_ID,
        content: '🧪 API Test Message: This is a test from the browser console',
        messageType: 'text'
      })
    });
    
    const result = await response.json();
    console.log('✅ API Response:', result);
    
    if (result.success) {
      console.log('🎉 Message sent successfully! ID:', result.message._id);
    } else {
      console.error('❌ API Error:', result);
    }
    
  } catch (error) {
    console.error('❌ Network/API Error:', error);
  }
}

// Test health endpoint
async function testHealthEndpoint() {
  try {
    console.log('🏥 Testing health endpoint...');
    const response = await fetch(`${API_BASE}/health`);
    const result = await response.json();
    console.log('✅ Health Response:', result);
  } catch (error) {
    console.error('❌ Health Check Failed:', error);
  }
}

// Test getting messages
async function testGetMessages() {
  try {
    console.log('📥 Testing get messages...');
    const response = await fetch(`${API_BASE}/messages/${DEMO_PATIENT_ID}?with=${DEMO_SUPERVISOR_ID}`);
    const result = await response.json();
    console.log('✅ Messages Response:', result);
  } catch (error) {
    console.error('❌ Get Messages Failed:', error);
  }
}

// Run all tests
console.log('🚀 Starting API Tests...');
console.log('Copy and paste these functions in browser console:');
console.log('testHealthEndpoint()');
console.log('testAPIMessage()'); 
console.log('testGetMessages()');

// Auto-run health check
testHealthEndpoint();