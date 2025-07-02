import { toast } from 'react-toastify';

class TaskService {
  constructor() {
    this.tableName = 'task';
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "due_date" } },
          { field: { Name: "priority" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { 
            field: { Name: "category" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          { fieldName: "created_at", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response || !response.success) {
        console.error("Error fetching tasks:", response?.message || "Unknown error");
        return [];
      }

      // Map database fields to UI format
      const mappedData = (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title || item.Name || '',
        description: item.description || '',
        dueDate: item.due_date || null,
        priority: item.priority || 'medium',
        category: item.category?.Name || item.category || '',
        completed: item.completed === 'true' || item.completed === true || false,
        createdAt: item.created_at || new Date().toISOString(),
        completedAt: item.completed_at || null,
        tags: item.Tags || ''
      }));

      return mappedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "due_date" } },
          { field: { Name: "priority" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { 
            field: { Name: "category" },
            referenceField: { field: { Name: "Name" } }
          },
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
        title: item.title || item.Name || '',
        description: item.description || '',
        dueDate: item.due_date || null,
        priority: item.priority || 'medium',
        category: item.category?.Name || item.category || '',
        completed: item.completed === 'true' || item.completed === true || false,
        createdAt: item.created_at || new Date().toISOString(),
        completedAt: item.completed_at || null,
        tags: item.Tags || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(taskData) {
    try {
      const apperClient = this.getApperClient();
      
      // First, get category ID if category name is provided
      let categoryId = null;
      if (taskData.category) {
        const categoryParams = {
          fields: [{ field: { Name: "Name" } }],
          where: [
            {
              FieldName: "Name",
              Operator: "EqualTo",
              Values: [taskData.category]
            }
          ]
        };
        
        const categoryResponse = await apperClient.fetchRecords('category', categoryParams);
        if (categoryResponse.success && categoryResponse.data.length > 0) {
          categoryId = categoryResponse.data[0].Id;
        }
      }
      
      // Map UI fields to database fields (only Updateable fields)
      const dbData = {
        Name: taskData.title || taskData.Name,
        title: taskData.title || taskData.Name,
        description: taskData.description || '',
        due_date: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        priority: taskData.priority || 'medium',
        completed: 'false',
        created_at: new Date().toISOString(),
        completed_at: null,
        Tags: taskData.tags || taskData.Tags || ''
      };

      // Add category ID if found
      if (categoryId) {
        dbData.category = categoryId;
      }

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
            title: created.title || created.Name || '',
            description: created.description || '',
            dueDate: created.due_date || null,
            priority: created.priority || 'medium',
            category: taskData.category || '',
            completed: false,
            createdAt: created.created_at || new Date().toISOString(),
            completedAt: null,
            tags: created.Tags || ''
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = this.getApperClient();
      
      // Get category ID if category name is provided
      let categoryId = null;
      if (updates.category) {
        const categoryParams = {
          fields: [{ field: { Name: "Name" } }],
          where: [
            {
              FieldName: "Name",
              Operator: "EqualTo",
              Values: [updates.category]
            }
          ]
        };
        
        const categoryResponse = await apperClient.fetchRecords('category', categoryParams);
        if (categoryResponse.success && categoryResponse.data.length > 0) {
          categoryId = categoryResponse.data[0].Id;
        }
      }
      
      // Map UI fields to database fields (only Updateable fields)
      const dbUpdates = {
        Id: parseInt(id)
      };
      
      if (updates.title !== undefined) {
        dbUpdates.Name = updates.title;
        dbUpdates.title = updates.title;
      }
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate ? new Date(updates.dueDate).toISOString() : null;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.completed !== undefined) {
        dbUpdates.completed = updates.completed ? 'true' : 'false';
        dbUpdates.completed_at = updates.completed ? new Date().toISOString() : null;
      }
      if (updates.tags !== undefined) dbUpdates.Tags = updates.tags;
      if (categoryId) dbUpdates.category = categoryId;

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
            title: updated.title || updated.Name || '',
            description: updated.description || '',
            dueDate: updated.due_date || null,
            priority: updated.priority || 'medium',
            category: updates.category || '',
            completed: updated.completed === 'true' || updated.completed === true || false,
            createdAt: updated.created_at || new Date().toISOString(),
            completedAt: updated.completed_at || null,
            tags: updated.Tags || ''
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
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
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  async deleteCompleted() {
    try {
      // First get all completed tasks
      const apperClient = this.getApperClient();
      const params = {
        fields: [{ field: { Name: "Id" } }],
        where: [
          {
            FieldName: "completed",
            Operator: "EqualTo",
            Values: ["true"]
          }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success || !response.data || response.data.length === 0) {
        return true; // No completed tasks to delete
      }

      // Delete all completed tasks
      const recordIds = response.data.map(task => task.Id);
      const deleteParams = {
        RecordIds: recordIds
      };

      const deleteResponse = await apperClient.deleteRecord(this.tableName, deleteParams);
      
      if (!deleteResponse.success) {
        console.error(deleteResponse.message);
        toast.error(deleteResponse.message);
        return false;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting completed tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  async getStats() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        aggregators: [
          {
            id: "TotalTasks",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ]
          },
          {
            id: "CompletedTasks",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ],
            where: [
              {
                FieldName: "completed",
                Operator: "EqualTo",
                Values: ["true"]
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response || !response.success) {
        console.error("Error fetching task stats:", response?.message || "Unknown error");
        return {
          total: 0,
          completed: 0,
          active: 0,
          completionRate: 0
        };
      }

      let total = 0;
      let completed = 0;

      // Process aggregator results
      if (response.aggregators) {
        response.aggregators.forEach(agg => {
          if (agg.id === 'TotalTasks') {
            total = agg.value || 0;
          } else if (agg.id === 'CompletedTasks') {
            completed = agg.value || 0;
          }
        });
      }

      const active = total - completed;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        total,
        completed,
        active,
        completionRate
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching task stats:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return {
        total: 0,
        completed: 0,
        active: 0,
        completionRate: 0
      };
    }
  }
}

export default new TaskService();