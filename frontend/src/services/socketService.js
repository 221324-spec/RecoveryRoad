import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(userId) {
    if (this.socket) {
      this.socket.disconnect();
    }

    console.log('Socket: Connecting to Socket.IO server with userId:', userId);
    this.socket = io('http://localhost:5000');
    
    this.socket.on('connect', () => {
      console.log('Connected to server:', this.socket.id);
      this.isConnected = true;
      
      // Join user room for receiving messages
      this.socket.emit('join', { userId });
      console.log('Joined room for userId:', userId);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  // Listen for new messages
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('message:new', callback);
    }
  }

  // Send message via socket (optional - we can use API instead)
  sendMessage(to, message) {
    if (this.socket && this.isConnected) {
      console.log('Sending Socket.IO message:', { to, message });
      this.socket.emit('message:send', { to, message });
      console.log('Socket.IO message emitted');
    } else {
      console.error('Socket not connected, cannot send message');
    }
  }

  // Remove message listener
  offNewMessage() {
    if (this.socket) {
      this.socket.off('message:new');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

// Export singleton instance
export default new SocketService();