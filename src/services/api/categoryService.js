import { toast } from 'react-toastify';

class CategoryService {
  constructor() {
    this.tableName = 'category';
  }

  getApperClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "task_count" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response || !response.success) {
        console.error("Error fetching categories:", response?.message || "Unknown error");
        return [];
      }

      // Map database fields to UI format
      const mappedData = (response.data || []).map(item => ({
        Id: item.Id,
        name: item.Name || '',
        color: item.color || '#6366f1',
        taskCount: item.task_count || 0,
        tags: item.Tags || ''
      }));

      return mappedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "task_count" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      // Map database fields to UI format
      const item = response.data;
      return {
        Id: item.Id,
        name: item.Name || '',
        color: item.color || '#6366f1',
        taskCount: item.task_count || 0,
        tags: item.Tags || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(categoryData) {
    try {
      const apperClient = this.getApperClient();
      
      // Map UI fields to database fields (only Updateable fields)
      const dbData = {
        Name: categoryData.name || categoryData.Name,
        color: categoryData.color || '#6366f1',
        task_count: categoryData.taskCount || 0,
        Tags: categoryData.tags || categoryData.Tags || ''
      };

      const params = {
        records: [dbData]
      };

      const response = await apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const created = successfulRecords[0].data;
          return {
            Id: created.Id,
            name: created.Name || '',
            color: created.color || '#6366f1',
            taskCount: created.task_count || 0,
            tags: created.Tags || ''
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = this.getApperClient();
      
      // Map UI fields to database fields (only Updateable fields)
      const dbUpdates = {
        Id: parseInt(id)
      };
      
      if (updates.name !== undefined) dbUpdates.Name = updates.name;
      if (updates.color !== undefined) dbUpdates.color = updates.color;
      if (updates.taskCount !== undefined) dbUpdates.task_count = updates.taskCount;
      if (updates.tags !== undefined) dbUpdates.Tags = updates.tags;

      const params = {
        records: [dbUpdates]
      };

      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updated = successfulUpdates[0].data;
          return {
            Id: updated.Id,
            name: updated.Name || '',
            color: updated.color || '#6366f1',
            taskCount: updated.task_count || 0,
            tags: updated.Tags || ''
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  async updateTaskCount(categoryName, increment = true) {
    try {
      // First get the category by name
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "task_count" } }
        ],
        where: [
          {
            FieldName: "Name",
            Operator: "EqualTo",
            Values: [categoryName]
          }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success || !response.data || response.data.length === 0) {
        return;
      }

      const category = response.data[0];
      const currentCount = category.task_count || 0;
      const newCount = Math.max(0, currentCount + (increment ? 1 : -1));

      // Update the task count
      await this.update(category.Id, { taskCount: newCount });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task count:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  }
}

export default new CategoryService();