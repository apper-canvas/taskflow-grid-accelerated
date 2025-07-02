import React from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search tasks...",
  className = ''
}) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        icon="Search"
        className="pr-10"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 transition-colors duration-200"
        >
          <ApperIcon name="X" size={20} className="text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;