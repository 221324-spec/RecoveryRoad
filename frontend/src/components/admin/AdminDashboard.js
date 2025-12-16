import React, { useState } from 'react';
import { FaSignOutAlt, FaHome, FaMapMarkerAlt, FaBuilding, FaChartLine, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';
import '../supervisor/SupervisorDashboardNavigation.css';

// Import all admin components
import SystemDashboard from './SystemDashboard';
import CreateGeoFence from './CreateGeoFence';
import EditGeoFence from './EditGeoFence';
import ViewGeoFenceAlerts from './ViewGeoFenceAlerts';
import ViewNGOs from './ViewNGOs';
import EditNGO from './EditNGO';
import NGOReports from './NGOReports';
import NGOImpactComparison from './NGOImpactComparison';
import RehabCenterPerformance from './RehabCenterPerformance';
import ExportReports from './ExportReports';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard'); // Main view states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({ dashboard: true, geofence: false, ngo: false, analytics: false });

  // NGO Management state
  const [ngoView, setNgoView] = useState('list'); // 'list', 'edit', 'reports'
  const [selectedNGO, setSelectedNGO] = useState(null);

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
        geofence: false,
        ngo: false,
        analytics: false,
        [menu]: !isOpen
      };
    });
  };

  const isDashboardActive = currentView === 'dashboard';
  const isGeofenceActive = ['create', 'edit', 'view'].includes(currentView);
  const isNgoActive = ['ngo-list', 'ngo-edit', 'ngo-reports'].includes(currentView);
  const isAnalyticsActive = ['comparison', 'performance', 'export-all'].includes(currentView);

  const getHeaderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return {
          title: 'System Administration Dashboard',
          subtitle: 'Global system monitoring and management overview',
          icon: FaHome,
          status: 'System Online',
          profileTitle: 'Admin Portal',
          profileSubtitle: 'System Management'
        };
      case 'create':
      case 'edit':
      case 'view':
        return {
          title: 'Geo-Fence Management',
          subtitle: 'Manage high-risk zones and location-based alerts',
          icon: FaMapMarkerAlt,
          status: 'System Online',
          profileTitle: 'Geo-Fence Hub',
          profileSubtitle: 'Zone Management'
        };
      case 'ngo-list':
      case 'ngo-edit':
      case 'ngo-reports':
        return {
          title: 'NGO / Rehab Center Management',
          subtitle: 'Oversee organizations and their performance',
          icon: FaBuilding,
          status: 'System Online',
          profileTitle: 'Organization Hub',
          profileSubtitle: 'NGO Management'
        };
      case 'comparison':
      case 'performance':
      case 'export-all':
        return {
          title: 'Organization-Level Analytics',
          subtitle: 'Comprehensive analytics and performance insights',
          icon: FaChartLine,
          status: 'System Online',
          profileTitle: 'Analytics Center',
          profileSubtitle: 'Performance Analysis'
        };
      default:
        return {
          title: 'System Administration Portal',
          subtitle: 'Global system management and analytics',
          icon: FaHome,
          status: 'System Online',
          profileTitle: 'Admin Portal',
          profileSubtitle: 'System Management'
        };
    }
  };

  const headerContent = getHeaderContent();

  // NGO Management handlers
  const handleEditNGO = (ngo) => {
    setSelectedNGO(ngo);
    setNgoView('edit');
    setCurrentView('ngo-edit');
  };

  const handleViewNGOReports = (ngo) => {
    setSelectedNGO(ngo);
    setNgoView('reports');
    setCurrentView('ngo-reports');
  };

  const handleSaveNGO = (ngoData) => {
    console.log('Saving NGO:', ngoData);
    // Here you would save the NGO data
    alert('NGO saved successfully!');
    setCurrentView('ngo-list');
    setNgoView('list');
    setSelectedNGO(null);
  };

  const handleCancelNGOEdit = () => {
    setCurrentView('ngo-list');
    setNgoView('list');
    setSelectedNGO(null);
  };

  return (
    <div className="admin-dashboard min-h-screen h-screen flex bg-gray-50 overflow-hidden">
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
              <span className="text-blue-200 text-sm bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">ADMIN PORTAL</span>
            </>
          )}
        </div>

        <nav className="supervisor-sidebar-nav flex flex-col space-y-2">
          {/* System Dashboard */}
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
                {!sidebarCollapsed && <span className="ml-4">System Dashboard</span>}
              </div>
            </button>
          </div>

          {/* Geo-Fence Management */}
          <div>
            <button
              onClick={() => {
                if (!sidebarCollapsed && !expandedMenus.geofence) {
                  toggleMenu('geofence');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                isGeofenceActive
                  ? 'text-white bg-white bg-opacity-30 shadow-lg backdrop-blur-sm'
                  : 'text-blue-100 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={sidebarCollapsed ? "Geo-Fence" : ""}
            >
              <div className="flex items-center">
                <FaMapMarkerAlt className={`text-lg ${isGeofenceActive ? 'text-white' : 'text-blue-200'}`} />
                {!sidebarCollapsed && <span className="ml-4">Geo-Fence Management</span>}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMenu('geofence'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.geofence ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.geofence ?
                    <FaChevronUp className="text-sm text-white" /> :
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.geofence ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'create'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('create')}>
                  <span>Create High-Risk Zones</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'edit'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('edit')}>
                  <span>Edit/Delete Geo-Fence Zones</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'view'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('view')}>
                  <span>View All Geo-Fence Alerts</span>
                </a>
            </div>
          </div>

          {/* NGO / Rehab Center Management */}
          <div>
            <button
              onClick={() => {
                if (!sidebarCollapsed && !expandedMenus.ngo) {
                  toggleMenu('ngo');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                isNgoActive
                  ? 'text-white bg-white bg-opacity-30 shadow-lg backdrop-blur-sm'
                  : 'text-blue-100 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={sidebarCollapsed ? "NGO" : ""}
            >
              <div className="flex items-center">
                <FaBuilding className={`text-lg ${isNgoActive ? 'text-white' : 'text-blue-200'}`} />
                {!sidebarCollapsed && <span className="ml-4">NGO / Rehab Center Management</span>}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMenu('ngo'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.ngo ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.ngo ?
                    <FaChevronUp className="text-sm text-white" /> :
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.ngo ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'ngo-list'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('ngo-list')}>
                  <span>View NGOs</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'ngo-edit'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => {
                  setSelectedNGO(null);
                  setCurrentView('ngo-edit');
                }}>
                  <span>Add / Edit Organizations</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'ngo-reports'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('ngo-reports')}>
                  <span>View Organization Reports</span>
                </a>
            </div>
          </div>

          {/* Organization-Level Analytics */}
          <div>
            <button
              onClick={() => {
                if (!sidebarCollapsed && !expandedMenus.analytics) {
                  toggleMenu('analytics');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                isAnalyticsActive
                  ? 'text-white bg-white bg-opacity-30 shadow-lg backdrop-blur-sm'
                  : 'text-blue-100 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={sidebarCollapsed ? "Analytics" : ""}
            >
              <div className="flex items-center">
                <FaChartLine className={`text-lg ${isAnalyticsActive ? 'text-white' : 'text-blue-200'}`} />
                {!sidebarCollapsed && <span className="ml-4">Organization-Level Analytics</span>}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMenu('analytics'); }}
                  className={`p-1 transform transition-transform duration-200 ${expandedMenus.analytics ? 'rotate-180' : ''}`}
                >
                  {expandedMenus.analytics ?
                    <FaChevronUp className="text-sm text-white" /> :
                    <FaChevronDown className="text-sm text-blue-200" />
                  }
                </button>
              )}
            </button>

            <div className={`ml-6 mt-2 space-y-1 border-l-2 border-blue-400 border-opacity-30 pl-4 overflow-hidden transition-all duration-300 ${
                !sidebarCollapsed && expandedMenus.analytics ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'comparison'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('comparison')}>
                  <span>NGO Impact Comparison</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'performance'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('performance')}>
                  <span>Rehab Center Performance</span>
                </a>
                <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'export-all'
                    ? 'text-white bg-white bg-opacity-30'
                    : 'text-blue-200 hover:text-white'
                }`} onClick={() => setCurrentView('export-all')}>
                  <span>Export All Reports</span>
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
                <span className="text-white font-bold text-sm">ADM</span>
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
          {currentView === 'dashboard' && <SystemDashboard />}
          {currentView === 'create' && <CreateGeoFence />}
          {currentView === 'edit' && <EditGeoFence />}
          {currentView === 'view' && <ViewGeoFenceAlerts />}
          {currentView === 'ngo-list' && <ViewNGOs onEdit={handleEditNGO} onViewReports={handleViewNGOReports} />}
          {currentView === 'ngo-edit' && <EditNGO ngo={selectedNGO} onSave={handleSaveNGO} onCancel={handleCancelNGOEdit} />}
          {currentView === 'ngo-reports' && selectedNGO && <NGOReports ngo={selectedNGO} />}
          {currentView === 'comparison' && <NGOImpactComparison />}
          {currentView === 'performance' && <RehabCenterPerformance />}
          {currentView === 'export-all' && <ExportReports />}
        </section>
      </main>
    </div>
  );
}