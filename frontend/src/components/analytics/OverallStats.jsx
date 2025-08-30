import React from 'react';
import { Target, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

const OverallStats = ({ analytics }) => {
  if (!analytics) return null;

  const stats = [
    {
      label: 'Total Habits',
      value: analytics.total_habits,
      icon: Target,
      color: 'text-indigo-600'
    },
    {
      label: 'Total Check-ins',
      value: analytics.total_checkins,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Success Rate',
      value: `${analytics.overall_success_rate}%`,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      label: 'Best Day',
      value: analytics.best_day,
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
