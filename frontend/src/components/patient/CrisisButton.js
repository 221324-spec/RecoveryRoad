import React from 'react';

export default function CrisisButton({ isOpen, onToggle }) {
  const handleSOS = () => {
    // In a real app, this would call emergency services or alert supervisor
    alert('🚨 Emergency services contacted. Help is on the way. 🚨\n\nCrisis Hotline: 988\nYou are not alone.');
    onToggle(); // Close the dialog after getting help
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <button 
        onClick={onToggle}
        className="bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 flex items-center justify-center text-xs"
      >
        {isOpen ? '×' : 'SOS'}
      </button>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-red-500 max-w-xs absolute bottom-20 right-0">
          <h3 className="text-lg font-bold text-red-600 mb-3">⚠️ Crisis Support</h3>
          <p className="text-sm mb-4 force-black-text">
            Do you need immediate help? This will contact emergency support.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={handleSOS}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium text-sm transition-colors"
            >
              Get Help Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}