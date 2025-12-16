require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

// Socket.IO - Enhanced real-time functionality
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Make io globally available
global.io = io;

const dbConnect = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patient');
const messageRoutes = require('./routes/messages');
const appointmentRoutes = require('./routes/appointments');
const profileRoutes = require('./routes/profile');
const supervisorRoutes = require('./routes/supervisor');
const dashboardRoutes = require('./routes/dashboard');
const alertRoutes = require('./routes/alerts');
const notificationRoutes = require('./routes/notifications');

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to database
dbConnect();

// Make io available to routes
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/notifications', notificationRoutes);

// Legacy route for backward compatibility
const appointmentController = require('./controllers/appointmentController');
app.get('/api/providers', appointmentController.getProviders);

// Health check
app.get('/api/health', (req, res) => res.json({
  ok: true,
  time: new Date(),
  version: '2.0.0',
  realtime: 'enabled'
}));

// Enhanced Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  // User joins their personal room
  socket.on('join', async (data) => {
    try {
      if (data && data.userId) {
        socket.join(`user:${data.userId}`);
        console.log(`👤 User ${data.userId} joined their room`);

        // Update user online status
        const User = require('./models/User');
        await User.findByIdAndUpdate(data.userId, {
          onlineStatus: 'online',
          lastSeen: new Date()
        });

        // Notify others about online status
        socket.broadcast.emit('user:status', {
          userId: data.userId,
          status: 'online',
          lastSeen: new Date()
        });
      }
    } catch (error) {
      console.error('Join room error:', error);
    }
  });

  // Real-time messaging
  socket.on('message:send', async (msg) => {
    try {
      if (msg && msg.receiverId && msg.content) {
        // Import message controller dynamically
        const messageController = require('./controllers/messageController');

        // Create a mock request/response for the controller
        const mockReq = {
          user: { userId: msg.senderId },
          body: {
            receiverId: msg.receiverId,
            content: msg.content,
            messageType: msg.messageType || 'text',
            isCrisis: msg.isCrisis || false,
            isUrgent: msg.isUrgent || false,
            priority: msg.priority || 'normal'
          },
          app: { get: () => io }
        };

        const mockRes = {
          status: (code) => ({
            json: (data) => {
              if (code === 201) {
                // Emit to receiver
                io.to(`user:${msg.receiverId}`).emit('message:new', data.data.message);

                // Emit to sender (for multi-device support)
                io.to(`user:${msg.senderId}`).emit('message:sent', data.data.message);
              }
            }
          })
        };

        await messageController.sendMessage(mockReq, mockRes);
      }
    } catch (error) {
      console.error('Real-time message send error:', error);
    }
  });

  // Typing indicators
  socket.on('typing:start', (data) => {
    if (data && data.receiverId && data.senderId) {
      socket.to(`user:${data.receiverId}`).emit('typing:start', {
        senderId: data.senderId
      });
    }
  });

  socket.on('typing:stop', (data) => {
    if (data && data.receiverId && data.senderId) {
      socket.to(`user:${data.receiverId}`).emit('typing:stop', {
        senderId: data.senderId
      });
    }
  });

  // Real-time dashboard updates
  socket.on('dashboard:subscribe', (data) => {
    if (data && data.userId) {
      socket.join(`dashboard:${data.userId}`);
      console.log(`📊 User ${data.userId} subscribed to dashboard updates`);
    }
  });

  // Appointment updates
  socket.on('appointment:subscribe', (data) => {
    if (data && data.userId) {
      socket.join(`appointments:${data.userId}`);
      console.log(`📅 User ${data.userId} subscribed to appointment updates`);
    }
  });

  // Alert subscriptions
  socket.on('alerts:subscribe', (data) => {
    if (data && data.userId) {
      socket.join(`alerts:${data.userId}`);
      console.log(`🚨 User ${data.userId} subscribed to alerts`);
    }
  });

  // Crisis alerts (high priority)
  socket.on('crisis:alert', async (data) => {
    try {
      if (data && data.userId && data.message) {
        const User = require('./models/User');
        const user = await User.findById(data.userId);

        if (user) {
          // Find supervisors and emit crisis alert
          const supervisors = await User.find({
            role: 'supervisor',
            isActive: true
          });

          for (const supervisor of supervisors) {
            io.to(`user:${supervisor._id}`).emit('crisis:alert', {
              patientId: data.userId,
              patientName: user.name,
              message: data.message,
              timestamp: new Date()
            });
          }

          // Also emit to NGOs
          const ngos = await User.find({
            role: 'ngo',
            isActive: true
          });

          for (const ngo of ngos) {
            io.to(`user:${ngo._id}`).emit('crisis:alert', {
              patientId: data.userId,
              patientName: user.name,
              message: data.message,
              timestamp: new Date()
            });
          }
        }
      }
    } catch (error) {
      console.error('Crisis alert error:', error);
    }
  });

  // User status updates
  socket.on('status:update', async (data) => {
    try {
      if (data && data.userId && data.status) {
        const User = require('./models/User');
        await User.findByIdAndUpdate(data.userId, {
          onlineStatus: data.status,
          lastSeen: new Date()
        });

        // Broadcast status change to all connected users
        socket.broadcast.emit('user:status', {
          userId: data.userId,
          status: data.status,
          lastSeen: new Date()
        });
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  });

  // Disconnect handling
  socket.on('disconnect', async () => {
    try {
      console.log('🔌 Socket disconnected:', socket.id);

      // Find user by socket and update status
      // Note: In production, you'd want to track socket-to-user mapping
      // For now, we'll handle this in the logout endpoint
    } catch (error) {
      console.error('Disconnect handling error:', error);
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Recovery Road Backend Server running on port ${PORT}`);
  console.log(`📡 Real-time functionality enabled`);
  console.log(`🌐 CORS enabled for ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
});
