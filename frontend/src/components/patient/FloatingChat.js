import React from 'react';
import AIChatBot from './AIChatBot';

export default function FloatingChat({ isOpen, onToggle }) {

  return (
    <>
      {/* AI Chat Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-50"
        title="AI Support Chat - Available 24/7"
      >
        {isOpen ? (
          <span className="text-2xl">×</span>
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-40 overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">🤖</span>
              <div>
                <div className="font-semibold text-sm">AI Support</div>
                <div className="text-xs text-blue-200">Available 24/7</div>
              </div>
            </div>
            <button 
              onClick={onToggle}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="h-full">
            <AIChatBot />
          </div>
        </div>
      )}
    </>
  );
}