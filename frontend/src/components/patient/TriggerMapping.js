import React, { useState } from 'react';
import { FaBullseye } from 'react-icons/fa';

export default function TriggerMapping() {
  const [selectedTrigger, setSelectedTrigger] = useState('');
  const [customTrigger, setCustomTrigger] = useState('');
  const [triggerLog, setTriggerLog] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('triggerLog')) || [];
    } catch (e) { return []; }
  });

  const commonTriggers = [
    'Stress',
    'Loneliness', 
    'Social Situations',
    'Boredom',
    'Anger',
    'Relationship Issues',
    'Work Pressure',
    'Financial Worry'
  ];

  const logTrigger = () => {
    const trigger = selectedTrigger || customTrigger;
    if (!trigger) return;

    const entry = {
      trigger,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };

    const newLog = [entry, ...triggerLog].slice(0, 20);
    setTriggerLog(newLog);
    localStorage.setItem('triggerLog', JSON.stringify(newLog));
    
    setSelectedTrigger('');
    setCustomTrigger('');
    alert('Trigger logged successfully! Understanding your patterns helps with recovery.');
  };

  const getTriggerCount = (trigger) => {
    return triggerLog.filter(entry => entry.trigger === trigger).length;
  };

  const mostCommonTrigger = triggerLog.length > 0 
    ? triggerLog.reduce((acc, entry) => {
        acc[entry.trigger] = (acc[entry.trigger] || 0) + 1;
        return acc;
      }, {})
    : {};

  const topTrigger = Object.keys(mostCommonTrigger).sort((a, b) => mostCommonTrigger[b] - mostCommonTrigger[a])[0];

  return (
    <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-200 h-full flex flex-col">
      <h3 className="text-xs font-semibold text-gray-800 mb-2 flex items-center">
        <span className="mr-1"><FaBullseye /></span>
        Trigger Mapping
      </h3>
      
      {topTrigger && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-1 mb-2">
          <div className="text-xs text-yellow-800">
            <strong>Top:</strong> {topTrigger} ({mostCommonTrigger[topTrigger]}x)
          </div>
        </div>
      )}

      <div className="flex-1 space-y-2">
        <div>
          <label className="text-xs text-gray-600 mb-1 block">What triggered you?</label>
          <div className="grid grid-cols-2 gap-1 mb-2">
            {commonTriggers.slice(0, 4).map((trigger) => (
              <button
                key={trigger}
                onClick={() => setSelectedTrigger(trigger)}
                className={`p-1 text-xs rounded border transition-colors ${
                  selectedTrigger === trigger 
                    ? 'bg-blue-100 border-blue-400 text-blue-800' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {trigger.length > 6 ? trigger.substring(0, 6) + '...' : trigger}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Custom..."
            value={customTrigger}
            onChange={(e) => setCustomTrigger(e.target.value)}
            className="w-full p-1.5 border border-gray-200 rounded text-xs mb-2"
          />

          <button
            onClick={logTrigger}
            disabled={!selectedTrigger && !customTrigger}
            className="w-full bg-blue-600 text-white py-1.5 rounded text-xs font-medium hover:bg-blue-700 disabled:bg-gray-300"
          >
            Log Trigger
          </button>
        </div>
      </div>
    </div>
  );
}