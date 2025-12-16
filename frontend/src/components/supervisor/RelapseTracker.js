import React, { useState, useEffect } from 'react';
import { FaBullseye, FaStar, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

export default function RelapseTracker() {
  const [milestones, setMilestones] = useState([]);
  const [relapses, setRelapses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('milestones');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
 
    const mockMilestones = [
      {
        id: 1,
        patientId: 1,
        patientName: 'John Smith',
        type: 'sobriety_days',
        title: '30 Days Sober',
        description: 'First month of continuous sobriety',
        achievedDate: '2025-09-25',
        badgeIcon: '🏆',
        certificateGenerated: true,
        category: 'sobriety'
      }
    ];
 
    const mockRelapses = [
      {
        id: 1,
        patientId: 2,
        patientName: 'Sarah Johnson',
        date: '2025-09-15',
        type: 'substance_use',
        severity: 'moderate',
        triggers: ['Work stress', 'Family conflict'],
        duration: '2 hours',
        interventionTaken: true,
        notes: 'Patient contacted crisis line immediately.',
        followUpActions: ['Emergency therapy session'],
        status: 'addressed'
      }
    ];

    setTimeout(() => {
      setMilestones(mockMilestones);
      setRelapses(mockRelapses);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .modern-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .modern-scrollbar::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.1);
          border-radius: 10px;
        }
        .modern-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8B5CF6, #6366F1);
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .modern-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7C3AED, #4F46E5);
        }
        .scrollable-area::-webkit-scrollbar {
          width: 6px;
        }
        .scrollable-area::-webkit-scrollbar-track {
          background: rgba(156, 163, 175, 0.1);
          border-radius: 8px;
        }
        .scrollable-area::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #A855F7, #8B5CF6);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .scrollable-area::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333EA, #7C3AED);
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6 overflow-y-auto modern-scrollbar">
        {/* Content with Scrollable Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Milestones Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
            
            <div className="max-h-[520px] overflow-y-auto scrollable-area p-6">
              {milestones.map((milestone, index) => (
                <div key={milestone?.id || index} className="mb-8 p-10 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 min-h-[200px]">
                  <div className="flex items-start gap-8 h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                      <FaBullseye />
                    </div>
                    <div className="flex-1 py-2">
                      <h4 className="font-bold text-gray-900 text-xl mb-4">30 Days Sober Achievement</h4>
                      <p className="text-gray-600 text-base mb-6 leading-relaxed">Patient milestone reached with excellent progress and dedication to recovery program. This achievement marks a significant step forward in their recovery journey.</p>
                      <div className="flex items-center gap-4 mt-6">
                        <span className="px-4 py-3 bg-sky-100 text-sky-700 rounded-lg text-base font-medium">Sobriety</span>
                        <span className="text-gray-500 text-base">September 25, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Additional demo content for scrolling */}
              {Array.from({length: 8}, (_, i) => (
                <div key={`demo-${i}`} className="mb-8 p-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-gray-200 min-h-[200px]">
                  <div className="flex items-start gap-8 h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                      <FaStar />
                    </div>
                    <div className="flex-1 py-2">
                      <h4 className="font-bold text-gray-900 text-xl mb-4">Demo Milestone {i + 1}</h4>
                      <p className="text-gray-600 text-base mb-6 leading-relaxed">Example achievement to demonstrate scrolling functionality with enhanced card height and better spacing. This demonstrates the taller card layout.</p>
                      <div className="flex items-center gap-4 mt-6">
                        <span className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-base font-medium">Progress</span>
                        <span className="text-gray-500 text-base">October {9 + i}, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incidents Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
            
            <div className="max-h-[520px] overflow-y-auto scrollable-area p-6">
              {relapses.map((relapse, index) => (
                <div key={relapse?.id || index} className="mb-8 p-10 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 min-h-[200px]">
                  <div className="flex items-start gap-8 h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                      <FaClipboardList />
                    </div>
                    <div className="flex-1 py-2">
                      <h4 className="font-bold text-gray-900 text-xl mb-4">Incident Report</h4>
                      <p className="text-gray-600 text-base mb-6 leading-relaxed">Patient contacted crisis line immediately - good response and proper intervention protocol followed. Swift action was taken to address the situation.</p>
                      <div className="flex items-center gap-4 mt-6">
                        <span className="px-4 py-3 bg-orange-100 text-orange-700 rounded-lg text-base font-medium">Moderate</span>
                        <span className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-base font-medium">Addressed</span>
                        <span className="text-gray-500 text-base">September 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
                            {/* Additional demo content for scrolling */}
              {Array.from({length: 6}, (_, i) => (
                <div key={`incident-${i}`} className="mb-8 p-10 bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl border border-gray-200 min-h-[200px]">
                  <div className="flex items-start gap-8 h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                      <FaExclamationTriangle />
                    </div>
                    <div className="flex-1 py-2">
                      <h4 className="font-bold text-gray-900 text-xl mb-4">Demo Incident {i + 1}</h4>
                      <p className="text-gray-600 text-base mb-6 leading-relaxed">Example incident to demonstrate scrolling functionality with enhanced card height and better content organization. This shows the improved layout.</p>
                      <div className="flex items-center gap-4 mt-6">
                        <span className="px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg text-base font-medium">Mild</span>
                        <span className="px-4 py-3 bg-sky-100 text-sky-700 rounded-lg text-base font-medium">Resolved</span>
                        <span className="text-gray-500 text-base">October {5 + i}, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
