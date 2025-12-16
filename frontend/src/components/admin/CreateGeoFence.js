import React, { useState } from 'react';
import { FaDrawPolygon, FaCircle, FaUndo, FaTrash, FaSave } from 'react-icons/fa';

const CreateGeoFence = () => {
  const [zoneName, setZoneName] = useState('');
  const [severity, setSeverity] = useState('High');
  const [description, setDescription] = useState('');
  const [drawingMode, setDrawingMode] = useState(null); // 'polygon' or 'circle'

  const handleSave = () => {
    if (!zoneName.trim()) {
      alert('Please enter a zone name');
      return;
    }
    // Here you would save the zone data
    console.log('Saving zone:', { zoneName, severity, description });
    alert('Zone saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Create High-Risk Zones</h2>
        <p className="text-gray-600 mt-2">Draw and configure high-risk zones on the map</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setDrawingMode('polygon')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    drawingMode === 'polygon'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaDrawPolygon />
                  <span>Draw Polygon</span>
                </button>
                <button
                  onClick={() => setDrawingMode('circle')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    drawingMode === 'circle'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaCircle />
                  <span>Draw Circle</span>
                </button>
                <button
                  onClick={() => setDrawingMode(null)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <FaUndo />
                  <span>Undo</span>
                </button>
                <button
                  onClick={() => {
                    setDrawingMode(null);
                    // Clear all drawings logic here
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                >
                  <FaTrash />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaDrawPolygon className="text-2xl" />
                </div>
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">Google Maps integration will be implemented</p>
                <p className="text-xs mt-2">Click drawing tools above to start creating zones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Zone Configuration</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zone Name *
                </label>
                <input
                  type="text"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter zone name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the zone and its risk factors"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  disabled={!zoneName.trim()}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                    zoneName.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaSave />
                  <span>Save Zone</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGeoFence;