const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const SUPERVISOR_ID = '68e63e313613f67e194b9111'; // From seed output
const PATIENT_ID = '68e63e313613f67e194b9113'; // From seed output

async function testSupervisorEndpoints() {
  try {
    console.log('🧪 Testing Supervisor Dashboard API Endpoints...\n');

    // Test supervisor's patients
    console.log('1. Testing Supervisor\'s Patients...');
    const patients = await axios.get(`${BASE_URL}/supervisors/${SUPERVISOR_ID}/patients`);
    console.log('✅ Patients:', patients.data);

    // Test patient overview
    console.log('\n2. Testing Patient Overview...');
    const overview = await axios.get(`${BASE_URL}/supervisors/${SUPERVISOR_ID}/patients/${PATIENT_ID}/overview`);
    console.log('✅ Patient Overview:', JSON.stringify(overview.data, null, 2));

    // Test patient statistics
    console.log('\n3. Testing Patient Statistics...');
    const stats = await axios.get(`${BASE_URL}/supervisors/${SUPERVISOR_ID}/statistics`);
    console.log('✅ Patient Statistics:', JSON.stringify(stats.data, null, 2));

    // Test alerts
    console.log('\n4. Testing Alerts...');
    const alerts = await axios.get(`${BASE_URL}/supervisors/${SUPERVISOR_ID}/alerts`);
    console.log('✅ Alerts:', JSON.stringify(alerts.data, null, 2));

    console.log('\n🎉 All supervisor endpoints working successfully!');

  } catch (error) {
    console.error('❌ Error testing supervisor endpoints:', error.response?.data || error.message);
  }
}

testSupervisorEndpoints();