import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'gradient-primary text-white',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'gradient-accent text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
danger: 'bg-danger text-white',
    'priority-low': 'priority-low',
    'priority-medium': 'priority-medium',
    'priority-high': 'priority-high'
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base'
  };

  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;