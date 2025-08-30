import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [habitsData, checkinsData, categoriesData] = await Promise.all([
        apiService.fetchHabits(),
        apiService.fetchCheckins(),
        apiService.fetchCategories(),
      ]);
      setHabits(habitsData || []);
      setCheckins(checkinsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createHabit = async (payload) => {
    try {
      const newHabit = await apiService.createHabit(payload);
      setHabits(prev => [...prev, newHabit]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await apiService.deleteHabit(habitId);
      setHabits(prev => prev.filter(h => h.id !== habitId));
      // also remove related checkins
      setCheckins(prev => prev.filter(c => c.habit_id !== habitId));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleCheckin = async (habitId) => {
    try {
      const ci = await apiService.toggleCheckin(habitId);
      // Upsert today's checkin for this habit
      const today = new Date().toISOString().split('T')[0];
      setCheckins(prev => {
        const without = prev.filter(c => !(c.habit_id === habitId && c.date === today));
        return [...without, ci];
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    habits,
    checkins,
    categories,
    loading,
    createHabit,
    deleteHabit,
    toggleCheckin,
    refetch: fetchData,
  };
};
