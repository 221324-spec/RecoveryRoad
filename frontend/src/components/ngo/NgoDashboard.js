import React, { useState } from 'react';
import { FaSignOutAlt, FaHome, FaUsers, FaUserMd, FaExclamationTriangle, FaChartBar, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaUserPlus, FaUserCheck, FaUserCog, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './NgoDashboard.css';
import '../supervisor/SupervisorDashboardNavigation.css';

// Import NGO components
import OrganizationDashboard from './OrganizationDashboard';
import SupervisorManagement from './SupervisorManagement';
import PatientManagement from './PatientManagement';
import ImpactReports from './ImpactReports';

export default function NgoDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'supervisors', 'patients', 'reports'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({ dashboard: true, supervisors: false, patients: false, reports: false });

  // Sub-view states
  const [supervisorView, setSupervisorView] = useState('list'); // 'list', 'assign', 'add'
  const [patientView, setPatientView] = useState('list'); // 'list', 'progress', 'risks'
  const [reportsView, setReportsView] = useState('monthly'); // 'monthly', 'quarterly', 'export'

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => {
      const isOpen = !!prev[menu];
      return {
        dashboard: false,
        supervisors: false,
        patients: false,
        reports: false,
        [menu]: !isOpen
      };
    });
  };

  const isDashboardActive = currentView === 'dashboard';
  const isSupervisorsActive = ['supervisors', 'assign', 'add'].includes(currentView);
  const isPatientsActive = ['patients', 'progress', 'risks'].includes(currentView);
  const isReportsActive = ['reports', 'monthly', 'quarterly', 'export'].includes(currentView);

  const getHeaderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return {
          title: 'Organization Dashboard',
          subtitle: 'Monitor overall NGO performance and key metrics',
          icon: FaHome,
          status: 'Live Monitoring Active',
          profileTitle: 'NGO Portal',
          profileSubtitle: 'Organization Management'
        };
      case 'supervisors':
      case 'assign':
      case 'add':
        return {
          title: 'Supervisor Management',
          subtitle: 'Manage supervisor assignments and oversight',
          icon: FaUserMd,
          status: 'Live Monitoring Active',
          profileTitle: 'Supervisor Hub',
          profileSubtitle: 'Team Management'
        };
      case 'patients':
      case 'progress':
      case 'risks':
        return {
          title: 'Patient Management',
          subtitle: 'Monitor patient recovery and risk assessment',
          icon: FaUsers,
          status: 'Live Monitoring Active',
          profileTitle: 'Patient Care',
          profileSubtitle: 'Recovery Support'
        };
      case 'monthly':
      case 'quarterly':
      case 'export':
        return {
          title: 'Impact Reports & Analytics',
          subtitle: 'Comprehensive reporting and performance analysis',
          icon: FaChartBar,
          status: 'Live Monitoring Active',
          profileTitle: 'Analytics Center',
          profileSubtitle: 'Impact Assessment'
        };
      default:
        return {
          title: 'NGO Organization Portal',
          subtitle: 'Comprehensive NGO management and analytics',
          icon: FaHome,
          status: 'Live Monitoring Active',
          profileTitle: 'NGO Portal',
          profileSubtitle: 'Organization Management'
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <div className="ngo-dashboard min-h-screen h-screen flex bg-gray-50 overflow-hidden">
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
              <span className="text-blue-200 text-sm bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">NGO PORTAL</span>
            </>
          )}
        </div>

        <nav className="supervisor-sidebar-nav flex flex-col space-y-2">
          {/* Organization Dashboard */}
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center px-2' : ''
              }`}
              style={{ backgroundColor: isDashboardActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
              title={sidebarCollapsed ? "Dashboard" : ""}
            >
              <div className="flex items-center">
                <span className={`text-lg ${isDashboardActive ? 'text-white' : 'text-blue-200'}`}><FaHome /></span>
                {!sidebarCollapsed && <span className="ml-4">Organization Dashboard</span>}
              </div>
            </button>
          </div>

          {/* Supervisor Management */}
          <div>
            <button
              onClick={() => {
                if (!sidebarCollapsed && !expandedMenus.supervisors) {
                  toggleMenu('supervisors');
                }
              }}
              className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center px-2' : ''
              }`}
              style={{ backgroundColor: isSupervisorsActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
              title={sidebarCollapsed ? "Supervisors" : ""}
            >
              <div className="flex items-center">
                <span className={`text-lg ${isSupervisorsActive ? 'text-white' : 'text-blue-200'}`}><FaUserMd /></span>
                {!sidebarCollapsed && <span className="ml-4">Supervisor Management</span>}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMenu('supervisors'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.supervisors ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.supervisors ?
                    <FaChevronUp className="text-sm text-white" /> :
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.supervisors ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'supervisors'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('supervisors')}>
                  <span>View Supervisors</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'assign'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('assign')}>
                  <span>Assign/Unassign Supervisors</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'add'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('add')}>
                  <span>Add New Supervisor</span>
                </a>
            </div>
          </div>

          {/* Patient Management */}
          <div>
            <button
              onClick={() => {
                if (!sidebarCollapsed && !expandedMenus.patients) {
                  toggleMenu('patients');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                isPatientsActive
                  ? 'text-white shadow-lg backdrop-blur-sm'
                  : 'text-blue-100 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              style={{ backgroundColor: isPatientsActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
              title={sidebarCollapsed ? "Patients" : ""}
            >
              <div className="flex items-center">
                <FaUsers className={`text-lg ${isPatientsActive ? 'text-white' : 'text-blue-200'}`} />
                {!sidebarCollapsed && <span className="ml-4">Patient Management</span>}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMenu('patients'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.patients ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.patients ?
                    <FaChevronUp className="text-sm text-white" /> :
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.patients ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'patients'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('patients')}>
                  <span>Patient List</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'progress'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('progress')}>
                  <span>Progress Overview</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'risks'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('risks')}>
                  <span>Risk Levels</span>
                </a>
            </div>
          </div>

          {/* Impact Reports & Analytics */}
          <div>
            <button
              onClick={() => {
                if (!sidebarCollapsed && !expandedMenus.reports) {
                  toggleMenu('reports');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                isReportsActive
                  ? 'text-white shadow-lg backdrop-blur-sm'
                  : 'text-blue-100 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              style={{ backgroundColor: isReportsActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
              title={sidebarCollapsed ? "Reports" : ""}
            >
              <div className="flex items-center">
                <FaChartBar className={`text-lg ${isReportsActive ? 'text-white' : 'text-blue-200'}`} />
                {!sidebarCollapsed && <span className="ml-4">Impact Reports & Analytics</span>}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMenu('reports'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.reports ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.reports ?
                    <FaChevronUp className="text-sm text-white" /> :
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.reports ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'monthly'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('monthly')}>
                  <span>Monthly Reports</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'quarterly'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('quarterly')}>
                  <span>Quarterly Reports</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'export'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('export')}>
                  <span>Export Reports</span>
                </a>
            </div>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
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
                <span className="text-white font-bold text-sm">NGO</span>
              </div>
              <button
                title="Logout"
                onClick={handleLogout}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-blue-50 transition-colors"
              >
                <FaSignOutAlt className="text-blue-600" />
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {currentView === 'dashboard' && <OrganizationDashboard />}
          {currentView === 'supervisors' && <SupervisorManagement view="list" />}
          {currentView === 'assign' && <SupervisorManagement view="assign" />}
          {currentView === 'add' && <SupervisorManagement view="add" />}
          {currentView === 'patients' && <PatientManagement view="list" />}
          {currentView === 'progress' && <PatientManagement view="progress" />}
          {currentView === 'risks' && <PatientManagement view="risks" />}
          {currentView === 'monthly' && <ImpactReports view="monthly" />}
          {currentView === 'quarterly' && <ImpactReports view="quarterly" />}
          {currentView === 'export' && <ImpactReports view="export" />}
        </section>
      </main>
    </div>
  );
}