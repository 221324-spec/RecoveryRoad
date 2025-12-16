import React, { useState } from 'react';
import { FaUserMd, FaPlus, FaEdit, FaTrash, FaSearch, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const SupervisorManagement = ({ view }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for supervisors
  const [supervisors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@ngo.org', patients: 12, status: 'Active', specialization: 'Addiction Counseling' },
    { id: 2, name: 'Dr. Michael Chen', email: 'michael.chen@ngo.org', patients: 8, status: 'Active', specialization: 'Mental Health' },
    { id: 3, name: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@ngo.org', patients: 15, status: 'Active', specialization: 'Family Therapy' },
    { id: 4, name: 'Dr. James Wilson', email: 'james.wilson@ngo.org', patients: 6, status: 'Inactive', specialization: 'Crisis Intervention' }
  ]);

  // Mock data for patients available for assignment
  const [availablePatients] = useState([
    { id: 1, name: 'John Doe', currentSupervisor: null },
    { id: 2, name: 'Jane Smith', currentSupervisor: 1 },
    { id: 3, name: 'Bob Johnson', currentSupervisor: null },
    { id: 4, name: 'Alice Brown', currentSupervisor: 2 }
  ]);

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supervisor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignPatient = (patientId, supervisorId) => {
    console.log(`Assigning patient ${patientId} to supervisor ${supervisorId}`);
    // Implementation for assignment logic
  };

  const handleUnassignPatient = (patientId) => {
    console.log(`Unassigning patient ${patientId}`);
    // Implementation for unassignment logic
  };

  if (view === 'list') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Supervisor Management</h1>
            <p className="text-gray-600 mt-2">View and manage all supervisors in your organization</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FaPlus />
            <span>Add Supervisor</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search supervisors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Supervisors Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Supervisors ({filteredSupervisors.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSupervisors.map((supervisor) => (
                  <tr key={supervisor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FaUserMd className="text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{supervisor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supervisor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supervisor.specialization}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supervisor.patients}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        supervisor.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {supervisor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 mr-3">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'assign') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assign/Unassign Supervisors</h1>
          <p className="text-gray-600 mt-2">Manage patient-supervisor assignments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Patients */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Patients</h2>
            <div className="space-y-3">
              {availablePatients.filter(p => !p.currentSupervisor).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">{patient.name}</span>
                  <select
                    onChange={(e) => handleAssignPatient(patient.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                    defaultValue=""
                  >
                    <option value="" disabled>Assign to...</option>
                    {supervisors.filter(s => s.status === 'Active').map((supervisor) => (
                      <option key={supervisor.id} value={supervisor.id}>{supervisor.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Current Assignments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Assignments</h2>
            <div className="space-y-3">
              {availablePatients.filter(p => p.currentSupervisor).map((patient) => {
                const supervisor = supervisors.find(s => s.id === patient.currentSupervisor);
                return (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-800">{patient.name}</span>
                      <span className="text-sm text-gray-600 ml-2">→ {supervisor?.name}</span>
                    </div>
                    <button
                      onClick={() => handleUnassignPatient(patient.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaUserTimes />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'add') {
    return (
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Add New Supervisor</h1>
          <p className="text-gray-600 mt-2">Register a new supervisor for your organization</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mt-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Select specialization</option>
                <option value="addiction">Addiction Counseling</option>
                <option value="mental-health">Mental Health</option>
                <option value="family-therapy">Family Therapy</option>
                <option value="crisis">Crisis Intervention</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter license number"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Add Supervisor
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default SupervisorManagement;