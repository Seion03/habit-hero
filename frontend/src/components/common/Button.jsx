import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-dashed border-gray-300',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'text-gray-400 hover:text-red-500'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
    full: 'w-full py-3'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
