import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaExclamationTriangle, FaBullseye, FaComments, FaChevronLeft, FaChevronRight, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import PatientOverviewPanel from './PatientOverviewPanel';
import DailyLogsViewer from './DailyLogsViewer';
import SmartAlerts from './SmartAlerts';
import RelapseTracker from './RelapseTracker';
import CommunicationHub from './CommunicationHub';
import './SupervisorDashboardNavigation.css';

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigation = (view, context = {}) => {
    setCurrentView(view);
    if (context.selectedPatient) {
      setSelectedPatient(context.selectedPatient);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getHeaderContent = () => {
    switch (currentView) {
      case 'overview':
        return {
          title: 'Patient Overview Dashboard',
          subtitle: 'Monitor and support patient recovery journeys',
          icon: FaUsers,
          status: 'Live Monitoring Active',
          profileTitle: 'Patient Management',
          profileSubtitle: 'Overview & Support'
        };
      case 'logs':
        return {
          title: selectedPatient ? `${selectedPatient.name} - Daily Progress` : 'Daily Logs Viewer',
          subtitle: 'Monitor daily check-ins and recovery analytics',
          icon: FaClipboardList,
          status: 'Live Monitoring Active',
          profileTitle: selectedPatient?.name || 'Select Patient',
          profileSubtitle: 'Daily Progress'
        };
      case 'alerts':
        return {
          title: 'Smart Alerts & Risk Detection',
          subtitle: 'AI-powered monitoring and intelligent risk assessment system',
          icon: FaExclamationTriangle,
          status: 'Live Monitoring Active',
          profileTitle: 'Alert System',
          profileSubtitle: 'AI-Powered Detection'
        };
      case 'relapse':
        return {
          title: 'Relapse Prevention Hub',
          subtitle: 'Monitor recovery milestones and manage relapse incidents',
          icon: FaBullseye,
          status: 'Live Monitoring Active',
          profileTitle: 'Prevention Hub',
          profileSubtitle: 'Risk Management'
        };
      case 'communication':
        return {
          title: 'Communication Hub',
          subtitle: 'Secure patient messaging and real-time communication platform',
          icon: FaComments,
          status: 'Live Messaging Active',
          profileTitle: 'Communication Center',
          profileSubtitle: 'HIPAA Compliant'
        };
      default:
        return {
          title: 'RecoveryRoad Supervisor Portal',
          subtitle: 'Comprehensive patient recovery management',
          icon: FaUsers,
          status: 'Live Monitoring Active',
          profileTitle: 'Supervisor Portal',
          profileSubtitle: 'Recovery Management'
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className={`bg-gradient-to-b from-blue-600 to-blue-700 shadow-xl border-r border-blue-500 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-72'}`}>
        {/* Toggle Button in Sidebar */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <FaChevronRight className="text-white" /> : <FaChevronLeft className="text-white" />}
          </button>
        </div>

        <div className={`mb-10 flex flex-col items-center ${sidebarCollapsed ? 'mb-6' : ''}`}>
          <div className={`bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg ${sidebarCollapsed ? 'w-10 h-10' : 'w-16 h-16'}`}>
            <span className={`text-white font-bold ${sidebarCollapsed ? 'text-lg' : 'text-2xl'}`}>RH</span>
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="text-2xl font-bold text-white mb-2">RecoveryRoad</div>
              <span className="text-blue-200 text-sm bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">SUPERVISOR PORTAL</span>
            </>
          )}
        </div>
        <nav className="supervisor-sidebar-nav flex flex-col space-y-3 px-6">
          <button 
            onClick={() => setCurrentView('overview')}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
              currentView === 'overview' ? 'active' : ''
            } !important ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            style={{ backgroundColor: currentView === 'overview' ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
            title={sidebarCollapsed ? "Patient Overview" : ""}
          >
            <span className={`text-lg ${currentView === 'overview' ? 'text-white' : 'text-blue-200'}`}><FaUsers /></span>
            {!sidebarCollapsed && <span className="ml-4">Patient Overview</span>}
          </button>
          <button 
            onClick={() => setCurrentView('logs')}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
              currentView === 'logs' ? 'active' : ''
            } !important ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            style={{ backgroundColor: currentView === 'logs' ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
            title={sidebarCollapsed ? "Daily Logs" : ""}
          >
            <span className={`text-lg ${currentView === 'logs' ? 'text-white' : 'text-blue-200'}`}><FaClipboardList /></span>
            {!sidebarCollapsed && <span className="ml-4">Daily Logs</span>}
          </button>
          <button 
            onClick={() => setCurrentView('alerts')}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
              currentView === 'alerts' ? 'active' : ''
            } !important ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            style={{ backgroundColor: currentView === 'alerts' ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
            title={sidebarCollapsed ? "Smart Alerts" : ""}
          >
            <span className={`text-lg ${currentView === 'alerts' ? 'text-white' : 'text-blue-200'}`}><FaExclamationTriangle /></span>
            {!sidebarCollapsed && <span className="ml-4">Smart Alerts</span>}
          </button>
          <button 
            onClick={() => setCurrentView('relapse')}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
              currentView === 'relapse' ? 'active' : ''
            } !important ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            style={{ backgroundColor: currentView === 'relapse' ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
            title={sidebarCollapsed ? "Relapse Prevention" : ""}
          >
            <span className={`text-lg ${currentView === 'relapse' ? 'text-white' : 'text-blue-200'}`}><FaBullseye /></span>
            {!sidebarCollapsed && <span className="ml-4">Relapse Prevention</span>}
          </button>
          <button 
            onClick={() => setCurrentView('communication')}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
              currentView === 'communication' ? 'active' : ''
            } !important ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            style={{ backgroundColor: currentView === 'communication' ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
            title={sidebarCollapsed ? "Communication" : ""}
          >
            <span className={`text-lg ${currentView === 'communication' ? 'text-white' : 'text-blue-200'}`}><FaComments /></span>
            {!sidebarCollapsed && <span className="ml-4">Communication</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Professional Header */}
        <header className="w-full bg-gradient-to-r from-white to-blue-50 shadow-lg border-b border-blue-100 p-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <headerContent.icon className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 leading-tight">{headerContent.title}</h1>
                <p className="text-sm text-gray-500 font-medium">{headerContent.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-sky-50 px-4 py-2 rounded-full border border-sky-200">
              <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse shadow-sm"></div>
              <span className="text-sm text-sky-700 font-semibold">{headerContent.status}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <FaUser className="text-blue-600 text-lg" />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">{headerContent.profileTitle}</p>
                <p className="text-xs text-gray-500">{headerContent.profileSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">SJ</span>
              </div>
              <button
                title="Logout"
                onClick={() => { try { logout(); } catch (e) { localStorage.removeItem('token'); localStorage.removeItem('role'); } navigate('/login'); }}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-blue-50 transition-colors"
              >
                <FaSignOutAlt className="text-blue-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 p-6 overflow-auto">
          {currentView === 'overview' && <PatientOverviewPanel onNavigate={handleNavigation} />}
          {currentView === 'logs' && (
            <DailyLogsViewer
              selectedPatient={selectedPatient}
              onSelectPatient={(patient) => {
                setSelectedPatient(patient);
                setCurrentView('logs');
              }}
            />
          )}
          {currentView === 'alerts' && <SmartAlerts />}
          {currentView === 'relapse' && <RelapseTracker />}
          {currentView === 'communication' && <CommunicationHub />}
        </section>
      </main>
    </div>
  );
}