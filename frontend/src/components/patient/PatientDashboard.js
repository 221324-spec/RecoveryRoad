import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaHome, FaSmile, FaBolt, FaDumbbell, FaCalendarAlt, FaEnvelope, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import FloatingChat from './FloatingChat';
import CrisisButton from './CrisisButton';
import Messages from './Messages';
import MoodLoggingScreen from './MoodLoggingScreen';
import TriggerLoggingScreen from './TriggerLoggingScreen';
import ActivityLoggingScreen from './ActivityLoggingScreen';
import AppointmentsScreen from './AppointmentsScreen';
import './PatientDashboard.css';
import { useAuth } from '../../context/AuthContext';
import '../supervisor/SupervisorDashboardNavigation.css';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState('home'); // 'home', 'messages', 'mood', 'trigger', 'activity', 'appointments'
  const [activeDialog, setActiveDialog] = useState(null); // 'crisis' or 'chat' or null
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({ dashboard: true, communication: true });
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        if (data.success) {
          setDashboardData(data.data);
        } else {
          throw new Error(data.message || 'Failed to load dashboard');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleProfileClick = () => {
    navigate('/patient/profile');
  };
  const handleMessagesClick = () => {
    setCurrentView('messages');
  };
  const handleBackToDashboard = () => {
    setCurrentView('home');
  };
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  const toggleMenu = (menu) => {
    // Accordion behavior: open only the requested menu, close others
    setExpandedMenus(prev => {
      const isOpen = !!prev[menu];
      return {
        dashboard: false,
        communication: false,
        [menu]: !isOpen
      };
    });
  };

  // Get recovery stats from backend data
  const getRecoveryStats = () => {
    if (!dashboardData || !dashboardData.stats) {
      return {
        streakDays: 0,
        totalCheckIns: 0,
        avgMood: 0,
        triggersIdentified: 0,
        recoveryPoints: 0,
        sobrietyDays: 0,
        unreadMessages: 0,
        upcomingAppointments: 0
      };
    }

    const stats = dashboardData.stats;
    return {
      streakDays: stats.streakDays || 0,
      totalCheckIns: stats.totalCheckIns || 0,
      avgMood: stats.avgMood ? Math.round(stats.avgMood * 10) / 10 : 0,
      triggersIdentified: stats.triggersIdentified || 0,
      recoveryPoints: stats.recoveryPoints || 0,
      sobrietyDays: stats.sobrietyDays || 0,
      unreadMessages: stats.unreadMessages || 0,
      upcomingAppointments: stats.upcomingAppointments || 0
    };
  };

  const stats = getRecoveryStats();

  const isDashboardActive = ['home', 'mood', 'trigger', 'activity'].includes(currentView);
  const isCommunicationActive = ['appointments', 'messages'].includes(currentView);

  return (
    <div className="patient-dashboard min-h-screen h-screen flex bg-gray-50 overflow-hidden">
      <aside className={`bg-gradient-to-b from-blue-600 to-blue-700 shadow-xl border-r border-blue-500 flex flex-col py-8 px-6 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <FaChevronRight className="text-white" /> : <FaChevronLeft className="text-white" />}
          </button>
        </div>

        <div className={`mb-10 flex flex-col items-center ${sidebarCollapsed ? 'mb-6' : ''}`}>
          <div className={`bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg ${sidebarCollapsed ? 'w-12 h-12' : 'w-16 h-16'}`}>
            <span className={`text-white font-bold ${sidebarCollapsed ? 'text-xl' : 'text-2xl'}`}>RR</span>
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="text-2xl font-bold text-white mb-2">RecoveryRoad</div>
              <span className="text-blue-200 text-sm bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">PATIENT PORTAL</span>
            </>
          )}
        </div>

        <nav className="supervisor-sidebar-nav flex flex-col space-y-2">
          {/* Dashboard Section with Expandable Menu */}
          <div>
            <button 
              onClick={() => { 
                setCurrentView('home'); 
                if (!sidebarCollapsed && !expandedMenus.dashboard) {
                  toggleMenu('dashboard');
                }
              }}
              className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center px-2' : ''
              }`}
              style={{ backgroundColor: isDashboardActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
              title={sidebarCollapsed ? "Dashboard" : ""}
            >
              <div className="flex items-center">
                <span className={`text-lg ${isDashboardActive ? 'text-white' : 'text-blue-200'}`}><FaHome /></span>
                {!sidebarCollapsed && <span className="ml-4">Dashboard</span>}
              </div>
              {!sidebarCollapsed && (
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMenu('dashboard'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.dashboard ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.dashboard ? 
                    <FaChevronUp className="text-sm text-white" /> : 
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            {/* Dashboard Sub-menu (animated) */}
            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.dashboard ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'mood' 
                    ? 'text-white bg-white bg-opacity-30' 
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('mood')}>
                  <FaSmile className="text-sm mr-3" />
                  <span>Mood Check-in</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'trigger' 
                    ? 'text-white bg-white bg-opacity-30' 
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('trigger')}>
                  <FaBolt className="text-sm mr-3" />
                  <span>Trigger Log</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'activity' 
                    ? 'text-white bg-white bg-opacity-30' 
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('activity')}>
                  <FaDumbbell className="text-sm mr-3" />
                  <span>Activity Log</span>
                </a>
            </div>
          </div>

          {/* Communication Section with Expandable Menu */}
          <div className="mt-3">
            <button 
              onClick={() => { 
                if (!sidebarCollapsed && !expandedMenus.communication) {
                  toggleMenu('communication');
                }
              }}
              className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center px-2' : ''
              }`}
              style={{ backgroundColor: isCommunicationActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
              title={sidebarCollapsed ? "Communication" : ""}
            >
              <div className="flex items-center">
                <span className={`text-lg ${isCommunicationActive ? 'text-white' : 'text-blue-200'}`}><FaEnvelope /></span>
                {!sidebarCollapsed && <span className="ml-4">Communication</span>}
              </div>
              {!sidebarCollapsed && (
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMenu('communication'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.communication ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.communication ? 
                    <FaChevronUp className="text-sm text-white" /> : 
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            {/* Communication Sub-menu (animated) */}
            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.communication ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'appointments' 
                    ? 'text-white bg-white bg-opacity-30' 
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('appointments')}>
                  <FaCalendarAlt className="text-sm mr-3" />
                  <span>Appointments</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'messages' 
                    ? 'text-white bg-white bg-opacity-30' 
                    : 'text-blue-200 hover:text-white'
                }`} onClick={handleMessagesClick}>
                  <FaEnvelope className="text-sm mr-3" />
                  <span>Messages</span>
                </a>
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Professional Header */}
        <header className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 shadow-xl border-b border-blue-400 p-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">RR</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white leading-tight">Track your journey to wellness</h1>
                <p className="text-sm text-blue-100 font-medium">Your personal recovery companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full border border-white border-opacity-30">
                <div className="w-3 h-3 bg-sky-400 rounded-full animate-pulse shadow-sm"></div>
                <span className="text-sm text-white font-semibold">Online</span>
              </div>
              <button 
                onClick={handleProfileClick}
                className="w-11 h-11 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all shadow-md border border-white border-opacity-30"
                title="Profile Settings"
              >
                <span className="text-white text-lg">👤</span>
              </button>
              <button 
                onClick={handleLogout}
                className="w-11 h-11 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all shadow-md border border-white border-opacity-30"
                title="Logout"
              >
                <FaSignOutAlt className="text-white text-base" />
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {currentView === 'home' ? (
              <div className="max-w-7xl mx-auto space-y-6">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading your recovery dashboard...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className="text-red-400">⚠️</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                        <div className="mt-2 text-sm text-red-700">{error}</div>
                        <div className="mt-4">
                          <button
                            onClick={() => window.location.reload()}
                            className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-md text-sm font-medium"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Top Row - Analytics Cards */}
                    <div className="grid grid-cols-12 gap-6">
                      {/* Recovery Streak */}
                      <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-600">Recovery Streak</h3>
                          <span className="text-2xl">🔥</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-800 mb-2">{stats.streakDays}</div>
                        <p className="text-xs text-gray-500">consecutive low-craving days</p>
                      </div>

                      {/* Total Check-ins */}
                      <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-600">Total Check-ins</h3>
                          <span className="text-2xl">✓</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-800 mb-2">{stats.totalCheckIns}</div>
                        <p className="text-xs text-gray-500">mood logs recorded</p>
                      </div>

                      {/* Weekly Mood Trend */}
                      <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-600">Avg Mood Score</h3>
                          <span className="text-2xl">😊</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-800 mb-2">{stats.avgMood.toFixed(1)}<span className="text-xl text-gray-400">/4</span></div>
                        <p className="text-xs text-gray-500">this week's average</p>
                      </div>

                      {/* Triggers Identified */}
                      <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-600">Triggers Mapped</h3>
                          <span className="text-2xl">⚠️</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-800 mb-2">{stats.triggersIdentified}</div>
                        <p className="text-xs text-gray-500">awareness points logged</p>
                      </div>
                    </div>

                {/* Weekly Mood Trend Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">Weekly Mood Trend</h3>
                      <p className="text-sm text-gray-500">
                        Your mood is <span className="text-sky-600 font-semibold">better 6%</span> this week — great progress!
                      </p>
                    </div>
                    <button className="text-xs text-sky-600 font-semibold px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors">
                      This Week ▼
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    {['😞','🙂','😄','😔','😊','😐','🙂'].map((emoji, i) => (
                      <div key={i} className="flex flex-col items-center group">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-sm transition-all group-hover:shadow-md ${
                          i === 2 ? 'bg-sky-100 ring-2 ring-sky-400' : 
                          i === 4 ? 'bg-sky-100 ring-2 ring-sky-300' : 
                          'bg-gray-100 hover:bg-gray-200'
                        }`}>
                          {emoji}
                        </div>
                        <span className="text-xs text-gray-500 mt-2 font-medium">
                          {['Sun','Tue','Wed','Thu','Fri','Sat','Mon'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Row */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Daily Mood Trend Chart */}
                  <div className="col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Daily Mood Trend</h3>
                        <p className="text-sm text-gray-500">Track how your feelings change day by day.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">⋯</button>
                        <button className="text-xs px-3 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm transition-colors">Meditating</button>
                        <button className="text-xs px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Journal ⋯</button>
                      </div>
                    </div>

                    {/* Emoji Legend on Left + Chart */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col gap-4 py-4">
                        {[
                          {emoji: '😄', dot: 'bg-purple-400'},
                          {emoji: '😊', dot: 'bg-orange-400'},
                          {emoji: '🙂', dot: 'bg-sky-400'},
                          {emoji: '😐', dot: 'bg-red-400'},
                          {emoji: '😔', dot: 'bg-sky-400'},
                          {emoji: '😞', dot: 'bg-gray-400'}
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${item.dot}`}></div>
                            <span className="text-xl">{item.emoji}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chart Area */}
                      <div className="relative flex-1 h-80 bg-gradient-to-b from-gray-50 to-white rounded-xl p-6">
                        <div className="absolute inset-0 flex items-end justify-between px-6 pb-12 gap-0.5">
                          {[
                            {h: 50, c: 'bg-purple-300', e: '😄'},
                            {h: 55, c: 'bg-orange-300', e: '😊'},
                            {h: 65, c: 'bg-sky-300', e: '🙂'},
                            {h: 48, c: 'bg-orange-300', e: '😊'},
                            {h: 58, c: 'bg-sky-300', e: '😔'},
                            {h: 38, c: 'bg-red-400', e: '😐', tip: true},
                            {h: 62, c: 'bg-sky-300', e: '🙂'},
                            {h: 45, c: 'bg-orange-300', e: '😊'},
                            {h: 70, c: 'bg-gray-300', e: '😐'},
                            {h: 75, c: 'bg-gray-300', e: '😐'},
                            {h: 68, c: 'bg-gray-300', e: '😐'},
                            {h: 72, c: 'bg-gray-300', e: '😐'},
                            {h: 78, c: 'bg-gray-300', e: '😐'},
                            {h: 70, c: 'bg-gray-300', e: '😐'}
                          ].map((bar, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 relative">
                              <div 
                                className={`w-full rounded-t-lg transition-all ${bar.c} relative hover:opacity-90 cursor-pointer`}
                                style={{height: `${bar.h}%`}}
                              >
                                {bar.tip && (
                                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-2xl whitespace-nowrap z-20">
                                    <div className="font-bold">You logged: Worried</div>
                                    <div className="text-gray-400 text-2xs mt-0.5">What caused it?</div>
                                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-gray-400 mt-2 font-medium">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar - Suggestions */}
                  <div className="col-span-4 space-y-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-gray-800">Meditating</h4>
                        <button className="text-xs text-gray-500 hover:text-gray-700">Journal ⋯</button>
                      </div>
                      <div className="space-y-3">
                        {[
                          {title: 'Learning deep breath every...', bgColor: 'bg-orange-50'},
                          {title: 'Maintain focus session every 3 ho...', bgColor: 'bg-purple-50'},
                          {title: '3-minute grounding breathi...', bgColor: 'bg-blue-50'}
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:shadow-md transition-all group cursor-pointer border border-gray-100">
                            <div className={`w-14 h-14 ${item.bgColor} rounded-xl shadow-sm flex items-center justify-center overflow-hidden`}>
                              <div className="w-10 h-10 bg-white/60 rounded-lg flex items-center justify-center">
                                {i === 0 ? '☕' : i === 1 ? '🎯' : '🧘'}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800 leading-tight">{item.title}</div>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                              →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Need Help Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="text-sm font-semibold text-gray-800 mb-2">Need Help?</div>
                      <p className="text-xs text-gray-500 mb-4">We're here ready to help you if you're having problem</p>
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium shadow-md transition-all flex items-center justify-center gap-2">
                        <span className="text-lg">📞</span>
                        <span>Call Us</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Insight Banner */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">💡</div>
                    <div className="flex-1 pt-1">
                      <div className="text-sm font-bold text-gray-800 mb-1">Your Daily Insight</div>
                      <div className="text-sm text-gray-600 leading-relaxed">You've been worried 2 days in a row. It's okay — let's focus on one thing you can control.</div>
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
            ) : currentView === 'messages' ? (
              <Messages onBack={handleBackToDashboard} />
          ) : currentView === 'mood' ? (
            <MoodLoggingScreen onBack={handleBackToDashboard} />
          ) : currentView === 'trigger' ? (
            <TriggerLoggingScreen onBack={handleBackToDashboard} />
          ) : currentView === 'activity' ? (
            <ActivityLoggingScreen onBack={handleBackToDashboard} />
          ) : currentView === 'appointments' ? (
            <AppointmentsScreen onBack={handleBackToDashboard} />
          ) : (
            <div className="p-6">Unknown view</div>
          )}
        </section>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <FloatingChat 
          isOpen={activeDialog === 'chat'}
          onToggle={() => setActiveDialog(activeDialog === 'chat' ? null : 'chat')} 
        />
        <CrisisButton 
          isOpen={activeDialog === 'crisis'}
          onToggle={() => setActiveDialog(activeDialog === 'crisis' ? null : 'crisis')} 
        />
      </div>
    </div>
  );
}
