import React, { useState } from 'react';
import { FaUsers, FaUserMd, FaExclamationTriangle, FaChartLine, FaPlus, FaEye, FaDownload, FaFilter } from 'react-icons/fa';

const OrganizationDashboard = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');

  const kpiData = [
    { title: 'Total Supervisors', value: '12', icon: FaUserMd, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { title: 'Total Patients', value: '156', icon: FaUsers, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Active Alerts', value: '3', icon: FaExclamationTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { title: 'Success Rate', value: '89%', icon: FaChartLine, color: 'text-green-600', bgColor: 'bg-green-100' }
  ];

  const quickActions = [
    { title: 'Add Supervisor', icon: FaPlus, action: () => console.log('Add supervisor') },
    { title: 'View Reports', icon: FaEye, action: () => console.log('View reports') },
    { title: 'Export Data', icon: FaDownload, action: () => console.log('Export data') }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Organization Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your rehab center's performance and manage operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                <kpi.icon className={`text-xl ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Summary</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Patient Check-ins Today</span>
              <span className="font-semibold text-gray-800">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Supervisor Sessions</span>
              <span className="font-semibold text-gray-800">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Crisis Interventions</span>
              <span className="font-semibold text-gray-800">2</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Activities</span>
              <span className="font-semibold text-gray-800">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Positive Feedback</span>
              <span className="font-semibold text-gray-800">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Session Duration</span>
              <span className="font-semibold text-gray-800">45 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center justify-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200"
            >
              <action.icon className="text-purple-600" />
              <span className="font-medium text-purple-700">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">New patient registered</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Supervisor assigned to patient</span>
            </div>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Monthly report generated</span>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;