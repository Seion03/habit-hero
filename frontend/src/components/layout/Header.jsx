import React from 'react';
import { Target } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Target className="h-10 w-10 text-indigo-600" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          Habit Hero
        </h1>
      </div>
      <p className="text-gray-600 text-lg">Track your habits, build your future</p>
    </header>
  );
};

export default Header;
