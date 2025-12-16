import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaUser } from 'react-icons/fa';
import { apiService, DEMO_SUPERVISOR_ID } from '../../services/chatService';
import socketService from '../../services/socketService';

export default function CommunicationHub() {
  console.log('🎨 COOL & AWESOME Communication Hub! MATCHING PATIENT CHAT');
  console.log('🔍 Component mounted at:', new Date().toISOString());
  
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRealPatients = async () => {
    console.log('🔍 Loading REAL patients from API...');
    setIsLoading(true);
    setError('');
    
    try {
      const apiPatients = await apiService.getPatients();
      console.log('✅ API Response received:', apiPatients);
      
      if (apiPatients && apiPatients.length > 0) {
        console.log('🎯 Setting REAL patients:', apiPatients.length, 'patients found');
        setPatients(apiPatients);
        setSelectedPatient(apiPatients[0]);
        await loadMessages(apiPatients[0]._id);
      } else {
        console.log('⚠️ No patients found in API response');
        setError('No patients found');
        setPatients([]);
      }
    } catch (error) {
      console.error('❌ Error loading patients:', error);
      setError(`Failed to load patients: ${error.message}`);
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (patientId) => {
    if (!patientId) return;
    
    try {
      console.log('💬 Loading messages for patient:', patientId);
      const chatMessages = await apiService.getMessages(patientId);
      console.log('📨 Messages loaded:', chatMessages.length);
      setMessages(chatMessages || []);
    } catch (error) {
      console.error('❌ Error loading messages:', error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedPatient) return;

    console.log('📤 Supervisor sending message to:', selectedPatient.name);

    try {
      const response = await apiService.sendMessage(
        DEMO_SUPERVISOR_ID || '68e63e313613f67e194b9111',
        selectedPatient._id,
        newMessage.trim(),
        'text'
      );
      
      console.log('✅ Message sent successfully:', response);
      setMessages(prev => [...prev, response]);
      setNewMessage('');
      
      // Emit via socket for real-time updates
      socketService.sendMessage({
        senderId: DEMO_SUPERVISOR_ID || '68e63e313613f67e194b9111',
        receiverId: selectedPatient._id,
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const selectPatient = async (patient) => {
    setSelectedPatient(patient);
    await loadMessages(patient._id);
  };

  useEffect(() => {
    loadRealPatients();
    socketService.connect(DEMO_SUPERVISOR_ID || '68e63e313613f67e194b9111');
    
    socketService.onNewMessage((data) => {
      console.log('📨 Real-time message received:', data);
      if (data.message && selectedPatient) {
        const isForCurrentPatient = 
          data.message.senderId === selectedPatient._id || 
          data.message.receiverId === selectedPatient._id;
        
        if (isForCurrentPatient) {
          setMessages(prev => [...prev, data.message]);
        }
      }
    });

    return () => {
      socketService.offNewMessage();
      socketService.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      loadMessages(selectedPatient._id);
    }
  }, [selectedPatient]);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Patient Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-xl flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                <div className="absolute inset-0 animate-pulse rounded-full h-12 w-12 border-t-4 border-purple-400"></div>
              </div>
              <span className="ml-4 text-gray-700 font-medium">Loading patients...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-4 shadow-md">
              <div className="flex items-center">
                <span className="text-red-500 mr-3 text-xl"><FaExclamationTriangle /></span>
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {patients.map((patient) => (
              <div
                key={patient._id}
                onClick={() => selectPatient(patient)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-102 ${
                  selectedPatient?._id === patient._id
                    ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md ring-2 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {patient.name?.charAt(0)?.toUpperCase() || <FaUser />}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sky-400 border-3 border-white rounded-full shadow-md"></div>
                  </div>
                  
                      <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate text-lg">{patient.name}</h4>
                    <p className="text-sm text-gray-600 truncate">Patient ID: {patient._id?.slice(-8)}</p>
                    <div className="flex items-center mt-2">
                      <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-xs text-sky-600 font-semibold">Active Now</span>
                    </div>
                  </div>
                  
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Chat Interface */}
      <div className="flex-1 flex flex-col bg-white shadow-lg mt-24">
        {selectedPatient ? (
          <>
            <header className="bg-white shadow-sm border-b border-gray-200 p-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg text-lg">
                      {selectedPatient.name?.charAt(0)?.toUpperCase() || <FaUser />}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sky-400 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="ml-4">
                    <h2 className="font-bold text-gray-900 text-lg">{selectedPatient.name}</h2>
                    <p className="text-sm text-sky-600 flex items-center font-medium">
                      <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse"></span>
                      Online • Available for chat
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group" title="Video Call">
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-3 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 hover:from-sky-100 hover:to-indigo-100 transition-all duration-200 group" title="Voice Call">
                    <svg className="w-5 h-5 text-sky-600 group-hover:text-sky-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group" title="More Options">
                    <svg className="w-5 h-5 text-purple-600 group-hover:text-purple-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0 bg-gradient-to-b from-gray-50 to-white">
              {messages.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                    💬
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No messages yet</h3>
                  <p className="text-gray-600">Start a conversation to begin helping your patient</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isSupervisor = msg.senderId === (DEMO_SUPERVISOR_ID || '68e63e313613f67e194b9111');
                  return (
                    <div key={index} className={`flex ${isSupervisor ? 'justify-end' : 'justify-start'} mb-6`}>
                      <div className={`flex max-w-lg ${isSupervisor ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg ${
                            isSupervisor 
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                              : 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
                          }`}>
                            {isSupervisor 
                              ? '👩‍⚕️' 
                              : selectedPatient.name?.charAt(0)?.toUpperCase() || '👤'
                            }
                          </div>
                        </div>
                        
                        <div className={`${isSupervisor ? 'text-right' : 'text-left'} max-w-sm`}>
                          <div className="text-sm text-gray-600 mb-2 font-medium">
                            {isSupervisor ? 'Dr. Supervisor' : selectedPatient.name}
                          </div>
                          
                          <div className={`relative px-4 py-3 rounded-2xl text-base shadow-lg transition-all duration-200 hover:shadow-xl ${
                              isSupervisor 
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md' 
                                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
                            }`}>
                            {msg.content}
                            
                            {/* Message tail */}
                            <div className={`absolute w-3 h-3 ${
                              isSupervisor 
                                ? 'bg-purple-600 bottom-0 right-0 transform rotate-45 translate-x-1 translate-y-1' 
                                : 'bg-white border-r border-b border-gray-200 bottom-0 left-0 transform rotate-45 -translate-x-1 translate-y-1'
                            }`}></div>
                          </div>
                          
                          <div className={`text-xs text-gray-500 mt-2 ${isSupervisor ? 'text-right' : 'text-left'}`}>
                            {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                            {isSupervisor && (
                              <span className="ml-2">
                                <svg className="inline w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="bg-white border-t border-gray-200 p-6 flex-shrink-0 shadow-xl">
              <div className="flex items-end space-x-4">
                <button className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                <button className="p-3 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0V3a1 1 0 011-1h8a1 1 0 011 1v1M5 7h14l-1 10a1 1 0 01-1 1H7a1 1 0 01-1-1L5 7z" />
                  </svg>
                </button>
                
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
                    placeholder={`Send a message to ${selectedPatient.name}...`}
                    className="w-full max-h-32 min-h-[3rem] px-5 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none bg-gray-50 text-gray-900 shadow-inner text-base placeholder-gray-500 transition-all duration-200"
                    rows="1"
                  />
                  
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg flex items-center gap-3 text-lg ${
                    newMessage.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xl">📤</span>
                  <span>Send</span>
                </button>
              </div>
              
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Secure end-to-end encrypted messaging</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center max-w-md">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-6 shadow-xl">
                💬
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Communication Hub</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Select a patient from the sidebar to start a secure conversation and provide real-time support
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>End-to-end encrypted</span>
                <span>•</span>
                <span>HIPAA compliant</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}