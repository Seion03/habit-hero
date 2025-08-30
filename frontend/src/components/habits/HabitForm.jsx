import React, { useState } from 'react';
import { FREQUENCIES } from '../../utils/constants';
import Button from '../common/Button';

const HabitForm = ({ categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    category: 'Health & Fitness',
    start_date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      frequency: 'daily',
      category: 'Health & Fitness',
      start_date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Habit Name</label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="e.g., Drink 8 glasses of water"
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
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
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
          {FREQUENCIES.map((freq) => (
            <option key={freq.value} value={freq.value}>{freq.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.start_date}
          onChange={(e) => handleChange('start_date', e.target.value)}
        />
      </div>
      
      <Button type="submit" size="full">
        Create Habit
      </Button>
    </form>
  );
};

export default HabitForm;
