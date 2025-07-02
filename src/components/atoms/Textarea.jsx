import React from 'react';

const Textarea = ({
  label,
  error,
  className = '',
  rows = 3,
  ...props
}) => {
  const textareaClasses = `input-field resize-none ${error ? 'border-danger focus:ring-danger' : ''} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={textareaClasses}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger mt-1">{error}</p>
      )}
    </div>
  );
};

export default Textarea;