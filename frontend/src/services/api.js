import { API_BASE } from '../utils/constants';
import { CATEGORIES } from '../utils/constants';

class ApiService {
  async fetchHabits() {
    const res = await fetch(`${API_BASE}/habits/`);
    if (!res.ok) throw new Error('Failed to fetch habits');
    return res.json();
  }

  async fetchCheckins() {
    const res = await fetch(`${API_BASE}/checkins/`);
    if (!res.ok) throw new Error('Failed to fetch checkins');
    return res.json();
  }

  async fetchAnalytics() {
    const res = await fetch(`${API_BASE}/analytics/overview`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  }

  async fetchCategoryStats() {
    const res = await fetch(`${API_BASE}/analytics/categories/stats`);
    if (!res.ok) throw new Error('Failed to fetch category stats');
    return res.json();
  }

  async fetchDayStats() {
    const res = await fetch(`${API_BASE}/analytics/days/stats`);
    if (!res.ok) throw new Error('Failed to fetch day stats');
    return res.json();
  }

  async fetchHabitStats(habitId) {
    const res = await fetch(`${API_BASE}/analytics/habits/${habitId}/stats`);
    if (!res.ok) throw new Error('Failed to fetch habit stats');
    return res.json();
  }

  async fetchCategories() {
    try {
      const res = await fetch(`${API_BASE}/habits/categories`);
      if (res.ok) {
        const data = await res.json();
        return data.categories || CATEGORIES;
      }
    } catch (e) {
      // ignore and fall back
    }
    // Fallback to local constants
    return CATEGORIES;
  }

  async createHabit(payload) {
    const res = await fetch(`${API_BASE}/habits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create habit');
    return res.json();
  }

  async deleteHabit(habitId) {
    const res = await fetch(`${API_BASE}/habits/${habitId}/`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete habit');
    return true;
  }

  async toggleCheckin(habitId) {
    const today = new Date().toISOString().split('T')[0];
    const res = await fetch(`${API_BASE}/checkins/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habit_id: habitId, date: today, completed: true }),
    });
    if (!res.ok) throw new Error('Failed to create checkin');
    return res.json();
  }
}

export default new ApiService();
