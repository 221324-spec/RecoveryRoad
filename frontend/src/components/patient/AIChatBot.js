import React, { useState, useRef, useEffect } from 'react';

export default function AIChatBot() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'ai', text: 'Hello! I\'m your AI recovery assistant. How can I support you today?', ts: Date.now()-1000*60*10 },
    { id: 2, from: 'ai', text: 'I can help with coping strategies, relaxation techniques, or just listen if you need to talk.', ts: Date.now()-1000*60*5 },
  ]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const aiResponses = [
    "That sounds challenging. Remember that every day is a new opportunity for progress. What coping strategy works best for you?",
    "I understand how you're feeling. Have you tried some deep breathing exercises? They can help reduce anxiety.",
    "It's completely normal to have ups and downs in recovery. What's one small thing that made you feel good today?",
    "Thank you for sharing that with me. Would you like me to suggest some mindfulness techniques?",
    "Your feelings are valid. Recovery is a journey, not a destination. How can I best support you right now?",
    "That's great to hear! Celebrating small victories is important. What are you most proud of today?",
    "I'm here for you 24/7. Remember, seeking help is a sign of strength, not weakness.",
    "Have you tried journaling about your feelings? Sometimes writing can help process emotions.",
    "Recovery takes courage, and you're showing that every day. What motivates you to keep going?"
  ];

  const send = () => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      from: 'patient', 
      text: text.trim(), 
      ts: Date.now() 
    }]);
    setText('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response after 1-2 seconds
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        from: 'ai', 
        text: randomResponse, 
        ts: Date.now() 
      }]);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.from === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${
              m.from === 'patient' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {m.from === 'ai' && (
                <div className="flex items-center mb-1">
                  <span className="text-sm">🤖 AI Assistant</span>
                </div>
              )}
              <div className="text-sm break-words">{m.text}</div>
              <div className={`text-xs mt-1 ${
                m.from === 'patient' ? 'text-blue-200' : 'text-gray-500'
              }`}>
                {new Date(m.ts).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <span className="text-sm mr-2">🤖 AI Assistant</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="text-sm">Typing</div>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex gap-2">
          <input 
            value={text} 
            onChange={e => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about recovery..." 
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
            disabled={isTyping}
          />
          <button 
            onClick={send} 
            disabled={isTyping || !text.trim()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 flex items-center">
          <span className="mr-1">🤖</span>
          AI Assistant • Available 24/7 • Your conversations are private
        </div>
      </div>
    </div>
  );
}