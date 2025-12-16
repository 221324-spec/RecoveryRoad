const io = require('socket.io-client');


console.log('🔌 Testing Socket.IO connection...');

const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('✅ Connected to server:', socket.id);
    

    socket.emit('join', { userId: '68e63e313613f67e194b9113' });
    console.log('📢 Emitted join event');
    
    
    socket.on('message:new', (data) => {
        console.log('📨 Received message:', data);
    });
    
   
    setTimeout(() => {
        console.log('⏰ Closing connection...');
        socket.close();
        process.exit(0);
    }, 5000);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.log('❌ Connection error:', error);
});

console.log('⏳ Connecting to Socket.IO server...');