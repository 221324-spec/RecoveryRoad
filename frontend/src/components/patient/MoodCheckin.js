import React, { useState, useEffect } from 'react';

export default function MoodCheckin() {
  const [mood, setMood] = useState('😊');
  const [craving, setCraving] = useState(0);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('moodHistory')) || [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(history));
  }, [history]);

  const logMood = () => {
    const entry = { date: new Date().toISOString(), mood, craving, notes };
    setHistory(prev => [entry, ...prev].slice(0, 60));
    setNotes('');
    alert('Mood logged (demo)');
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg h-full flex flex-col border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 flex items-center">
        <span className="mr-2">📝</span>
        Daily Mood Check-in
      </h3>
      <div className="flex-1 space-y-3">
        <div> 
          <div className="text-xs font-medium text-gray-700 mb-2">Select mood</div>
          <div className="flex gap-2 text-xl">
            {['😊','😐','😔','😠'].map(item => (
              <button key={item} onClick={() => setMood(item)} className={`p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${mood===item? 'border-blue-500 bg-blue-50 shadow-md':'border-gray-200 hover:border-gray-300'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Craving level: <span className="font-bold text-blue-600">{craving}</span></div>
          <input type="range" min="0" max="10" value={craving} onChange={e => setCraving(Number(e.target.value))} className="w-full h-2 appearance-none bg-gray-200 rounded-lg cursor-pointer slider" />
        </div>

        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Notes</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2 border border-gray-200 rounded-lg text-xs focus:border-blue-500 focus:outline-none transition-colors" placeholder="How are you feeling today?..." />
        </div>

        <button onClick={logMood} className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-xs hover:bg-blue-600 transition-colors shadow-md">Log Today's Mood</button>
      </div>
    </div>
  );
}
