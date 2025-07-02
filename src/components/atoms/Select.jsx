import React from 'react';

const Select = ({
  label,
  error,
  options = [],
  className = '',
  ...props
}) => {
  const selectClasses = `input-field ${error ? 'border-danger focus:ring-danger' : ''} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select className={selectClasses} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-danger mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;