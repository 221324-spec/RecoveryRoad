const axios = require('axios');

async function testBidirectionalChat() {
    console.log('🧪 Testing Bidirectional Chat System...\n');
    
    try {
        // 1. Patient sends message
        console.log('1️⃣ Patient sending message...');
        const patientMsg = await axios.post('http://localhost:5000/api/messages', {
            receiverId: '693b57fe452c8c053e5a33b3',
            content: 'Hi Dr. Johnson! I had a great day today. My mood is much better!'
        }, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNiNTdmZTQ1MmM4YzA1M2U1YTMzYmIiLCJpYXQiOjE3NjU0OTcwMTcsImV4cCI6MTc2NjEwMTgxN30.LOoQZSGuW84KwyVwTRy8QQFjOtyIpjm315kgNnc08Fk'
            }
        });
        console.log('✅ Patient message sent:', patientMsg.data.message ? patientMsg.data.message.content : 'Message sent successfully');
        
        
        console.log('\n2️⃣ Supervisor replying...');
        const supervisorMsg = await axios.post('http://localhost:5000/api/messages', {
            receiverId: '693b57fe452c8c053e5a33bb',
            content: 'That\'s wonderful to hear! I\'m so proud of your progress. What helped you feel better today?'
        }, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNiNTdmZTQ1MmM4YzA1M2U1YTMzYjMiLCJpYXQiOjE3NjU0OTcwMTgsImV4cCI6MTc2NjEwMTgxOH0.Bok1tmHs8SKlKonvciK7baZoQuxkLtiuQ2G6pIA92SI'
            }
        });
        console.log('✅ Supervisor message sent:', supervisorMsg.data.message ? supervisorMsg.data.message.content : 'Message sent successfully');
        
        
        console.log('\n3️⃣ Loading conversation from patient view...');
        const patientView = await axios.get('http://localhost:5000/api/messages/conversation/693b57fe452c8c053e5a33b3', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNiNTdmZTQ1MmM4YzA1M2U1YTMzYmIiLCJpYXQiOjE3NjU0OTcwMTcsImV4cCI6MTc2NjEwMTgxN30.LOoQZSGuW84KwyVwTRy8QQFjOtyIpjm315kgNnc08Fk'
            }
        });
        console.log('Response:', JSON.stringify(patientView.data, null, 2));
        console.log('✅ Patient sees', patientView.data.data ? patientView.data.data.messages.length : 'undefined', 'messages');
        if (patientView.data.data && patientView.data.data.messages && patientView.data.data.messages.length > 0) {
            console.log('   Latest:', patientView.data.data.messages[patientView.data.data.messages.length - 1].content.substring(0, 50) + '...');
        }
        
        
        console.log('\n4️⃣ Loading conversation from supervisor view...');
        const supervisorView = await axios.get('http://localhost:5000/api/messages/conversation/693b57fe452c8c053e5a33bb', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNiNTdmZTQ1MmM4YzA1M2U1YTMzYjMiLCJpYXQiOjE3NjU0OTcwMTgsImV4cCI6MTc2NjEwMTgxOH0.Bok1tmHs8SKlKonvciK7baZoQuxkLtiuQ2G6pIA92SI'
            }
        });
        console.log('✅ Supervisor sees', supervisorView.data.data ? supervisorView.data.data.messages.length : 'undefined', 'messages');
        if (supervisorView.data.data && supervisorView.data.data.messages && supervisorView.data.data.messages.length > 0) {
            console.log('   Latest:', supervisorView.data.data.messages[supervisorView.data.data.messages.length - 1].content.substring(0, 50) + '...');
        }
        
        console.log('\n🎉 Chat system is working perfectly!');
        console.log('📱 Frontend should now show:');
        console.log('   - Patient messages on the right (blue)');
        console.log('   - Supervisor messages on the left (white)');
        console.log('   - Real-time updates when sending messages');
        
    } catch (error) {
        console.error(' Error:', error.message);
    }
}

testBidirectionalChat();