import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const HabitPerformance = ({ habits, checkins }) => {
  const data = useMemo(() => {
    // Calculate completion count per habit
    return (habits || []).map(h => {
      const total = (checkins || []).filter(c => c.habit_id === h.id).length;
      const completed = (checkins || []).filter(c => c.habit_id === h.id && c.completed).length;
      const rate = total ? Math.round((completed / total) * 100) : 0;
      return { name: h.name, completion: rate };
    });
  }, [habits, checkins]);

  if (!data.length) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Habit Completion %</h3>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar dataKey="completion" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HabitPerformance;
