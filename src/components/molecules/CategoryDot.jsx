import React from 'react';
import { getCategoryColor } from '@/utils/taskUtils';

const CategoryDot = ({ color, size = 'sm', className = '' }) => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div
      className={`${sizes[size]} rounded-full ${className}`}
      style={getCategoryColor(color)}
    />
  );
};

export default CategoryDot;