// Use env when provided; otherwise default to same-origin /api (works with host Nginx reverse proxy)
export const API_BASE = (process.env.REACT_APP_API_URL || '/api').replace(/\/$/, '');

export const CATEGORIES = [
  'Health & Fitness',
  'Mental Health',
  'Productivity',
  'Learning',
  'Social',
  'Creative',
  'Finance',
  'Other'
];

export const FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' }
];

export const TABS = [
  { key: 'habits', label: 'My Habits', icon: 'Target' },
  { key: 'analytics', label: 'Analytics', icon: 'BarChart3' }
];
