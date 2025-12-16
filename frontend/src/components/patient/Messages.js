import React, { useState, useEffect } from 'react';
import { apiService, DEMO_PATIENT_ID, DEMO_SUPERVISOR_ID } from '../../services/chatService';
import socketService from '../../services/socketService';

export default function Messages({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Add test functions to window for debugging
  useEffect(() => {
    window.testPatientMessage = () => {
      console.log('🧪 Testing patient message from console...');
      setNewMessage('🧪 Test message from patient console');
      setTimeout(() => {
        document.querySelector('button[onClick*="sendMessage"]')?.click();
      }, 100);
    };
    
    window.testPatientSocket = () => {
      console.log('🔌 Patient Socket connected:', socketService.isConnected);
      console.log('📱 Patient ID:', DEMO_PATIENT_ID);
    };

    return () => {
      delete window.testPatientMessage;
      delete window.testPatientSocket;
    };
  }, []);

  useEffect(() => {
    loadMessages();
    
    // Connect to socket for real-time messages
    socketService.connect(DEMO_PATIENT_ID);
    
    // Listen for new messages
    socketService.onNewMessage((data) => {
      console.log('📨 Patient received real-time message:', data);
      if (data.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
      }
    });

    // Cleanup on unmount
    return () => {
      socketService.offNewMessage();
      socketService.disconnect();
    };
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await apiService.getMessages(DEMO_PATIENT_ID);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      console.log('❌ Cannot send message: missing content');
      return;
    }

    console.log('📤 Patient attempting to send message:', {
      senderId: DEMO_PATIENT_ID,
      receiverId: DEMO_SUPERVISOR_ID,
      content: newMessage.trim()
    });

    try {
      const response = await apiService.sendMessage(
        DEMO_PATIENT_ID, 
        DEMO_SUPERVISOR_ID, 
        newMessage.trim()
      );
      
      console.log('📨 Patient API Response:', response);
      
      if (response) {
        // Add message to local state immediately
        const messageToAdd = {
          _id: response._id || Date.now().toString(),
          senderId: DEMO_PATIENT_ID,
          receiverId: DEMO_SUPERVISOR_ID,
          content: newMessage.trim(),
          timestamp: new Date(),
          messageType: 'text'
        };
        
        setMessages(prev => [...prev, messageToAdd]);
        setNewMessage('');
        
        // Emit real-time message via Socket.IO
        console.log('📡 Patient emitting Socket.IO message to supervisor');
        socketService.sendMessage(DEMO_SUPERVISOR_ID, messageToAdd);
        
        console.log('✅ Patient message sent successfully');
      } else {
        console.error('❌ No response from API');
      }
    } catch (error) {
      console.error('❌ Patient error sending message:', error);
      alert('Failed to send message. Please check the console for details.');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-3 flex-shrink-0">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Back to Dashboard"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Supervisor Profile */}
            <div className="flex items-center flex-1">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md text-lg">
                  👩‍⚕️
                </div>
                {/* Online status indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-sky-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="ml-3 flex-1">
                <h2 className="font-semibold text-gray-900 text-base">Dr. Sarah Wilson</h2>
                <p className="text-sm text-sky-600 flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Online
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Video Call">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Voice Call">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="More options">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Messages Area - Enhanced visibility */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[60vh] bg-gray-100">
          {loading ? (
            <div className="text-center text-gray-600 text-lg">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">No messages yet. Start a conversation!</div>
          ) : (
            messages.map((msg) => {
              const isPatient = msg.senderId?.toString() === DEMO_PATIENT_ID || msg.senderId === DEMO_PATIENT_ID;
              return (
                <div
                  key={msg._id}
                  className={`flex ${isPatient ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex max-w-xs lg:max-w-md ${isPatient ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg shadow-lg">
                      {isPatient ? '👤' : '👩‍⚕️'}
                    </div>
                    <div className={`${isPatient ? 'text-right' : 'text-left'}`}>
                      <div className="text-sm text-gray-600 mb-1 font-medium">
                        {isPatient ? 'You' : 'Dr. Emma Wilson'}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl text-base shadow-lg ${
                          isPatient
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border-2 border-gray-300 text-gray-900'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Professional Message Input */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 shadow-lg">
          <div className="flex items-end space-x-3">
            {/* Attachment button */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            {/* Message input container */}
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message to Dr. Emma Wilson..."
                className="w-full max-h-32 min-h-[2.5rem] px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 resize-none bg-white text-gray-900 shadow-sm text-base"
                rows="1"
              />
            </div>
            
            {/* Send button */}
            <div className="flex items-center">
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg flex items-center gap-2 ${
                  newMessage.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="text-lg">📤</span>
                Send
              </button>
            </div>
          </div>
          
          {/* Security info */}
          <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Messages are secured with end-to-end encryption
          </div>
        </div>
    </div>
  );
}