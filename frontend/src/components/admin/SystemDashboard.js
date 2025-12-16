import React from 'react';
import { FaBuilding, FaUsers, FaUserCircle, FaExclamationTriangle } from 'react-icons/fa';

const KPICard = ({ title, value, icon: Icon, color, onClick }) => (
  <div
    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer ${onClick ? 'hover:scale-105' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="text-white text-xl" />
      </div>
    </div>
  </div>
);

const SystemDashboard = () => {
  const kpiData = [
    {
      title: 'Total NGOs',
      value: '24',
      icon: FaBuilding,
      color: 'bg-blue-500',
      onClick: () => console.log('Navigate to NGOs')
    },
    {
      title: 'Total Supervisors',
      value: '156',
      icon: FaUsers,
      color: 'bg-green-500',
      onClick: () => console.log('Navigate to Supervisors')
    },
    {
      title: 'Total Patients',
      value: '2,847',
      icon: FaUserCircle,
      color: 'bg-purple-500',
      onClick: () => console.log('Navigate to Patients')
    },
    {
      title: 'Risk Alerts Today',
      value: '12',
      icon: FaExclamationTriangle,
      color: 'bg-red-500',
      onClick: () => console.log('Navigate to Alerts')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">System Dashboard</h2>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts Per Day</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-blue-500 text-2xl" />
              </div>
              <p>Chart will be implemented</p>
              <p className="text-sm">Line chart showing daily alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Logs Per Day</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-green-500 text-2xl" />
              </div>
              <p>Chart will be implemented</p>
              <p className="text-sm">Bar chart showing daily mood logs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Alerts Stream */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Global Alerts Stream</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { patient: 'John Doe', event: 'Entered Zone', zone: 'Downtown Risk Area', time: '5 min ago', severity: 'Critical' },
                { patient: 'Jane Smith', event: 'Exited Zone', zone: 'Suburb Watch Area', time: '12 min ago', severity: 'High' },
                { patient: 'Mike Johnson', event: 'Entered Zone', zone: 'Industrial Zone', time: '18 min ago', severity: 'Moderate' },
                { patient: 'Sarah Wilson', event: 'Entered Zone', zone: 'Downtown Risk Area', time: '25 min ago', severity: 'Critical' },
                { patient: 'Tom Brown', event: 'Exited Zone', zone: 'Residential Area', time: '32 min ago', severity: 'Info' }
              ].map((alert, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 hover:text-blue-600">{alert.patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{alert.event}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{alert.zone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{alert.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      alert.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemDashboard;