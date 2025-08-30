import React from 'react';
import { Target, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

const OverallStats = ({ analytics }) => {
  if (!analytics) return null;

  const stats = [
    { label: 'Total Habits', value: analytics.total_habits ?? 0, icon: Target, color: 'text-indigo-600' },
    { label: 'Total Check-ins', value: analytics.total_checkins ?? 0, icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Completion Rate', value: `${Math.round((analytics.completion_rate ?? 0) * 100)}%`, icon: TrendingUp, color: 'text-amber-600' },
    { label: 'Active Days', value: analytics.active_days ?? 0, icon: Calendar, color: 'text-cyan-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`h-6 w-6 ${color}`} />
            <span className="text-gray-600 font-medium">{label}</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default OverallStats;
