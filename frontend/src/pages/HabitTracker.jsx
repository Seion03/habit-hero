import React, { useState } from 'react';
import { Plus } from 'lucide-react';

// Layout Components
import Header from '../components/layout/Header';
import Navigation from '../components/common/Navigation';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

// Habit Components
import HabitGrid from '../components/habits/HabitGrid';
import HabitForm from '../components/habits/HabitForm';

// Analytics Components
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import RecentActivity from '../components/analytics/RecentActivity';

// Hooks
import { useHabits } from '../hooks/useHabits';
import { useAnalytics } from '../hooks/useAnalytics';

const HabitTracker = () => {
  const [activeTab, setActiveTab] = useState('habits');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const {
    habits,
    checkins,
    categories,
    loading: habitsLoading,
    createHabit,
    deleteHabit,
    toggleCheckin
  } = useHabits();

  const { analytics, loading: analyticsLoading } = useAnalytics();

  const handleCreateHabit = async (habitData) => {
    const success = await createHabit(habitData);
    if (success) {
      setShowAddHabit(false);
    }
  };

  if (habitsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'habits' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Button onClick={() => setShowAddHabit(true)}>
                <Plus className="h-5 w-5" />
                Add New Habit
              </Button>
            </div>

            <HabitGrid
              habits={habits}
              checkins={checkins}
              onToggleCheckin={toggleCheckin}
              onDeleteHabit={deleteHabit}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            analytics={analytics}
            habits={habits}
            checkins={checkins}
            loading={analyticsLoading}
          />
        )}

        <RecentActivity checkins={checkins} />

        <Modal
          isOpen={showAddHabit}
          onClose={() => setShowAddHabit(false)}
          title="Create New Habit"
        >
          <HabitForm
            categories={categories}
            onSubmit={handleCreateHabit}
            onCancel={() => setShowAddHabit(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default HabitTracker;
