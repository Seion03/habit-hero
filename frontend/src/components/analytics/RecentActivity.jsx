import React, { useMemo } from 'react';
import { CheckCircle } from 'lucide-react';

const RecentActivity = ({ checkins, habits }) => {
  const lastTen = useMemo(() => {
    const byDate = [...(checkins || [])].sort((a,b) => new Date(b.date) - new Date(a.date));
    return byDate.slice(0, 10);
  }, [checkins]);

  const nameById = useMemo(() => Object.fromEntries((habits || []).map(h => [h.id, h.name])), [habits]);

  if (!lastTen.length) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <ul className="divide-y divide-gray-100">
        {lastTen.map((c, i) => (
          <li key={i} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className={`h-5 w-5 ${c.completed ? 'text-emerald-600' : 'text-gray-400'}`} />
              <div>
                <div className="font-medium text-gray-800">{nameById[c.habit_id] || 'Unknown Habit'}</div>
                <div className="text-sm text-gray-500">{new Date(c.date).toDateString()}</div>
              </div>
            </div>
            <span className={`text-sm ${c.completed ? 'text-emerald-700' : 'text-gray-500'}`}>
              {c.completed ? 'Completed' : 'Missed'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
