export const getCategoryColor = (category) => {
  const colors = {
    'Health & Fitness': 'bg-green-100 text-green-800 border-green-200',
    'Mental Health': 'bg-blue-100 text-blue-800 border-blue-200',
    'Productivity': 'bg-purple-100 text-purple-800 border-purple-200',
    'Learning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Social': 'bg-pink-100 text-pink-800 border-pink-200',
    'Creative': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Finance': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Other': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return colors[category] || colors['Other'];
};

export const getStreakForHabit = (habitId, checkins) => {
  const habitCheckins = checkins
    .filter(c => c.habit_id === habitId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  let streak = 0;
  for (const checkin of habitCheckins) {
    if (checkin.completed) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

export const isCheckedToday = (habitId, checkins) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheckin = checkins.find(c => c.habit_id === habitId && c.date === today);
  return todayCheckin?.completed || false;
};
