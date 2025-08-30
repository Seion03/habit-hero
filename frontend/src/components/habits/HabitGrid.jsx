import React from 'react';
import { Target } from 'lucide-react';
import HabitCard from './HabitCard';

const HabitGrid = ({ habits, checkins, onToggleCheckin, onDeleteHabit }) => {
  if (!habits || habits.length === 0) {
    return (
      <div className="text-center py-16">
        <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No habits yet</h3>
        <p className="text-gray-500">Start building great habits today!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          checkins={checkins}
          onToggleCheckin={onToggleCheckin}
          onDeleteHabit={onDeleteHabit}
        />
      ))}
    </div>
  );
};

export default HabitGrid;
