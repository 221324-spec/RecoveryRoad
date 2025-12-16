import React, { useState } from 'react';

export default function MoodLoggingScreen({ onBack }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [cravingLevel, setCravingLevel] = useState(5);
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { emoji: '😊', label: 'Great', value: 'great', color: 'bg-sky-500' },
    { emoji: '😐', label: 'Okay', value: 'okay', color: 'bg-blue-500' },
    { emoji: '😔', label: 'Down', value: 'down', color: 'bg-yellow-500' },
    { emoji: '😡', label: 'Angry', value: 'angry', color: 'bg-red-500' }
  ];

  const aiSuggestions = [
    "Write how your day went...",
    "What made you feel this way today?",
    "Describe any challenges you faced...",
    "What are you grateful for today?",
    "How did you handle stress today?"
  ];

  const getCravingColor = (level) => {
    if (level <= 3) return 'from-sky-400 to-sky-600';
    if (level <= 6) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      alert('Please select your mood');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage (in real app, this would be API call)
    const moodEntry = {
      mood: selectedMood,
      craving: cravingLevel,
      journal: journalText,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('moodHistory')) || [];
    existingData.unshift(moodEntry);
    localStorage.setItem('moodHistory', JSON.stringify(existingData));
    
    setIsSubmitting(false);
    onBack();
  };

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
        <h1 className="text-3xl font-bold text-gray-800">Log Your Mood</h1>
        <div></div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Mood Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How are you feeling today?</h2>
          <div className="grid grid-cols-2 gap-6">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-6 rounded-3xl border-3 transition-all duration-200 hover:scale-105 ${
                  selectedMood === mood.value
                    ? `${mood.color} border-white text-white shadow-xl`
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-3">{mood.emoji}</div>
                <div className="font-semibold text-lg">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Column - Craving Level */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Craving Level (0-10)</h2>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="10"
                value={cravingLevel}
                onChange={(e) => setCravingLevel(parseInt(e.target.value))}
                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, 
                    #0ea5e9 0%, #0284c7 30%, 
                    #F59E0B 30%, #F59E0B 60%, 
                    #EF4444 60%, #EF4444 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span>0<br/>No craving</span>
                <span>5<br/>Moderate</span>
                <span>10<br/>Intense</span>
              </div>
            </div>
            <div className="text-center">
              <div className={`inline-block px-8 py-4 rounded-full text-white font-bold text-xl bg-gradient-to-r ${getCravingColor(cravingLevel)} shadow-lg`}>
                Level {cravingLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Suggestions */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Quick Prompts</h2>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setJournalText(suggestion)}
                className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-xl text-base hover:bg-blue-100 transition-colors shadow-sm hover:shadow-md"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Journal */}
      <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Journal Your Thoughts</h2>
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Start writing here..."
          rows={4}
          className="w-full p-6 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
        />
        
        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedMood}
            className={`px-12 py-4 rounded-2xl font-semibold text-xl transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : selectedMood
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Saving your mood...</span>
              </div>
            ) : (
              'Save Mood Entry'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}