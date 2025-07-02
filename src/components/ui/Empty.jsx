import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  type = 'tasks',
  title,
  message,
  actionText,
  onAction,
  icon = 'CheckSquare'
}) => {
  const emptyStates = {
    tasks: {
      title: 'No tasks found',
      message: 'Get started by creating your first task to stay organized and productive.',
      actionText: 'Create Your First Task',
      icon: 'CheckSquare'
    },
    search: {
      title: 'No matching tasks',
      message: 'Try adjusting your search terms or filters to find what you\'re looking for.',
      actionText: 'Clear Filters',
      icon: 'Search'
    },
    completed: {
      title: 'No completed tasks yet',
      message: 'Complete some tasks to see them here. Every small step counts!',
      actionText: 'View All Tasks',
      icon: 'CheckCircle'
    },
    category: {
      title: 'No categories created',
      message: 'Organize your tasks better by creating custom categories.',
      actionText: 'Create Category',
      icon: 'Tag'
    }
  };

  const state = emptyStates[type] || emptyStates.tasks;
  const displayTitle = title || state.title;
  const displayMessage = message || state.message;
  const displayActionText = actionText || state.actionText;
  const displayIcon = icon || state.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-12 shadow-card text-center max-w-lg mx-auto"
    >
      <div className="space-y-6">
        {/* Illustration */}
        <div className="relative">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
            <ApperIcon name={displayIcon} size={40} className="text-primary-600" />
          </div>
          
          {/* Floating elements for visual interest */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-2 left-8 w-4 h-4 gradient-accent rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-2 right-8 w-3 h-3 bg-success rounded-full opacity-20"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold gradient-text">
            {displayTitle}
          </h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            {displayMessage}
          </p>
        </div>

        {/* Action */}
        {onAction && (
          <div className="pt-4">
            <Button
              variant="primary"
              icon="Plus"
              onClick={onAction}
              className="mx-auto"
            >
              {displayActionText}
            </Button>
          </div>
        )}

        {/* Secondary Action */}
        <div className="pt-2">
          <p className="text-sm text-gray-500">
            Need help getting started?{' '}
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View Tips
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;