import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import FilterDropdown from '@/components/molecules/FilterDropdown';
import Button from '@/components/atoms/Button';
import { useCategories } from '@/hooks/useCategories';

const TaskFilters = ({
  filters,
  onFiltersChange,
  onClearCompleted,
  completedCount = 0,
  className = ''
}) => {
  const { categories } = useCategories();

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (e) => {
    handleFilterChange('search', e.target.value);
  };

  const handleClearAllFilters = () => {
    onFiltersChange({
      status: 'all',
      priority: 'all',
      category: 'all',
      search: ''
    });
  };

  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active Tasks' },
    { value: 'completed', label: 'Completed Tasks' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(cat => ({
      value: cat.name,
      label: cat.name
    }))
  ];

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    filters.category !== 'all' || 
    filters.search;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-card space-y-6 ${className}`}
    >
      {/* Search */}
      <div>
        <SearchBar
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FilterDropdown
          label="Status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={statusOptions}
        />
        
        <FilterDropdown
          label="Priority"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          options={priorityOptions}
        />
        
        <FilterDropdown
          label="Category"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          options={categoryOptions}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={handleClearAllFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={onClearCompleted}
            className="text-danger hover:text-red-700"
          >
            Clear {completedCount} Completed
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default TaskFilters;