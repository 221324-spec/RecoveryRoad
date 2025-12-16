const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const PATIENT_ID = '68e63e313613f67e194b9113'; // From seed output

async function testEndpoints() {
  try {
    console.log('🧪 Testing RecoveryRoad Backend API Endpoints...\n');

    // Test health endpoint
    console.log('1. Testing Health Endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health:', health.data);

    // Test providers endpoint
    console.log('\n2. Testing Providers Endpoint...');
    const providers = await axios.get(`${BASE_URL}/providers`);
    console.log('✅ Providers:', providers.data);

    // Test patient mood stats
    console.log('\n3. Testing Patient Mood Stats...');
    const moodStats = await axios.get(`${BASE_URL}/patients/${PATIENT_ID}/moods/stats`);
    console.log('✅ Mood Stats:', moodStats.data);

    // Test patient moods
    console.log('\n4. Testing Patient Moods...');
    const moods = await axios.get(`${BASE_URL}/patients/${PATIENT_ID}/moods`);
    console.log('✅ Moods:', moods.data);

    // Test patient triggers
    console.log('\n5. Testing Patient Triggers...');
    const triggers = await axios.get(`${BASE_URL}/patients/${PATIENT_ID}/triggers`);
    console.log('✅ Triggers:', triggers.data);

    // Test patient activities
    console.log('\n6. Testing Patient Activities...');
    const activities = await axios.get(`${BASE_URL}/patients/${PATIENT_ID}/activities`);
    console.log('✅ Activities:', activities.data);

    // Test patient points
    console.log('\n7. Testing Patient Points...');
    const points = await axios.get(`${BASE_URL}/patients/${PATIENT_ID}/points`);
    console.log('✅ Points:', points.data);

    console.log('\n🎉 All endpoints working successfully!');

  } catch (error) {
    console.error('❌ Error testing endpoints:', error.response?.data || error.message);
  }
}

testEndpoints();