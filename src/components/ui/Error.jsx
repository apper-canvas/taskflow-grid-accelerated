import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  type = 'default'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-8 shadow-card text-center max-w-md mx-auto"
    >
      <div className="space-y-6">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-500 to-danger rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>

        {/* Error Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              variant="primary"
              icon="RefreshCw"
              onClick={onRetry}
            >
              Try Again
            </Button>
          )}
          <Button
            variant="secondary"
            icon="Home"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">
            If the problem persists, try refreshing the page or clearing your browser cache.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;