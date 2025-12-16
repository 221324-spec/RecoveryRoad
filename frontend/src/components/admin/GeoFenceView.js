import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

export default function GeoFenceEdit() {
  const [zones, setZones] = useState([
    { id: 1, name: 'Downtown Crisis Zone', latitude: 40.7128, longitude: -74.0060, radius: 500, riskLevel: 'high', active: true },
    { id: 2, name: 'Suburban Watch Area', latitude: 40.7589, longitude: -73.9851, radius: 300, riskLevel: 'medium', active: true },
    { id: 3, name: 'Residential Safe Zone', latitude: 40.7505, longitude: -73.9934, radius: 200, riskLevel: 'low', active: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [editingZone, setEditingZone] = useState(null);

  const filteredZones = zones.filter(zone => {
    const matchesSearch = zone.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === 'all' || zone.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const handleEditZone = (zone) => {
    setEditingZone({...zone});
  };

  const handleSaveEdit = () => {
    setZones(zones.map(zone =>
      zone.id === editingZone.id ? editingZone : zone
    ));
    setEditingZone(null);
  };

  const handleDeleteZone = (id) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      setZones(zones.filter(zone => zone.id !== id));
    }
  };

  const toggleZoneStatus = (id) => {
    setZones(zones.map(zone =>
      zone.id === id ? {...zone, active: !zone.active} : zone
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Edit/Delete Geo-Fence Zones</h2>
          <p className="text-gray-600 mt-2">Manage existing geographical zones and their settings</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <div>
              <p className="text-sm font-semibold text-blue-800">Total Zones</p>
              <p className="text-2xl font-bold text-blue-600">{zones.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search zones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingZone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Zone</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Name</label>
                <input
                  type="text"
                  value={editingZone.name}
                  onChange={(e) => setEditingZone({...editingZone, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editingZone.latitude}
                    onChange={(e) => setEditingZone({...editingZone, latitude: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editingZone.longitude}
                    onChange={(e) => setEditingZone({...editingZone, longitude: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Radius (meters)</label>
                <input
                  type="number"
                  value={editingZone.radius}
                  onChange={(e) => setEditingZone({...editingZone, radius: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select
                  value={editingZone.riskLevel}
                  onChange={(e) => setEditingZone({...editingZone, riskLevel: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingZone(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zones List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Zone Management</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredZones.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-3 text-gray-300" />
              <p>No zones found matching your criteria</p>
            </div>
          ) : (
            filteredZones.map((zone) => (
              <div key={zone.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FaMapMarkerAlt className={`text-2xl ${
                      zone.riskLevel === 'high' ? 'text-red-500' :
                      zone.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{zone.name}</h4>
                      <p className="text-sm text-gray-600">
                        {zone.latitude.toFixed(4)}, {zone.longitude.toFixed(4)} • {zone.radius}m radius
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      zone.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      zone.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {zone.riskLevel} risk
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${zone.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className="text-sm text-gray-600">{zone.active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditZone(zone)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Zone"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => toggleZoneStatus(zone.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          zone.active ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={zone.active ? 'Deactivate Zone' : 'Activate Zone'}
                      >
                        <span className="text-sm">{zone.active ? 'Deactivate' : 'Activate'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteZone(zone.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Zone"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}