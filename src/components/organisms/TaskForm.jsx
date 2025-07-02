import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';
import { useCategories } from '@/hooks/useCategories';
import { formatDateInput } from '@/utils/dateUtils';

const TaskForm = ({
  task = null,
  onSubmit,
  onCancel,
  className = ''
}) => {
const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: categories.length > 0 ? categories[0].name : ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || task.Name || '',
        description: task.description || '',
        dueDate: task.dueDate ? formatDateInput(task.dueDate) : '',
        priority: task.priority || 'medium',
        category: task.category || (categories.length > 0 ? categories[0].name : '')
      });
    }
  }, [task, categories]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };
      
      await onSubmit(submitData);
      
      if (!task) {
        setFormData({
          title: '',
          description: '',
          dueDate: '',
          priority: 'medium',
          category: categories.length > 0 ? categories[0].name : ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

const categoryOptions = categories.map(cat => ({
    value: cat.name || cat.Name,
    label: cat.name || cat.Name
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-card ${className}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-text">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          {task && onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon="X"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              name="title"
              label="Task Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              error={errors.title}
              icon="Type"
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add task description..."
              rows={3}
            />
          </div>

          <div>
            <Input
              name="dueDate"
              type="datetime-local"
              label="Due Date"
              value={formData.dueDate}
              onChange={handleChange}
              icon="Calendar"
            />
          </div>

          <div>
            <Select
              name="priority"
              label="Priority"
              value={formData.priority}
              onChange={handleChange}
              options={priorityOptions}
              error={errors.priority}
            />
          </div>

          <div className="md:col-span-2">
            <Select
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
              error={errors.category}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t">
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            icon={task ? 'Save' : 'Plus'}
            className="flex-1 md:flex-none"
          >
            {task ? 'Update Task' : 'Create Task'}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;