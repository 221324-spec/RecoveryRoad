import React, { useState } from 'react';
import { FaBuilding, FaUsers, FaUserMd, FaCheckCircle, FaTimesCircle, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ViewNGOs = ({ onEdit, onViewReports }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const ngos = [
    {
      id: 1,
      name: 'Hope Recovery Center',
      supervisors: 12,
      patients: 245,
      status: 'Active',
      contactPerson: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hoperecovery.org',
      phone: '+1 (555) 123-4567',
      address: '123 Hope Street, Recovery City, RC 12345'
    },
    {
      id: 2,
      name: 'New Beginnings Rehab',
      supervisors: 8,
      patients: 156,
      status: 'Active',
      contactPerson: 'Dr. Michael Chen',
      email: 'm.chen@newbeginnings.org',
      phone: '+1 (555) 234-5678',
      address: '456 Renewal Ave, Healing Town, HT 67890'
    },
    {
      id: 3,
      name: 'Pathway to Wellness',
      supervisors: 15,
      patients: 312,
      status: 'Active',
      contactPerson: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@pathwaywellness.org',
      phone: '+1 (555) 345-6789',
      address: '789 Wellness Blvd, Healthy City, HC 13579'
    },
    {
      id: 4,
      name: 'Sunrise Recovery Institute',
      supervisors: 6,
      patients: 89,
      status: 'Suspended',
      contactPerson: 'Dr. David Park',
      email: 'd.park@sunriserecovery.org',
      phone: '+1 (555) 456-7890',
      address: '321 Sunrise Drive, Morning Light, ML 24680'
    }
  ];

  const NGOCard = ({ ngo }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaBuilding className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{ngo.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                ngo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {ngo.status === 'Active' ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                {ngo.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-1">
            <FaUserMd className="text-sm" />
            <span className="text-sm font-medium">Supervisors</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{ngo.supervisors}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-1">
            <FaUsers className="text-sm" />
            <span className="text-sm font-medium">Patients</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{ngo.patients}</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <div><strong>Contact:</strong> {ngo.contactPerson}</div>
        <div><strong>Email:</strong> {ngo.email}</div>
        <div><strong>Phone:</strong> {ngo.phone}</div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onViewReports(ngo)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          View Details
        </button>
        <button
          onClick={() => onEdit(ngo)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">NGO / Rehab Center Management</h2>
          <p className="text-gray-600 mt-2">View and manage all registered organizations</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'cards' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cards View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Table View
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ngos.map((ngo) => (
            <NGOCard key={ngo.id} ngo={ngo} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {ngos.map((ngo) => (
                  <tr key={ngo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{ngo.contactPerson}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ngo.supervisors}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ngo.patients}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        ngo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {ngo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewReports(ngo)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => onEdit(ngo)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit NGO"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => console.log('Delete NGO:', ngo.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete NGO"
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
      )}
    </div>
  );
};

export default ViewNGOs;