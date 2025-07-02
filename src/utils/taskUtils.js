export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // Status filter
    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;
    
    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    
    // Category filter
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) return false;
    }
    
    return true;
  });
};

export const sortTasks = (tasks, sortBy = 'created') => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      
      case 'created':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
};

export const groupTasksByStatus = (tasks) => {
  return {
    active: tasks.filter(task => !task.completed),
    completed: tasks.filter(task => task.completed)
  };
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-gradient-to-r from-accent-500 to-danger text-white';
    case 'medium':
      return 'bg-gradient-to-r from-warning to-accent-500 text-white';
    case 'low':
      return 'bg-gradient-to-r from-info to-success text-white';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getCategoryColor = (color) => {
  return {
    backgroundColor: color,
    boxShadow: `0 0 0 1px ${color}20`
  };
};