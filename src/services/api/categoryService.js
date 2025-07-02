import categoriesData from '@/services/mockData/categories.json';

class CategoryService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem('taskflow_categories')) {
      localStorage.setItem('taskflow_categories', JSON.stringify(categoriesData));
    }
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    const categories = JSON.parse(localStorage.getItem('taskflow_categories') || '[]');
    return [...categories];
  }

  async getById(id) {
    await this.delay();
    const categories = JSON.parse(localStorage.getItem('taskflow_categories') || '[]');
    return categories.find(category => category.Id === parseInt(id));
  }

  async create(categoryData) {
    await this.delay();
    const categories = JSON.parse(localStorage.getItem('taskflow_categories') || '[]');
    
    const newId = Math.max(...categories.map(c => c.Id), 0) + 1;
    const newCategory = {
      Id: newId,
      ...categoryData,
      taskCount: 0
    };

    categories.push(newCategory);
    localStorage.setItem('taskflow_categories', JSON.stringify(categories));
    return { ...newCategory };
  }

  async update(id, updates) {
    await this.delay();
    const categories = JSON.parse(localStorage.getItem('taskflow_categories') || '[]');
    const index = categories.findIndex(category => category.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Category not found');
    }

    categories[index] = { ...categories[index], ...updates };
    localStorage.setItem('taskflow_categories', JSON.stringify(categories));
    return { ...categories[index] };
  }

  async delete(id) {
    await this.delay();
    const categories = JSON.parse(localStorage.getItem('taskflow_categories') || '[]');
    const filteredCategories = categories.filter(category => category.Id !== parseInt(id));
    localStorage.setItem('taskflow_categories', JSON.stringify(filteredCategories));
    return true;
  }

  async updateTaskCount(categoryName, increment = true) {
    await this.delay();
    const categories = JSON.parse(localStorage.getItem('taskflow_categories') || '[]');
    const category = categories.find(c => c.name === categoryName);
    
    if (category) {
      category.taskCount = Math.max(0, category.taskCount + (increment ? 1 : -1));
      localStorage.setItem('taskflow_categories', JSON.stringify(categories));
    }
  }
}

export default new CategoryService();