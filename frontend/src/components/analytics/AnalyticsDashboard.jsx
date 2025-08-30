import React from 'react';
import OverallStats from './OverallStats';
import HabitPerformance from './HabitPerformance';

const AnalyticsDashboard = ({ analytics, habits, checkins, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pass habits and checkins to OverallStats */}
      <OverallStats 
        analytics={analytics} 
        habits={habits} 
        checkins={checkins} 
        loading={loading} 
      />
      <HabitPerformance habits={habits} checkins={checkins} />
    </div>
  );
};

export default AnalyticsDashboard;
