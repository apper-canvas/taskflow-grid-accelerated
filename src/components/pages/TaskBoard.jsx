import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TaskForm from '@/components/organisms/TaskForm';
import TaskFilters from '@/components/organisms/TaskFilters';
import TaskList from '@/components/organisms/TaskList';
import TaskStats from '@/components/organisms/TaskStats';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { useTasks } from '@/hooks/useTasks';
import { filterTasks } from '@/utils/taskUtils';

const TaskBoard = () => {
  const {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteCompletedTasks
  } = useTasks();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: ''
  });

  const filteredTasks = filterTasks(tasks, filters);
  const completedTasks = tasks.filter(task => task.completed);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setShowTaskForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleUpdateTask = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask.Id, taskData);
      setEditingTask(null);
      setShowTaskForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleToggleComplete = async (taskId, completed) => {
    await updateTask(taskId, { completed });
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleClearCompleted = async () => {
    if (window.confirm(`Are you sure you want to delete all ${completedTasks.length} completed tasks?`)) {
      await deleteCompletedTasks();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Task Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your tasks efficiently and stay productive
          </p>
        </div>
        
        <Button
          variant="primary"
          icon="Plus"
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
          className="sm:w-auto w-full"
        >
          Create Task
        </Button>
      </motion.div>

      {/* Stats Section */}
      <TaskStats />

      {/* Task Form */}
      {showTaskForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCancelEdit}
          />
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="xl:col-span-1">
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearCompleted={handleClearCompleted}
            completedCount={completedTasks.length}
          />
        </div>

        {/* Task List */}
        <div className="xl:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filters.status === 'all' && 'All Tasks'}
                  {filters.status === 'active' && 'Active Tasks'}
                  {filters.status === 'completed' && 'Completed Tasks'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="RefreshCw"
                  onClick={loadTasks}
                  className="text-gray-500 hover:text-gray-700"
                />
              </div>
            </div>

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;