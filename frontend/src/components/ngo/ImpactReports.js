import React, { useState } from 'react';
import { FaFileAlt, FaDownload, FaCalendarAlt, FaChartBar, FaUsers, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ImpactReports = ({ view }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock data for reports
  const monthlyReports = [
    {
      id: 1,
      month: 'January 2024',
      patientsTreated: 156,
      successRate: 89,
      avgSessionDuration: 45,
      criticalIncidents: 3,
      supervisorUtilization: 92,
      keyAchievements: ['Reduced relapse rate by 15%', 'Improved patient engagement', 'New therapy protocols implemented']
    },
    {
      id: 2,
      month: 'December 2023',
      patientsTreated: 148,
      successRate: 87,
      avgSessionDuration: 42,
      criticalIncidents: 5,
      supervisorUtilization: 88,
      keyAchievements: ['Holiday support program launched', 'Digital intake system improved', 'Staff training completed']
    }
  ];

  const quarterlyReports = [
    {
      id: 1,
      quarter: 'Q4 2023',
      period: 'October - December 2023',
      totalPatients: 442,
      avgSuccessRate: 88,
      totalSessions: 2840,
      costPerPatient: 1250,
      roi: 340,
      trends: ['Increasing success rates', 'Higher patient retention', 'Improved resource utilization']
    },
    {
      id: 2,
      quarter: 'Q3 2023',
      period: 'July - September 2023',
      totalPatients: 418,
      avgSuccessRate: 85,
      totalSessions: 2650,
      costPerPatient: 1320,
      roi: 310,
      trends: ['Stable performance', 'New patient intake increased', 'Technology adoption improved']
    }
  ];

  if (view === 'monthly') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Monthly Impact Reports</h1>
            <p className="text-gray-600 mt-2">Detailed monthly performance and impact analysis</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="current">Current Month</option>
            <option value="last3">Last 3 Months</option>
            <option value="last6">Last 6 Months</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {monthlyReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{report.month}</h3>
                <button className="text-purple-600 hover:text-purple-800">
                  <FaDownload />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{report.patientsTreated}</div>
                    <div className="text-sm text-blue-700">Patients Treated</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{report.successRate}%</div>
                    <div className="text-sm text-green-700">Success Rate</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Session Duration</span>
                    <span className="font-medium">{report.avgSessionDuration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Critical Incidents</span>
                    <span className="font-medium">{report.criticalIncidents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supervisor Utilization</span>
                    <span className="font-medium">{report.supervisorUtilization}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Achievements</h4>
                  <ul className="space-y-1">
                    {report.keyAchievements.map((achievement, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Trends Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Trends</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartBar className="text-gray-400 text-4xl mx-auto mb-2" />
              <p className="text-gray-500">Monthly performance trends chart</p>
              <p className="text-sm text-gray-400">Interactive chart component would be implemented here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'quarterly') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quarterly Impact Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive quarterly performance summaries</p>
          </div>
        </div>

        <div className="space-y-6">
          {quarterlyReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{report.quarter}</h3>
                  <p className="text-gray-600">{report.period}</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <FaDownload />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{report.totalPatients}</div>
                  <div className="text-sm text-purple-700">Total Patients</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{report.avgSuccessRate}%</div>
                  <div className="text-sm text-green-700">Avg Success Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{report.totalSessions}</div>
                  <div className="text-sm text-blue-700">Total Sessions</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">${report.roi}%</div>
                  <div className="text-sm text-yellow-700">ROI</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Financial Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost per Patient</span>
                      <span className="font-medium">${report.costPerPatient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-medium">${report.totalPatients * report.costPerPatient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return on Investment</span>
                      <span className="font-medium text-green-600">{report.roi}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Trends</h4>
                  <ul className="space-y-2">
                    {report.trends.map((trend, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <FaChartBar className="text-purple-500 mr-2 flex-shrink-0" />
                        {trend}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quarterly Comparison Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quarterly Performance Comparison</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartBar className="text-gray-400 text-4xl mx-auto mb-2" />
              <p className="text-gray-500">Quarterly comparison chart</p>
              <p className="text-sm text-gray-400">Bar chart comparing quarterly metrics</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'export') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Export Reports</h1>
          <p className="text-gray-600 mt-2">Generate and download comprehensive impact reports</p>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Report Generation Options</h2>

          <div className="space-y-6">
            {/* Monthly Report Export */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FaFileAlt className="text-blue-600 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Monthly Impact Report</h3>
                    <p className="text-sm text-gray-600">Detailed monthly performance analysis</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <FaDownload />
                  <span>Export PDF</span>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Format:</span>
                  <span className="ml-2 font-medium">PDF</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-medium">~2.5 MB</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Generated:</span>
                  <span className="ml-2 font-medium">Today</span>
                </div>
                <div>
                  <span className="text-gray-600">Frequency:</span>
                  <span className="ml-2 font-medium">Monthly</span>
                </div>
              </div>
            </div>

            {/* Quarterly Report Export */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-purple-600 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Quarterly Impact Summary</h3>
                    <p className="text-sm text-gray-600">Comprehensive quarterly overview</p>
                  </div>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <FaDownload />
                  <span>Export PDF</span>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Format:</span>
                  <span className="ml-2 font-medium">PDF</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-medium">~4.2 MB</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Generated:</span>
                  <span className="ml-2 font-medium">Dec 31, 2023</span>
                </div>
                <div>
                  <span className="text-gray-600">Frequency:</span>
                  <span className="ml-2 font-medium">Quarterly</span>
                </div>
              </div>
            </div>

            {/* Data Export */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-green-600 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Raw Data Export</h3>
                    <p className="text-sm text-gray-600">Complete dataset for analysis</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <FaDownload />
                    <span>CSV</span>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <FaDownload />
                    <span>Excel</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Formats:</span>
                  <span className="ml-2 font-medium">CSV, Excel</span>
                </div>
                <div>
                  <span className="text-gray-600">Records:</span>
                  <span className="ml-2 font-medium">1,247</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Exported:</span>
                  <span className="ml-2 font-medium">Jan 10, 2024</span>
                </div>
                <div>
                  <span className="text-gray-600">Access:</span>
                  <span className="ml-2 font-medium">Admin Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export History */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Exports</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <FaFileAlt className="text-blue-600" />
                <div>
                  <span className="font-medium text-gray-800">Monthly Report - January 2024</span>
                  <p className="text-sm text-gray-600">PDF • 2.5 MB</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Jan 15, 2024</p>
                <button className="text-purple-600 hover:text-purple-800 text-sm">Download Again</button>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-purple-600" />
                <div>
                  <span className="font-medium text-gray-800">Q4 2023 Summary</span>
                  <p className="text-sm text-gray-600">PDF • 4.2 MB</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Jan 2, 2024</p>
                <button className="text-purple-600 hover:text-purple-800 text-sm">Download Again</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ImpactReports;