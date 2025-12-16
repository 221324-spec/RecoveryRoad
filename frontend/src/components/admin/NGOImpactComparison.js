import React, { useState } from 'react';
import { FaChartLine, FaFilter, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

const NGOImpactComparison = () => {
  const [timePeriod, setTimePeriod] = useState('6months');
  const [selectedNGOs, setSelectedNGOs] = useState(['Hope Recovery Center', 'New Beginnings Rehab']);
  const [metric, setMetric] = useState('improvement');

  const ngos = [
    'Hope Recovery Center',
    'New Beginnings Rehab',
    'Pathway to Wellness',
    'Sunrise Recovery Institute'
  ];

  const metrics = [
    { value: 'improvement', label: 'Improvement Rate' },
    { value: 'alerts', label: 'Alert Reduction Rate' },
    { value: 'efficiency', label: 'Supervisor Efficiency' }
  ];

  const timePeriods = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const handleNGOSelection = (ngo) => {
    setSelectedNGOs(prev =>
      prev.includes(ngo)
        ? prev.filter(n => n !== ngo)
        : [...prev, ngo]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">NGO Impact Comparison</h2>
        <p className="text-gray-600 mt-2">Compare performance metrics across different organizations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <FaFilter className="text-gray-400" />
          <span className="text-lg font-semibold text-gray-800">Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Time Period
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timePeriods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>

          {/* Metric Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaChartLine className="mr-2" />
              Metric
            </label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {metrics.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* NGO Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaBuilding className="mr-2" />
              Organizations ({selectedNGOs.length} selected)
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
              {ngos.map(ngo => (
                <label key={ngo} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedNGOs.includes(ngo)}
                    onChange={() => handleNGOSelection(ngo)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{ngo}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Multi-line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h3>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FaChartLine className="text-6xl mx-auto mb-4" />
              <p className="text-lg">Multi-line Chart</p>
              <p className="text-sm">Showing {metrics.find(m => m.value === metric)?.label} trends</p>
              <p className="text-xs mt-2">Selected NGOs: {selectedNGOs.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Multi-bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Performance</h3>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <FaChartLine className="text-2xl" />
              </div>
              <p className="text-lg">Bar Chart</p>
              <p className="text-sm">Monthly performance comparison</p>
              <p className="text-xs mt-2">Time period: {timePeriods.find(p => p.value === timePeriod)?.label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Reduction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {selectedNGOs.map((ngo, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ngo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{Math.floor(Math.random() * 30) + 70}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{Math.floor(Math.random() * 40) + 60}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{Math.floor(Math.random() * 20) + 80}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{Math.floor(Math.random() * 20) + 75}%</div>
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

export default NGOImpactComparison;