import React, { useState } from 'react';

export default function AppointmentsScreen({ onBack }) {
  const [view, setView] = useState('calendar'); // 'calendar' or 'schedule'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [provider, setProvider] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const appointmentTypes = [
    { value: 'therapy', label: 'Individual Therapy', icon: '💬', duration: '60 min' },
    { value: 'group', label: 'Group Therapy', icon: '👥', duration: '90 min' },
    { value: 'psychiatrist', label: 'Psychiatrist', icon: '🏥', duration: '45 min' },
    { value: 'counselor', label: 'Counselor Check-in', icon: '🤝', duration: '30 min' },
    { value: 'medical', label: 'Medical Check-up', icon: '🩺', duration: '30 min' },
    { value: 'intake', label: 'Intake Assessment', icon: '📋', duration: '120 min' }
  ];

  const providers = [
    { value: 'dr-smith', name: 'Dr. Sarah Smith', specialty: 'Addiction Psychiatrist', available: ['09:00', '14:00', '16:00'] },
    { value: 'dr-johnson', name: 'Dr. Mike Johnson', specialty: 'Licensed Therapist', available: ['10:00', '13:00', '15:00'] },
    { value: 'ms-davis', name: 'Ms. Lisa Davis', specialty: 'Group Counselor', available: ['11:00', '14:00', '17:00'] },
    { value: 'dr-wilson', name: 'Dr. Emma Wilson', specialty: 'Clinical Psychologist', available: ['09:30', '14:30', '16:30'] }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Mock existing appointments
  const existingAppointments = [
    {
      id: 1,
      type: 'Individual Therapy',
      provider: 'Dr. Sarah Smith',
      date: '2025-10-01',
      time: '14:00',
      status: 'confirmed',
      icon: '💬'
    },
    {
      id: 2,
      type: 'Group Therapy',
      provider: 'Ms. Lisa Davis',
      date: '2025-10-03',
      time: '11:00',
      status: 'pending',
      icon: '👥'
    },
    {
      id: 3,
      type: 'Medical Check-up',
      provider: 'Dr. Emma Wilson',
      date: '2025-10-07',
      time: '16:30',
      status: 'confirmed',
      icon: '🩺'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderData = (value) => {
    return providers.find(p => p.value === value);
  };

  const getAvailableTimes = () => {
    if (!provider) return timeSlots;
    const providerData = getProviderData(provider);
    return providerData ? providerData.available : timeSlots;
  };

  const handleSchedule = async () => {
    if (!appointmentType || !provider || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const appointmentData = appointmentTypes.find(type => type.value === appointmentType);
    const providerData = getProviderData(provider);
    
    // Save to localStorage
    const newAppointment = {
      id: Date.now(),
      type: appointmentData.label,
      provider: providerData.name,
      date: selectedDate,
      time: selectedTime,
      duration: appointmentData.duration,
      status: 'pending',
      notes: notes,
      icon: appointmentData.icon,
      timestamp: new Date().toISOString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('appointments')) || [];
    existingData.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(existingData));
    
    setIsSubmitting(false);
    
    // Reset form and go back to calendar view
    setAppointmentType('');
    setProvider('');
    setSelectedTime('');
    setNotes('');
    setView('calendar');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'calendar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setView('schedule')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'schedule' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Schedule New
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {existingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{appointment.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{appointment.type}</h3>
                        <p className="text-sm text-gray-600">with {appointment.provider}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(appointment.date)} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <div className="mt-2 space-x-2">
                        <button className="text-blue-600 text-sm hover:underline">Reschedule</button>
                        <button className="text-red-600 text-sm hover:underline">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setView('schedule')}
              className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="text-3xl mb-2">📅</div>
              <div className="font-semibold text-blue-800">Schedule New Appointment</div>
              <div className="text-sm text-blue-600">Book your next session</div>
            </button>
            <button className="p-6 bg-sky-50 border-2 border-sky-200 rounded-xl hover:bg-sky-100 transition-colors">
              <div className="text-3xl mb-2">🆘</div>
              <div className="font-semibold text-sky-800">Emergency Contact</div>
              <div className="text-sm text-sky-600">24/7 crisis support</div>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Appointment Type */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">Appointment Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {appointmentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setAppointmentType(type.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    appointmentType === type.value
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-sm">{type.label}</div>
                  <div className="text-xs opacity-75">{type.duration}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Provider Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">Select Provider</label>
            <div className="space-y-3">
              {providers.map((prov) => (
                <button
                  key={prov.value}
                  onClick={() => setProvider(prov.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    provider === prov.value
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">{prov.name}</div>
                  <div className="text-sm opacity-75">{prov.specialty}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          {provider && (
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">Available Times</label>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {getAvailableTimes().map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific concerns or topics you'd like to discuss..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSchedule}
            disabled={isSubmitting || !appointmentType || !provider || !selectedDate || !selectedTime}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : (appointmentType && provider && selectedDate && selectedTime)
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Scheduling appointment...</span>
              </div>
            ) : (
              'Schedule Appointment'
            )}
          </button>
        </div>
      )}
    </div>
  );
}