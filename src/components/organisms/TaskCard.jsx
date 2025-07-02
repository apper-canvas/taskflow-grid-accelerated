import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import PriorityBadge from '@/components/molecules/PriorityBadge';
import CategoryDot from '@/components/molecules/CategoryDot';
import { formatDueDate, isOverdue } from '@/utils/dateUtils';
import { useCategories } from '@/hooks/useCategories';

const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { categories } = useCategories();
  
  const category = categories.find(cat => cat.name === task.category);
  const dueDateInfo = formatDueDate(task.dueDate);
  const isTaskOverdue = isOverdue(task.dueDate);

  const handleToggleComplete = () => {
    onToggleComplete(task.Id, !task.completed);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.Id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`
        bg-white rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-200
        ${task.completed ? 'opacity-75' : ''}
        ${isTaskOverdue && !task.completed ? 'ring-2 ring-danger ring-opacity-20' : ''}
        ${className}
      `}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isExpanded ? task.description : `${task.description.slice(0, 100)}${task.description.length > 100 ? '...' : ''}`}
                  {task.description.length > 100 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Edit2"
              onClick={handleEdit}
              className="text-gray-400 hover:text-primary-600"
            />
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={handleDelete}
              className="text-gray-400 hover:text-danger"
            />
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Priority */}
            <PriorityBadge priority={task.priority} />
            
            {/* Category */}
            {category && (
              <div className="flex items-center gap-2">
                <CategoryDot color={category.color} />
                <span className="text-sm text-gray-600">{task.category}</span>
              </div>
            )}
          </div>
          
          {/* Due Date */}
          {dueDateInfo && (
            <div className={`flex items-center gap-1 text-sm font-medium ${dueDateInfo.color}`}>
              <ApperIcon 
                name={dueDateInfo.urgent ? 'AlertCircle' : 'Calendar'} 
                size={16} 
              />
              <span>{dueDateInfo.text}</span>
            </div>
          )}
        </div>

        {/* Completion Status */}
        {task.completed && task.completedAt && (
          <div className="flex items-center gap-2 text-sm text-success border-t pt-3">
            <ApperIcon name="CheckCircle" size={16} />
            <span>Completed on {new Date(task.completedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;