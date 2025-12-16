import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaExclamationCircle, FaInfoCircle, FaClipboardList, FaCheckCircle, FaChartBar, FaBullseye, FaChartLine } from 'react-icons/fa';

export default function SmartAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'critical', 'warning', 'info'

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    setLoading(true);
    
    // Mock alerts data
    const mockAlerts = [
      {
        id: 1,
        type: 'critical',
        priority: 'high',
        patient: 'Mike Wilson',
        patientId: 3,
        title: 'Self-harm keywords detected',
        message: 'Patient mentioned "wanting to give up" and "not worth it" in recent check-in notes',
        timestamp: '2025-09-30T14:30:00',
        status: 'active',
        triggerType: 'keyword_detection',
        riskScore: 85,
        actions: ['Contact immediately', 'Schedule urgent session', 'Alert emergency contact']
      },
      {
        id: 2,
        type: 'warning',
        priority: 'medium',
        patient: 'Sarah Johnson',
        patientId: 2,
        title: 'High craving frequency',
        message: 'Patient reported 3+ cravings in the past week',
        timestamp: '2025-09-30T10:15:00',
        status: 'active',
        triggerType: 'craving_frequency',
        riskScore: 65,
        actions: ['Schedule check-in', 'Review coping strategies', 'Increase monitoring']
      },
      {
        id: 3,
        type: 'warning',
        priority: 'medium',
        patient: 'Mike Wilson',
        patientId: 3,
        title: 'Missed check-ins',
        message: 'Patient has missed check-ins for 2+ consecutive days',
        timestamp: '2025-09-30T09:00:00',
        status: 'active',
        triggerType: 'missed_checkins',
        riskScore: 70,
        actions: ['Contact patient', 'Check emergency contacts', 'Schedule wellness check']
      },
      {
        id: 4,
        type: 'info',
        priority: 'low',
        patient: 'David Brown',
        patientId: 5,
        title: 'Mood decline trend',
        message: 'Patient mood has been declining over the past 3 days',
        timestamp: '2025-09-30T08:45:00',
        status: 'acknowledged',
        triggerType: 'mood_trend',
        riskScore: 45,
        actions: ['Monitor closely', 'Encourage activities', 'Check support system']
      },
      {
        id: 5,
        type: 'critical',
        priority: 'high',
        patient: 'Sarah Johnson',
        patientId: 2,
        title: 'Relapse risk prediction',
        message: 'ML model predicts 78% risk of relapse in next 7 days',
        timestamp: '2025-09-29T16:20:00',
        status: 'active',
        triggerType: 'ml_prediction',
        riskScore: 78,
        actions: ['Immediate intervention', 'Increase session frequency', 'Review medication']
      }
    ];

    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <FaExclamationTriangle className="text-red-500" />;
      case 'warning': return <FaExclamationCircle className="text-yellow-500" />;
      case 'info': return <FaInfoCircle className="text-blue-500" />;
      default: return <FaClipboardList className="text-gray-500" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 border-red-300 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'info': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-sky-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-sky-100 text-sky-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' }
        : alert
    ));
  };

  const handleResolve = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .modern-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .modern-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .modern-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8B5CF6, #7C3AED);
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }
        .modern-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333EA, #7C3AED);
        }
        
        .scrollable-area::-webkit-scrollbar {
          width: 6px;
        }
        .scrollable-area::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 8px;
        }
        .scrollable-area::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8B5CF6, #7C3AED);
          border-radius: 8px;
        }
        .scrollable-area::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333EA, #7C3AED);
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6 overflow-y-auto modern-scrollbar">
        {/* Alert Summary Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-xl">
                    <FaExclamationTriangle />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">
                      {alerts.filter(a => a.type === 'critical' && a.status === 'active').length}
                    </div>
                    <div className="text-sm font-medium text-red-700">Critical Alerts</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white text-xl">
                    <FaExclamationCircle />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">
                      {alerts.filter(a => a.type === 'warning' && a.status === 'active').length}
                    </div>
                    <div className="text-sm font-medium text-yellow-700">Warnings</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                    <FaInfoCircle />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {alerts.filter(a => a.type === 'info' && a.status === 'active').length}
                    </div>
                    <div className="text-sm font-medium text-blue-700">Info Alerts</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-2xl border border-sky-200 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h12 bg-sky-500 rounded-xl flex items-center justify-center text-white text-xl">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-sky-600">
                      {alerts.filter(a => a.status === 'resolved').length}
                    </div>
                    <div className="text-sm font-medium text-sky-700">Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side by Side Layout: Active Alerts & AI Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Active Alerts */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Active Alerts</h3>
              <p className="text-gray-600 text-sm">Real-time monitoring and incident management</p>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto scrollable-area p-6">
              <div className="space-y-6">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className={`p-6 rounded-2xl border-l-8 hover:shadow-lg transition-all duration-200 ${
                    alert.type === 'critical' ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-500' : 
                    alert.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500' : 
                    'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500'
                  }`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                          {getAlertIcon(alert.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="text-xl font-bold text-gray-900">{alert.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`}></div>
                            <span className="text-sm font-medium text-gray-600">{alert.priority.toUpperCase()}</span>
                          </div>
                          
                          <p className="text-gray-700 text-base mb-4 leading-relaxed">{alert.message}</p>
                          
                          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                            <span className="font-medium">Patient: <strong className="text-gray-900">{alert.patient}</strong></span>
                            <span className="font-medium">Risk: <strong className={alert.riskScore > 70 ? 'text-red-600' : alert.riskScore > 40 ? 'text-yellow-600' : 'text-sky-600'}>{alert.riskScore}%</strong></span>
                            <span className="font-medium">{formatTimestamp(alert.timestamp)}</span>
                          </div>

                          {/* Recommended Actions */}
                          <div>
                            <h5 className="text-sm font-bold text-gray-800 mb-2">Actions:</h5>
                            <div className="flex flex-wrap gap-2">
                              {alert.actions.slice(0, 2).map((action, index) => (
                                <span key={index} className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                                  {action}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {alert.status === 'active' && (
                          <>
                            <button 
                              onClick={() => handleAcknowledge(alert.id)}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 font-medium shadow-lg text-xs"
                            >
                              Acknowledge
                            </button>
                            <button 
                              onClick={() => handleResolve(alert.id)}
                              className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-lg text-xs"
                            >
                              Resolve
                            </button>
                          </>
                        )}
                        {alert.status === 'acknowledged' && (
                          <button 
                            onClick={() => handleResolve(alert.id)}
                            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-lg text-xs"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">AI Insights & Analytics</h3>
              <p className="text-gray-600 text-sm">Machine learning powered analysis and predictions</p>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto scrollable-area">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border-l-8 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-500">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                        <FaInfoCircle />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">Sentiment Analysis</h4>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">
                            ACTIVE
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                          <span className="text-sm font-medium text-gray-600">HIGH ACCURACY</span>
                        </div>
                        
                        <p className="text-gray-700 text-base mb-4 leading-relaxed">Analyzing patient language patterns for emotional state detection and risk assessment using advanced NLP algorithms.</p>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                          <span className="font-medium">Last updated: <strong className="text-gray-900">2 hours ago</strong></span>
                          <span className="font-medium">Accuracy: <strong className="text-sky-600">94.2%</strong></span>
                          <span className="font-medium">Processing: <strong className="text-blue-600">Real-time</strong></span>
                        </div>

                        {/* Status Indicators */}
                        <div>
                          <h5 className="text-sm font-bold text-gray-800 mb-2">Status:</h5>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              NLP Processing
                            </span>
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Emotional Analysis
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl border-l-8 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                        <FaChartBar />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">Predictive Analytics</h4>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            ACTIVE
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-medium text-gray-600">MACHINE LEARNING</span>
                        </div>
                        
                        <p className="text-gray-700 text-base mb-4 leading-relaxed">Machine learning models predict relapse risk based on behavioral patterns, check-in data, and historical trends.</p>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                          <span className="font-medium">Model accuracy: <strong className="text-blue-600">87.3%</strong></span>
                          <span className="font-medium">Processing: <strong className="text-orange-600">Real-time</strong></span>
                          <span className="font-medium">Predictions: <strong className="text-gray-900">Updated hourly</strong></span>
                        </div>

                        {/* Status Indicators */}
                        <div>
                          <h5 className="text-sm font-bold text-gray-800 mb-2">Features:</h5>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Risk Assessment
                            </span>
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Trend Analysis
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-l-8 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-sky-50 to-sky-100 border-sky-500">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-sky-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                        <FaBullseye />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">Risk Assessment</h4>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">
                            ACTIVE
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                          <span className="text-sm font-medium text-gray-600">MULTI-FACTOR</span>
                        </div>
                        
                        <p className="text-gray-700 text-base mb-4 leading-relaxed">Comprehensive risk scoring algorithm that evaluates multiple factors to determine intervention priority levels.</p>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                          <span className="font-medium">Update frequency: <strong className="text-sky-600">Every 15min</strong></span>
                          <span className="font-medium">Analysis type: <strong className="text-yellow-600">Multi-factor</strong></span>
                          <span className="font-medium">Coverage: <strong className="text-gray-900">All patients</strong></span>
                        </div>

                        {/* Status Indicators */}
                        <div>
                          <h5 className="text-sm font-bold text-gray-800 mb-2">Factors:</h5>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Behavioral Patterns
                            </span>
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Risk Scoring
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-l-8 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-rose-50 to-rose-100 border-rose-500">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
                        <FaChartLine />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">Pattern Recognition</h4>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                            ACTIVE
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                          <span className="text-sm font-medium text-gray-600">DEEP LEARNING</span>
                        </div>
                        
                        <p className="text-gray-700 text-base mb-4 leading-relaxed">Advanced algorithms identify behavioral patterns and anomalies in patient data to enable proactive interventions.</p>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                          <span className="font-medium">Model type: <strong className="text-rose-600">Deep Learning</strong></span>
                          <span className="font-medium">Accuracy: <strong className="text-purple-600">91.7%</strong></span>
                          <span className="font-medium">Analysis: <strong className="text-gray-900">Continuous</strong></span>
                        </div>

                        {/* Status Indicators */}
                        <div>
                          <h5 className="text-sm font-bold text-gray-800 mb-2">Capabilities:</h5>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Anomaly Detection
                            </span>
                            <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                              Pattern Analysis
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}