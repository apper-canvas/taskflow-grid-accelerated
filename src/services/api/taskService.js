import tasksData from '@/services/mockData/tasks.json';

class TaskService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem('taskflow_tasks')) {
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasksData));
    }
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    return [...tasks];
  }

  async getById(id) {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    return tasks.find(task => task.Id === parseInt(id));
  }

  async create(taskData) {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    
    const newId = Math.max(...tasks.map(t => t.Id), 0) + 1;
    const newTask = {
      Id: newId,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    tasks.push(newTask);
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    return { ...newTask };
  }

  async update(id, updates) {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...tasks[index],
      ...updates,
      completedAt: updates.completed && !tasks[index].completed ? new Date().toISOString() : 
                   !updates.completed && tasks[index].completed ? null : 
                   tasks[index].completedAt
    };

    tasks[index] = updatedTask;
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    return { ...updatedTask };
  }

  async delete(id) {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    const filteredTasks = tasks.filter(task => task.Id !== parseInt(id));
    localStorage.setItem('taskflow_tasks', JSON.stringify(filteredTasks));
    return true;
  }

  async deleteCompleted() {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    const activeTasks = tasks.filter(task => !task.completed);
    localStorage.setItem('taskflow_tasks', JSON.stringify(activeTasks));
    return true;
  }

  async getStats() {
    await this.delay();
    const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      active,
      completionRate
    };
  }
}

export default new TaskService();