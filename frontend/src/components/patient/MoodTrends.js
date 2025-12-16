import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function MoodTrends() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('moodHistory')) || [];
    } catch (e) { return []; }
  });

  // Generate sample data if none exists
  useEffect(() => {
    if (history.length === 0) {
      const sampleData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        sampleData.push({
          date: date.toISOString(),
          mood: ['😊','😐','😔','😠'][Math.floor(Math.random() * 4)],
          craving: Math.floor(Math.random() * 11),
          notes: ''
        });
      }
      setHistory(sampleData);
      localStorage.setItem('moodHistory', JSON.stringify(sampleData));
    }
  }, [history.length]);

  // Convert mood to numeric for chart
  const moodToNumber = (mood) => {
    const map = { '😊': 4, '😐': 3, '😔': 2, '😠': 1 };
    return map[mood] || 3;
  };

  const chartData = history.slice(0, 7).reverse().map((entry, index) => ({
    day: `Day ${index + 1}`,
    mood: moodToNumber(entry.mood),
    craving: entry.craving,
    date: new Date(entry.date).toLocaleDateString()
  }));

  const streakDays = history.slice(0, 10).filter(entry => entry.craving <= 3).length;

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📈</span>
          Mood & Craving Trends
        </h3>
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-gray-600">Mood</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
            <span className="text-gray-600">Craving</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" fontSize={10} stroke="#6b7280" />
            <YAxis domain={[0, 10]} fontSize={10} stroke="#6b7280" />
            <Bar dataKey="mood" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="craving" fill="#ef4444" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <div className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full font-medium">
            🔥 {streakDays} day streak
          </div>
          <div className="text-gray-600">
            Last: {history[0] ? new Date(history[0].date).toLocaleDateString() : 'No data'}
          </div>
        </div>
      </div>
    </div>
  );
}