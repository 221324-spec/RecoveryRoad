// Simple API service for chat functionality
const API_BASE = 'http://localhost:5000/api';

// Updated demo user IDs from our seeded database
export const DEMO_PATIENT_ID = '693b57fe452c8c053e5a33bb'; // John Smith
export const DEMO_SUPERVISOR_ID = '693b57fe452c8c053e5a33b3'; // Sarah Johnson

export const apiService = {
  // Get patients for a supervisor
  async getPatients() {
    try {
      const token = localStorage.getItem('token');
      // For now, use the demo supervisor ID - in a real app, you'd decode the JWT to get the user ID
      const response = await fetch(`${API_BASE}/supervisors/${DEMO_SUPERVISOR_ID}/patients`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching patients:', error);
      return [];
    }
  },
  // Get messages between patient and supervisor
  async getMessages(patientId = DEMO_PATIENT_ID) {
    try {
      // Use the conversation endpoint with proper authentication
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/messages/conversation/${DEMO_SUPERVISOR_ID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.data ? data.data.messages : [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  // Send a new message
  async sendMessage(senderId, receiverId, content, messageType = 'text') {
    try {
      console.log('Sending message via API:', { senderId, receiverId, content, messageType });

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId,
          content,
          messageType
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Send message API Response:', data);
      return data.message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get messages for supervisor (with specific patient)
  async getMessagesForSupervisor(patientId) {
    try {
      const response = await fetch(`${API_BASE}/messages/${patientId}?with=${DEMO_SUPERVISOR_ID}`);
      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Error fetching messages for supervisor:', error);
      return [];
    }
  }
};