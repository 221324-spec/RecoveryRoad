import React from 'react';
import { FaUsers, FaUserMd, FaExclamationTriangle, FaChartLine, FaDownload, FaFilePdf, FaFileExcel } from 'react-icons/fa';

const NGOReports = ({ ngo }) => {
  const kpiData = [
    { label: 'Total Patients', value: ngo.patients, icon: FaUsers, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Total Supervisors', value: ngo.supervisors, icon: FaUserMd, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Alerts This Month', value: 23, icon: FaExclamationTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { label: 'Patient Improvements %', value: '78%', icon: FaChartLine, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const supervisorData = [
    { name: 'Dr. Sarah Johnson', patients: 18, alerts: 3, efficiency: 92 },
    { name: 'Dr. Michael Chen', patients: 15, alerts: 5, efficiency: 88 },
    { name: 'Dr. Emily Rodriguez', patients: 22, alerts: 2, efficiency: 95 },
    { name: 'Dr. David Park', patients: 12, alerts: 7, efficiency: 85 }
  ];

  const patientData = [
    { name: 'John Doe', supervisor: 'Dr. Sarah Johnson', status: 'Improving', lastCheckin: '2 hours ago' },
    { name: 'Jane Smith', supervisor: 'Dr. Michael Chen', status: 'Stable', lastCheckin: '4 hours ago' },
    { name: 'Mike Johnson', supervisor: 'Dr. Emily Rodriguez', status: 'Critical', lastCheckin: '1 hour ago' },
    { name: 'Sarah Wilson', supervisor: 'Dr. David Park', status: 'Improving', lastCheckin: '6 hours ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Improving': return 'bg-green-100 text-green-800';
      case 'Stable': return 'bg-blue-100 text-blue-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{ngo.name} - Reports</h2>
        <p className="text-gray-600 mt-2">Comprehensive analytics and performance metrics</p>
      </div>

      {/* KPI Row */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Progress Improvement</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FaChartLine className="text-4xl mx-auto mb-4" />
              <p>Line chart showing improvement trends</p>
              <p className="text-sm">Patient recovery progress over time</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FaExclamationTriangle className="text-4xl mx-auto mb-4" />
              <p>Bar chart showing alert frequency</p>
              <p className="text-sm">Monthly alert statistics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end space-x-4 mb-8">
        <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
          <FaFilePdf />
          <span>Export PDF</span>
        </button>
        <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
          <FaFileExcel />
          <span>Export Excel</span>
        </button>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supervisor Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Supervisor Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alerts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {supervisorData.map((supervisor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{supervisor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{supervisor.patients}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{supervisor.alerts}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{supervisor.efficiency}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Status Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Patient Status</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check-in</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {patientData.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.supervisor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.lastCheckin}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOReports;