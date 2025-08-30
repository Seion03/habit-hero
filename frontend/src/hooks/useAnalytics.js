import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [dayStats, setDayStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [overviewData, categoryData, dayData] = await Promise.all([
        apiService.fetchAnalytics(),
        apiService.fetchCategoryStats(),
        apiService.fetchDayStats()
      ]);
      
      setAnalytics(overviewData);
      setCategoryStats(categoryData);
      setDayStats(dayData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { 
    analytics, 
    categoryStats, 
    dayStats, 
    loading, 
    refetch: fetchAnalytics 
  };
};
