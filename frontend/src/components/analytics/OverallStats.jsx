import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, TrendingUp, Calendar, Award, Clock } from 'lucide-react';
import api from '../../services/api';

const OverallStats = ({ habits, checkins, loading }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setAnalyticsLoading(true);
        const data = await api.fetchAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Calculate additional stats from local data
  const calculateLocalStats = () => {
    if (!habits.length) return { todayCompleted: 0, currentStreak: 0, activeDays: 0 };

    const today = new Date().toDateString();
    const todayCheckins = checkins.filter(c => 
      new Date(c.date).toDateString() === today && c.completed
    );

    // Calculate active days (days with any check-ins)
    const uniqueDates = new Set(
      checkins
        .filter(c => c.completed)
        .map(c => new Date(c.date).toDateString())
    );

    // Calculate overall current streak (consecutive days with any completed habits)
    let currentStreak = 0;
    const sortedDates = Array.from(uniqueDates).sort((a, b) => new Date(b) - new Date(a));
    
    if (sortedDates.length > 0) {
      const today = new Date();
      let checkDate = new Date(today);
      
      for (let i = 0; i < sortedDates.length; i++) {
        const dateStr = checkDate.toDateString();
        if (sortedDates.includes(dateStr)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return {
      todayCompleted: todayCheckins.length,
      currentStreak,
      activeDays: uniqueDates.size
    };
  };

  const localStats = calculateLocalStats();

  const stats = [
    {
      label: 'Active Habits',
      value: habits?.length || 0,
      icon: Target,
      gradient: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      description: 'Total habits being tracked'
    },
    {
      label: 'Total Check-ins',
      value: analyticsData?.total_checkins || checkins?.filter(c => c.completed).length || 0,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      description: 'All completed check-ins'
    },
    {
      label: 'Success Rate',
      value: `${analyticsData?.overall_success_rate || 0}%`,
      icon: Award,
      gradient: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      description: 'Overall completion percentage'
    },
    {
      label: 'Today Completed',
      value: localStats.todayCompleted,
      icon: Clock,
      gradient: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-700',
      description: `Out of ${habits?.length || 0} habits`
    },
    {
      label: 'Current Streak',
      value: `${localStats.currentStreak}`,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      description: 'Consecutive active days'
    },
    {
      label: 'Active Days',
      value: localStats.activeDays,
      icon: Calendar,
      gradient: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      description: 'Days with completed habits'
    }
  ];

  // Additional insights
  const insights = {
    bestCategory: analyticsData?.best_category || 'None',
    bestDay: analyticsData?.best_day || 'None',
    todayProgress: habits?.length > 0 ? Math.round((localStats.todayCompleted / habits.length) * 100) : 0
  };

  if (loading || analyticsLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          📊 Overall Statistics
        </h2>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map(({ label, value, icon: Icon, gradient, bgColor, textColor, description }) => (
            <div
              key={label}
              className={`${bgColor} rounded-2xl p-4 border border-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {label}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className={`text-2xl font-bold ${textColor}`}>
                  {value}{label === 'Current Streak' && value !== '0' && ' 🔥'}
                </div>
                <div className="text-xs text-gray-600">
                  {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Progress Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Today's Progress</h3>
          <span className="text-sm text-gray-600 mt-1 sm:mt-0">
            {localStats.todayCompleted} of {habits?.length || 0} habits completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 shadow-inner">
          <div
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-4 rounded-full transition-all duration-700 ease-out shadow-md"
            style={{ width: `${insights.todayProgress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>0%</span>
          <span className="font-medium text-indigo-600">{insights.todayProgress}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Insights Cards - Updated to match theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Award className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium opacity-90 uppercase tracking-wide">Best Category</span>
          </div>
          <div className="text-xl font-bold mb-1">{insights.bestCategory}</div>
          <div className="text-sm opacity-80">Highest success rate</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl p-6 text-white shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium opacity-90 uppercase tracking-wide">Best Day</span>
          </div>
          <div className="text-xl font-bold mb-1">{insights.bestDay}</div>
          <div className="text-sm opacity-80">Most productive day</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium opacity-90 uppercase tracking-wide">Momentum</span>
          </div>
          <div className="text-xl font-bold mb-1">
            {localStats.currentStreak > 0 ? `${localStats.currentStreak} Day Streak! 🔥` : 'Ready to Start! 💪'}
          </div>
          <div className="text-sm opacity-80">
            {localStats.currentStreak > 0 ? 'Keep the momentum going!' : 'Your journey begins today'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStats;
