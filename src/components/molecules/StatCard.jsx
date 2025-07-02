import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({
  title,
  value,
  icon,
  color = 'primary',
  trend,
  className = ''
}) => {
const colorClasses = {
    primary: 'from-primary-500 to-secondary-500',
    secondary: 'from-secondary-500 to-accent-500',
    accent: 'from-accent-500 to-primary-500',
    success: 'from-success to-primary-500',
    warning: 'from-warning to-accent-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold gradient-text mb-2">{value}</p>
          {trend && (
            <div className="flex items-center text-sm">
              <ApperIcon 
                name={trend.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend.direction === 'up' ? 'text-success' : 'text-danger'}
              />
              <span className={`ml-1 ${trend.direction === 'up' ? 'text-success' : 'text-danger'}`}>
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;