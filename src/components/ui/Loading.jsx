import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'tasks') {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-6 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full w-20"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                  <div className="h-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="relative">
          <div className="w-12 h-12 gradient-primary rounded-full animate-pulse"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
          />
        </div>
        <p className="text-gray-600 font-medium">Loading your tasks...</p>
      </motion.div>
    </div>
  );
};

export default Loading;