import React, { useState } from 'react';
import { FREQUENCIES } from '../../utils/constants';
import Button from '../common/Button';

const HabitForm = ({ categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    category: categories?.[0] || 'Health & Fitness',
    start_date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSubmit(formData);
    setFormData({
      name: '',
      frequency: 'daily',
      category: categories?.[0] || 'Health & Fitness',
      start_date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Habit Name</label>
        <input
          type="text"
          required
          placeholder="e.g., Drink Water"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {categories?.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.frequency}
          onChange={(e) => handleChange('frequency', e.target.value)}
        >
          {FREQUENCIES.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.start_date}
          onChange={(e) => handleChange('start_date', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create Habit</Button>
      </div>
    </form>
  );
};

export default HabitForm;
