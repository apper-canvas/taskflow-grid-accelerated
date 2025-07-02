import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/organisms/TaskCard';
import Empty from '@/components/ui/Empty';
import { sortTasks } from '@/utils/taskUtils';

const TaskList = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  className = ''
}) => {
  const sortedTasks = sortTasks(tasks, 'created');

  if (tasks.length === 0) {
    return <Empty type="tasks" />;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;