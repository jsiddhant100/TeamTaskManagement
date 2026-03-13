const API_BASE_URL = 'http://localhost:3000';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const fetchTasks = async (search?: string): Promise<Task[]> => {
  const url = search ? `${API_BASE_URL}/tasks?search=${encodeURIComponent(search)}` : `${API_BASE_URL}/tasks`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  const result: ApiResponse<Task[]> = await response.json();
  return result.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  const result: ApiResponse<Task> = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create task');
  }
  return result.data;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  const result: ApiResponse<Task> = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update task');
  }
  return result.data;
};
const DELETE_AUTH_HEADER = 'x-delete-auth';
const DELETE_AUTH_SECRET = 'delete-task';

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 
      [DELETE_AUTH_HEADER]: DELETE_AUTH_SECRET 
    },
  });
  if (!response.ok) {
    const result: ApiResponse<null> = await response.json();
    throw new Error(result.message || 'Failed to delete task');
  }
};
