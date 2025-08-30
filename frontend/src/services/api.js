import { API_BASE } from '../utils/constants';

class ApiService {
  async fetchHabits() {
    const response = await fetch(`${API_BASE}/habits/`);
    return response.json();
  }

  async fetchCheckins() {
    const response = await fetch(`${API_BASE}/checkins/`);
    return response.json();
  }

  async fetchAnalytics() {
    const response = await fetch(`${API_BASE}/analytics/overview`);
    return response.json();
  }

  async fetchCategories() {
    const response = await fetch(`${API_BASE}/habits/categories`);
    const data = await response.json();
    return data.categories || [];
  }

  async createHabit(habitData) {
    const response = await fetch(`${API_BASE}/habits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habitData)
    });
    return response.ok;
  }

  async deleteHabit(habitId) {
    const response = await fetch(`${API_BASE}/habits/${habitId}`, { 
      method: 'DELETE' 
    });
    return response.ok;
  }

  async toggleCheckin(habitId, checkins) {
    const today = new Date().toISOString().split('T')[0];
    const existingCheckin = checkins.find(c => c.habit_id === habitId && c.date === today);

    if (existingCheckin) {
      const response = await fetch(`${API_BASE}/checkins/${existingCheckin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habit_id: habitId,
          date: today,
          completed: !existingCheckin.completed
        })
      });
      return response.ok;
    } else {
      const response = await fetch(`${API_BASE}/checkins/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habit_id: habitId,
          date: today,
          completed: true
        })
      });
      return response.ok;
    }
  }
}

export default new ApiService();
