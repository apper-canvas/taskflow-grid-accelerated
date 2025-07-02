import { useState, useEffect } from 'react';
import categoryService from '@/services/api/categoryService';
import { toast } from 'react-toastify';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success('Category created successfully!');
      return newCategory;
    } catch (err) {
      toast.error('Failed to create category');
      throw err;
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      const updatedCategory = await categoryService.update(id, updates);
      setCategories(prev => prev.map(category => 
        category.Id === parseInt(id) ? updatedCategory : category
      ));
      toast.success('Category updated successfully');
      return updatedCategory;
    } catch (err) {
      toast.error('Failed to update category');
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(category => category.Id !== parseInt(id)));
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error('Failed to delete category');
      throw err;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};