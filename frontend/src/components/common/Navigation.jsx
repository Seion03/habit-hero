import React from 'react';
import { Target, BarChart3 } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'habits', label: 'My Habits', icon: Target },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`px-5 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeTab === key
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
