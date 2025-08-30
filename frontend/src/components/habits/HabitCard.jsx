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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{habit.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(habit.category)}`}>
            {habit.category}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Frequency</span>
          <span className="font-medium capitalize">{habit.frequency}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Current Streak</span>
          <span className="font-bold text-indigo-600">{streak} days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Started</span>
          <span className="font-medium">{new Date(habit.start_date).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          onClick={() => onToggleCheckin(habit.id)}
          variant={checkedToday ? 'success' : 'secondary'}
          size="full"
        >
          <CheckCircle className="h-5 w-5" />
          {checkedToday ? 'Completed Today!' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
};

export default HabitCard;
