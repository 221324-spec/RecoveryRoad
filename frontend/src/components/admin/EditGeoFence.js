import React, { useState } from 'react';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaEye } from 'react-icons/fa';

const EditGeoFence = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const zones = [
    {
      id: 1,
      name: 'Downtown Risk Area',
      severity: 'Critical',
      createdBy: 'Admin User',
      createdOn: '2025-01-15',
      coordinates: '40.7128,-74.0060'
    },
    {
      id: 2,
      name: 'Suburb Watch Area',
      severity: 'High',
      createdBy: 'Supervisor Jane',
      createdOn: '2025-01-10',
      coordinates: '40.7589,-73.9851'
    },
    {
      id: 3,
      name: 'Industrial Zone',
      severity: 'Medium',
      createdBy: 'Admin User',
      createdOn: '2025-01-08',
      coordinates: '40.7505,-73.9934'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (zone) => {
    setSelectedZone(zone);
    setEditMode(true);
  };

  const handleDelete = (zoneId) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      console.log('Deleting zone:', zoneId);
      // Delete logic here
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit/Delete Geo-Fence Zones</h2>
        <p className="text-gray-600 mt-2">Manage existing high-risk zones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zones Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">All Zones</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {zones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(zone.severity)}`}>
                          {zone.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{zone.createdBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{zone.createdOn}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedZone(zone)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEdit(zone)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Edit Zone"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(zone.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Zone"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Zone Details/Map Panel */}
        <div className="lg:col-span-1">
          {selectedZone ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Zone Details</h3>
                {editMode && (
                  <button
                    onClick={() => setEditMode(false)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={selectedZone.name}
                      onChange={(e) => setSelectedZone({...selectedZone, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{selectedZone.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedZone.severity)}`}>
                    {selectedZone.severity}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                  <div className="text-sm text-gray-600">{selectedZone.createdBy}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created On</label>
                  <div className="text-sm text-gray-600">{selectedZone.createdOn}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coordinates</label>
                  <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg font-mono">{selectedZone.coordinates}</div>
                </div>
              </div>

              {/* Mini Map */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Zone Preview</h4>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaMapMarkerAlt className="text-2xl mx-auto mb-1" />
                    <p className="text-xs">Map preview</p>
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-6">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a zone to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditGeoFence;