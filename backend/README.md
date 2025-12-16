# Recovery Road Backend API

A comprehensive real-time backend API for the Recovery Road mental health and addiction recovery platform. Built with Node.js, Express, MongoDB, and Socket.IO for real-time communication.

## 🚀 Features

- **Real-time Communication**: Socket.IO powered messaging, alerts, and live updates
- **Multi-role Authentication**: Support for Patients, Supervisors, NGOs, and Admins
- **Comprehensive Dashboard**: Role-based dashboards with real-time statistics
- **Alert System**: Crisis alerts, notifications, and system-wide communications
- **Appointment Management**: Scheduling and real-time appointment updates
- **Mood Tracking**: Patient mood logging with trend analysis
- **Activity Logging**: Recovery activities and point system
- **File Upload Support**: Profile pictures and document management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recoveryroad-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update `MONGO_URI` for cloud MongoDB.

5. **Run the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/recoveryroad` |
| `JWT_SECRET` | JWT signing secret | `recoveryroad-secret-key` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/stats` - Get real-time stats

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages` - Get conversations
- `GET /api/messages/conversation/:userId` - Get conversation with user
- `PATCH /api/messages/:messageId/read` - Mark as read
- `DELETE /api/messages/:messageId` - Delete message

### Alerts
- `GET /api/alerts` - Get user alerts
- `POST /api/alerts` - Create alert (admin/supervisor)
- `PATCH /api/alerts/:alertId/read` - Mark alert as read
- `POST /api/alerts/:alertId/response` - Record response

### Notifications
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/read/all` - Mark all as read
- `GET /api/notifications/preferences` - Get preferences
- `PUT /api/notifications/preferences` - Update preferences

### Patients (Supervisor/NGO/Admin only)
- `GET /api/patients` - Get assigned patients
- `GET /api/patients/:id` - Get patient details
- `GET /api/patients/:id/mood` - Get patient mood history
- `GET /api/patients/:id/activities` - Get patient activities

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

## 🔌 Real-time Events (Socket.IO)

### Connection
```javascript
socket.emit('join', { userId: 'user_id' });
```

### Messaging
```javascript
// Send message
socket.emit('message:send', {
  senderId: 'sender_id',
  receiverId: 'receiver_id',
  content: 'message content',
  messageType: 'text',
  isCrisis: false,
  isUrgent: false
});

// Listen for new messages
socket.on('message:new', (message) => {
  console.log('New message:', message);
});

// Typing indicators
socket.emit('typing:start', { senderId, receiverId });
socket.emit('typing:stop', { senderId, receiverId });
```

### Alerts & Notifications
```javascript
// Subscribe to alerts
socket.emit('alerts:subscribe', { userId });

// Listen for alerts
socket.on('alert:new', (alert) => {
  console.log('New alert:', alert);
});

// Crisis alerts
socket.on('crisis:alert', (alert) => {
  console.log('Crisis alert:', alert);
});
```

### Dashboard Updates
```javascript
// Subscribe to dashboard updates
socket.emit('dashboard:subscribe', { userId });

// Listen for stats updates
socket.on('dashboard:stats', (stats) => {
  console.log('Updated stats:', stats);
});
```

### User Status
```javascript
// Listen for user status changes
socket.on('user:status', (status) => {
  console.log('User status:', status);
});
```

## 🗄 Database Schema

### User Model
- **name**: String (required)
- **email**: String (required, unique)
- **passwordHash**: String (required)
- **role**: Enum ['patient', 'supervisor', 'admin', 'ngo']
- **phone**: String
- **address**: Object
- **assignedSupervisor**: ObjectId (ref: User)
- **recoveryPoints**: Number
- **onlineStatus**: Enum ['online', 'offline', 'away']
- **preferences**: Object

### Message Model
- **senderId**: ObjectId (ref: User)
- **receiverId**: ObjectId (ref: User)
- **content**: String
- **messageType**: Enum ['text', 'image', 'file']
- **isCrisis**: Boolean
- **isUrgent**: Boolean
- **priority**: Enum ['low', 'normal', 'high', 'urgent']
- **read**: Boolean
- **readAt**: Date

### Alert Model
- **title**: String
- **message**: String
- **type**: Enum ['info', 'warning', 'error', 'success', 'crisis']
- **priority**: Enum ['low', 'medium', 'high', 'urgent']
- **targetRoles**: Array
- **targetUsers**: Array
- **isActive**: Boolean
- **createdBy**: ObjectId (ref: User)

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Role-based Access Control
- **Patient**: Can access own data, communicate with assigned supervisor
- **Supervisor**: Can access assigned patients' data, create alerts
- **NGO**: Can access all patient data, manage organizations
- **Admin**: Full system access, user management

## 📊 Monitoring & Health Checks

- `GET /api/health` - Server health check
- Real-time connection monitoring via Socket.IO
- Database connection monitoring
- Error logging and reporting

## 🚀 Deployment

### Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

**Recovery Road** - Supporting mental health and addiction recovery through technology.
