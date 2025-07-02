import React from 'react';
import Select from '@/components/atoms/Select';

const FilterDropdown = ({
  value,
  onChange,
  options,
  label,
  className = ''
}) => {
  return (
    <div className={className}>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default FilterDropdown;