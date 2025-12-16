import React, { useState } from 'react';

export default function ActivityLoggingScreen({ onBack }) {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [status, setStatus] = useState('scheduled'); // 'scheduled', 'completed', 'pending'
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityOptions = [
    { value: 'meditation', label: 'Meditation', icon: '🧘', points: 15, category: 'Wellness' },
    { value: 'therapy', label: 'Therapy Session', icon: '💬', points: 25, category: 'Support' },
    { value: 'exercise', label: 'Exercise', icon: '🏃', points: 20, category: 'Physical' },
    { value: 'journaling', label: 'Journaling', icon: '📝', points: 10, category: 'Mental' },
    { value: 'group-session', label: 'Group Session', icon: '👥', points: 20, category: 'Social' },
    { value: 'walking', label: 'Walking', icon: '🚶', points: 15, category: 'Physical' },
    { value: 'reading', label: 'Reading', icon: '📚', points: 10, category: 'Mental' },
    { value: 'breathing', label: 'Breathing Exercise', icon: '🌬️', points: 12, category: 'Wellness' },
    { value: 'music', label: 'Music Therapy', icon: '🎵', points: 15, category: 'Wellness' },
    { value: 'art', label: 'Art Therapy', icon: '🎨', points: 18, category: 'Creative' },
    { value: 'yoga', label: 'Yoga', icon: '🧘‍♀️', points: 20, category: 'Physical' },
    { value: 'volunteer', label: 'Volunteer Work', icon: '🤝', points: 25, category: 'Social' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'completed': return 'bg-sky-500 text-white';
      case 'scheduled': return 'bg-blue-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getActivityByValue = (value) => {
    return activityOptions.find(activity => activity.value === value);
  };

  const handleSubmit = async () => {
    if (!selectedActivity || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const activity = getActivityByValue(selectedActivity);
    
    // Save to localStorage
    const activityEntry = {
      activity: activity.label,
      icon: activity.icon,
      points: activity.points,
      category: activity.category,
      date: selectedDate,
      time: selectedTime,
      status: status,
      notes: notes,
      timestamp: new Date().toISOString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('activityLog')) || [];
    existingData.unshift(activityEntry);
    localStorage.setItem('activityLog', JSON.stringify(existingData));
    
    // Update points if completed
    if (status === 'completed') {
      const currentPoints = parseInt(localStorage.getItem('recoveryPoints')) || 0;
      localStorage.setItem('recoveryPoints', (currentPoints + activity.points).toString());
    }
    
    setIsSubmitting(false);
    onBack();
  };

  const selectedActivityData = selectedActivity ? getActivityByValue(selectedActivity) : null;

  return (
    <div className="w-full px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors text-lg"
        >
          <span className="text-xl">←</span>
          <span>Back to Home</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Log Activity</h1>
        <div></div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Left Column - Activity Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Select Activity</h2>
          <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {activityOptions.map((activity) => (
              <button
                key={activity.value}
                onClick={() => setSelectedActivity(activity.value)}
                className={`p-4 rounded-2xl border-3 transition-all duration-200 hover:scale-105 ${
                  selectedActivity === activity.value
                    ? 'bg-blue-500 border-blue-500 text-white shadow-xl'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-3xl mb-2">{activity.icon}</div>
                <div className="font-semibold text-sm">{activity.label}</div>
                <div className="text-xs opacity-75">+{activity.points} pts</div>
              </button>
            ))}
          </div>
          
          {/* Selected Activity Info */}
          {selectedActivityData && (
            <div className="bg-blue-50 rounded-2xl p-4 mt-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedActivityData.icon}</span>
                <div>
                  <h3 className="font-semibold text-blue-800 text-lg">{selectedActivityData.label}</h3>
                  <p className="text-sm text-blue-600">
                    Category: {selectedActivityData.category} • Points: +{selectedActivityData.points}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center Column - Date & Time */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Schedule</h2>
          
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Time</label>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Status & Notes */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Status & Notes</h2>
          
          {/* Status Selection */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">Status</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'scheduled', label: 'Scheduled', icon: '📅' },
                { value: 'completed', label: 'Completed', icon: '✅' },
                { value: 'pending', label: 'Pending', icon: '⏳' }
              ].map((statusOption) => (
                <button
                  key={statusOption.value}
                  onClick={() => setStatus(statusOption.value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    status === statusOption.value
                      ? getStatusColor(statusOption.value) + ' shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{statusOption.icon}</span>
                    <span className="font-semibold">{statusOption.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Points Preview & Submit */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        {/* Points Preview */}
        {selectedActivityData && status === 'completed' && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-sky-600 text-3xl">🎉</span>
              <span className="text-sky-800 font-semibold text-xl">
                You'll earn +{selectedActivityData.points} wellness points!
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedActivity || !selectedDate || !selectedTime}
            className={`px-12 py-4 rounded-2xl font-semibold text-xl transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : (selectedActivity && selectedDate && selectedTime)
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Saving activity...</span>
              </div>
            ) : (
              'Save Activity'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}