import React, { useState } from 'react';

export default function TriggerLoggingScreen({ onBack }) {
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [customTrigger, setCustomTrigger] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('T');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const predefinedTriggers = [
    { id: 'stress', name: 'Stress', icon: 'S', color: 'bg-red-500' },
    { id: 'loneliness', name: 'Loneliness', icon: 'L', color: 'bg-blue-500' },
    { id: 'social-pressure', name: 'Social Pressure', icon: 'SP', color: 'bg-purple-500' },
    { id: 'boredom', name: 'Boredom', icon: 'B', color: 'bg-gray-500' },
    { id: 'anger', name: 'Anger', icon: 'A', color: 'bg-red-600' },
    { id: 'anxiety', name: 'Anxiety', icon: 'AX', color: 'bg-yellow-500' },
    { id: 'sadness', name: 'Sadness', icon: 'SD', color: 'bg-blue-600' },
    { id: 'celebration', name: 'Celebration', icon: 'C', color: 'bg-sky-500' },
    { id: 'work-pressure', name: 'Work Pressure', icon: 'WP', color: 'bg-orange-500' },
    { id: 'relationship', name: 'Relationship Issues', icon: 'RI', color: 'bg-pink-500' },
    { id: 'financial', name: 'Financial Stress', icon: 'FS', color: 'bg-sky-600' },
    { id: 'health', name: 'Health Concerns', icon: 'HC', color: 'bg-sky-500' }
  ];

  const iconOptions = ['T', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const toggleTrigger = (triggerId) => {
    setSelectedTriggers(prev => 
      prev.includes(triggerId) 
        ? prev.filter(id => id !== triggerId)
        : [...prev, triggerId]
    );
  };

  const handleSubmit = async () => {
    if (selectedTriggers.length === 0 && !customTrigger) {
      alert('Please select at least one trigger or add a custom trigger');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage
    const triggerEntry = {
      triggers: selectedTriggers,
      customTrigger: customTrigger ? { name: customTrigger, icon: selectedIcon } : null,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('triggerLog')) || [];
    existingData.unshift(triggerEntry);
    localStorage.setItem('triggerLog', JSON.stringify(existingData));
    
    setIsSubmitting(false);
    onBack();
  };

  const addCustomTrigger = () => {
    if (!customTrigger.trim()) return;
    
    // Add to predefined triggers for future use
    const newTrigger = {
      id: `custom-${Date.now()}`,
      name: customTrigger,
      icon: selectedIcon,
      color: 'bg-indigo-500'
    };
    
    setCustomTrigger('');
    setSelectedIcon('⚡');
    setShowCustomForm(false);
    
    // Auto-select the newly created trigger
    setSelectedTriggers(prev => [...prev, newTrigger.id]);
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
        <h1 className="text-2xl font-bold text-gray-800">Log Your Triggers</h1>
        <div></div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Instructions */}
        <div className="text-center bg-blue-50 rounded-xl p-4">
          <p className="text-blue-800 font-medium">
            Select the triggers you experienced today. Understanding your triggers helps build better coping strategies.
          </p>
        </div>

        {/* Predefined Triggers Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Common Triggers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {predefinedTriggers.map((trigger) => (
              <button
                key={trigger.id}
                onClick={() => toggleTrigger(trigger.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  selectedTriggers.includes(trigger.id)
                    ? `${trigger.color} border-white text-white shadow-lg`
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{trigger.icon}</div>
                <div className="font-semibold text-sm">{trigger.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Triggers Display */}
        {selectedTriggers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Selected Triggers:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTriggers.map((triggerId) => {
                const trigger = predefinedTriggers.find(t => t.id === triggerId);
                return trigger ? (
                  <span key={triggerId} className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${trigger.color}`}>
                    <span className="mr-1">{trigger.icon}</span>
                    {trigger.name}
                    <button 
                      onClick={() => toggleTrigger(triggerId)}
                      className="ml-2 text-white hover:text-red-200"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Custom Trigger Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add Custom Trigger</h2>
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showCustomForm ? 'Cancel' : '+ Add Custom'}
            </button>
          </div>

          {showCustomForm && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Name</label>
                <input
                  type="text"
                  value={customTrigger}
                  onChange={(e) => setCustomTrigger(e.target.value)}
                  placeholder="Enter your custom trigger..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Icon</label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-3 rounded-lg border-2 text-xl transition-colors ${
                        selectedIcon === icon
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={addCustomTrigger}
                disabled={!customTrigger.trim()}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  customTrigger.trim()
                    ? 'bg-sky-500 text-white hover:bg-sky-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Custom Trigger
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || (selectedTriggers.length === 0 && !customTrigger)}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : (selectedTriggers.length > 0 || customTrigger)
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Saving your triggers...</span>
            </div>
          ) : (
            'Save Trigger Log'
          )}
        </button>
      </div>
    </div>
  );
}