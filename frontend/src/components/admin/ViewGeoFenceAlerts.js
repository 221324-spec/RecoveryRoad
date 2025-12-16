import React, { useState } from 'react';
import { FaMapMarkerAlt, FaUser, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const ViewGeoFenceAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      patient: 'John Doe',
      zone: 'Downtown Risk Area',
      alertType: 'Enter',
      severity: 'Critical',
      time: '2025-01-15 14:30:00',
      coordinates: '40.7128,-74.0060',
      notifiedSupervisor: true,
      supervisor: 'Dr. Smith',
      riskScore: 85
    },
    {
      id: 2,
      patient: 'Jane Smith',
      zone: 'Suburb Watch Area',
      alertType: 'Exit',
      severity: 'High',
      time: '2025-01-15 13:45:00',
      coordinates: '40.7589,-73.9851',
      notifiedSupervisor: true,
      supervisor: 'Dr. Johnson',
      riskScore: 72
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      zone: 'Industrial Zone',
      alertType: 'Enter',
      severity: 'Moderate',
      time: '2025-01-15 12:15:00',
      coordinates: '40.7505,-73.9934',
      notifiedSupervisor: false,
      supervisor: null,
      riskScore: 45
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      zone: 'Downtown Risk Area',
      alertType: 'Enter',
      severity: 'Critical',
      time: '2025-01-15 11:20:00',
      coordinates: '40.7128,-74.0060',
      notifiedSupervisor: true,
      supervisor: 'Dr. Brown',
      riskScore: 91
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getAlertTypeColor = (type) => {
    return type === 'Enter' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Geo-Fence Alerts</h2>
        <p className="text-gray-600 mt-2">Monitor all geo-fence zone alerts and patient movements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Recent Alerts</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {alerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{alert.patient}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{alert.zone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAlertTypeColor(alert.alertType)}`}>
                          {alert.alertType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(alert.time).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-500 font-mono">{alert.coordinates}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {alert.notifiedSupervisor ? (
                            <span className="text-green-600">✓ {alert.supervisor}</span>
                          ) : (
                            <span className="text-red-600">✗ Not notified</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Alert Details Panel */}
        <div className="lg:col-span-1">
          {selectedAlert ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Alert Details</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaUser className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{selectedAlert.patient}</div>
                    <div className="text-xs text-gray-500">Patient</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{selectedAlert.zone}</div>
                    <div className="text-xs text-gray-500">Zone</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{selectedAlert.alertType} Zone</div>
                    <div className="text-xs text-gray-500">Alert Type</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaClock className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{new Date(selectedAlert.time).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Time</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Risk Score</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedAlert.riskScore > 80 ? 'bg-red-100 text-red-800' :
                      selectedAlert.riskScore > 60 ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedAlert.riskScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        selectedAlert.riskScore > 80 ? 'bg-red-500' :
                        selectedAlert.riskScore > 60 ? 'bg-orange-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${selectedAlert.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                {selectedAlert.supervisor && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <strong>Supervisor:</strong> {selectedAlert.supervisor}
                    </div>
                  </div>
                )}
              </div>

              {/* Map Preview */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaMapMarkerAlt className="text-2xl mx-auto mb-1" />
                    <p className="text-xs">Alert location</p>
                    <p className="text-xs font-mono">{selectedAlert.coordinates}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <FaExclamationTriangle className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select an alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewGeoFenceAlerts;