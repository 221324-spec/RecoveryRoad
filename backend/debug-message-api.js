const axios = require('axios');

async function testMessageAPI() {
    try {
        console.log('🧪 Testing message API...');
        
        const response = await axios.post('http://localhost:5000/api/messages', {
            senderId: '68e63e313613f67e194b9111',
            receiverId: '68e63e313613f67e194b9113', 
            content: 'Test from supervisor - debugging API',
            messageType: 'text'
        });
        
        console.log(' Success! Message sent:');
        console.log('   ID:', response.data.message._id);
        console.log('   Content:', response.data.message.content);
        console.log('   From:', response.data.message.senderId);
        console.log('   To:', response.data.message.receiverId);
        
    } catch (error) {
        console.log(' Error details:');
        if (error.response) {
            console.log('   Status:', error.response.status);
            console.log('   Data:', error.response.data);
        } else {
            console.log('   Message:', error.message);
        }
    }
}

testMessageAPI();