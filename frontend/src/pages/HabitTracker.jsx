import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import Header from '../components/layout/Header';
import Navigation from '../components/common/Navigation';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

import HabitGrid from '../components/habits/HabitGrid';
import HabitForm from '../components/habits/HabitForm';

import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import RecentActivity from '../components/analytics/RecentActivity';

import { useHabits } from '../hooks/useHabits';
import { useAnalytics } from '../hooks/useAnalytics';

const HabitTracker = () => {
  const [activeTab, setActiveTab] = useState('habits');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const { habits, checkins, categories, loading, createHabit, deleteHabit, toggleCheckin } = useHabits();
  const { analytics } = useAnalytics();

  const handleCreateHabit = async (payload) => {
    await createHabit(payload);
    setShowAddHabit(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <Header />

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'habits' && (
          <div className="flex justify-end mb-4">
            <Button onClick={() => setShowAddHabit(true)}>
              <Plus className="h-5 w-5" />
              New Habit
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {activeTab === 'habits' ? (
            <>
              <HabitGrid
                habits={habits}
                checkins={checkins}
                onToggleCheckin={toggleCheckin}
                onDeleteHabit={deleteHabit}
              />
              <RecentActivity habits={habits} checkins={checkins} />
            </>
          ) : (
            <AnalyticsDashboard analytics={analytics} habits={habits} checkins={checkins} loading={loading} />
          )}
        </div>

        <Modal isOpen={showAddHabit} onClose={() => setShowAddHabit(false)} title="Create New Habit">
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
