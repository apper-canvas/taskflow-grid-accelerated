import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  const inputClasses = `input-field ${error ? 'border-danger focus:ring-danger' : ''} ${icon ? 'pl-10' : ''} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={20} className="text-gray-400" />
          </div>
        )}
        <input
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-danger mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;