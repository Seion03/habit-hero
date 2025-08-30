import React from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';
import { getCategoryColor, getStreakForHabit, isCheckedToday } from '../../utils/helpers';
import Button from '../common/Button';

const HabitCard = ({ habit, checkins, onToggleCheckin, onDeleteHabit }) => {
  const streak = getStreakForHabit(habit.id, checkins);
  const checkedToday = isCheckedToday(habit.id, checkins);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      onDeleteHabit(habit.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
          <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm border ${getCategoryColor(habit.category)}`}>
            {habit.category}
          </div>
        </div>
        <button onClick={handleDelete} className="text-gray-400 hover:text-red-600" aria-label="Delete Habit">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Frequency: <span className="font-medium">{habit.frequency}</span></span>
        <span>Streak: <span className="font-medium">{streak}🔥</span></span>
      </div>

      <Button
        onClick={() => onToggleCheckin(habit.id)}
        variant={checkedToday ? 'success' : 'secondary'}
        size="full"
      >
        <CheckCircle className="h-5 w-5" />
        {checkedToday ? 'Completed Today!' : 'Mark Complete'}
      </Button>
    </div>
  );
};

export default HabitCard;
