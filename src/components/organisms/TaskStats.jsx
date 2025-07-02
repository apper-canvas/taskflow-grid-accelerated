import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import ProgressBar from '@/components/molecules/ProgressBar';
import { useTaskStats } from '@/hooks/useTaskStats';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const TaskStats = ({ className = '' }) => {
  const { stats, loading, error, loadStats } = useTaskStats();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadStats} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${className}`}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon="List"
          color="primary"
        />
        
        <StatCard
          title="Active Tasks"
          value={stats.active}
          icon="Clock"
          color="warning"
        />
        
        <StatCard
          title="Completed"
          value={stats.completed}
          icon="CheckCircle"
          color="success"
        />
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Overall Progress
          </h3>
          <p className="text-sm text-gray-600">
            Track your task completion progress
          </p>
        </div>
        
        <ProgressBar
          value={stats.completed}
          max={stats.total}
          size="lg"
        />
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold gradient-text">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{stats.active}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskStats;