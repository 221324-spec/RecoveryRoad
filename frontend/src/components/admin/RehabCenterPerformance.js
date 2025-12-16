import React from 'react';
import { FaTrophy, FaChartLine, FaUsers, FaExclamationTriangle, FaStar } from 'react-icons/fa';

const RehabCenterPerformance = () => {
  const kpiData = [
    { label: 'Avg Patient Improvement', value: '76%', icon: FaChartLine, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Total Active Patients', value: '1,247', icon: FaUsers, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Crisis Alerts Resolved', value: '89%', icon: FaExclamationTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { label: 'Supervisor Engagement', value: '92%', icon: FaStar, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const supervisorRankings = [
    { name: 'Dr. Sarah Johnson', patients: 28, improvement: 82, alertsResolved: 95, engagement: 96, score: 91 },
    { name: 'Dr. Emily Rodriguez', patients: 32, improvement: 79, alertsResolved: 92, engagement: 94, score: 89 },
    { name: 'Dr. Michael Chen', patients: 25, improvement: 85, alertsResolved: 88, engagement: 98, score: 88 },
    { name: 'Dr. David Park', patients: 22, improvement: 78, alertsResolved: 90, engagement: 92, score: 85 },
    { name: 'Dr. Lisa Wong', patients: 30, improvement: 81, alertsResolved: 87, engagement: 95, score: 84 }
  ];

  const performanceMetrics = [
    { metric: 'Patient Improvement Rate', value: 76, target: 80, status: 'near-target' },
    { metric: 'Alert Response Time', value: 12, target: 15, status: 'good', unit: 'minutes' },
    { metric: 'Supervisor Utilization', value: 87, target: 85, status: 'exceeded', unit: '%' },
    { metric: 'Patient Satisfaction', value: 4.2, target: 4.0, status: 'exceeded', unit: '/5' },
    { metric: 'Relapse Prevention', value: 68, target: 70, status: 'near-target', unit: '%' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeded': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'near-target': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Rehab Center Performance</h2>
        <p className="text-gray-600 mt-2">Comprehensive performance analytics and supervisor rankings</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <kpi.icon className={`text-xl ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Spider/Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <FaChartLine className="text-3xl" />
              </div>
              <p className="text-lg">Radar Chart</p>
              <p className="text-sm">Multi-dimensional performance metrics</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{metric.metric}</div>
                  <div className="text-xs text-gray-500">
                    Target: {metric.target}{metric.unit || ''}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {metric.value}{metric.unit || ''}
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                    {metric.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supervisor Rankings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Supervisor Performance Rankings</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaTrophy className="text-yellow-500" />
            <span>Ranked by Overall Score</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alerts Resolved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {supervisorRankings.map((supervisor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 && <FaTrophy className="text-yellow-500 mr-2" />}
                      <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{supervisor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{supervisor.patients}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supervisor.improvement}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supervisor.alertsResolved}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supervisor.engagement}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${getScoreColor(supervisor.score)}`}>
                      {supervisor.score}%
                    </div>
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

export default RehabCenterPerformance;