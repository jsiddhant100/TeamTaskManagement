import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { fetchTasks, createTask, deleteTask, updateTask } from '../services/apiService';
import type { Task } from '../services/apiService';

/**
 * This is the list of "Tools" and "Data" that every component can use.
 */
interface TaskContextType {
  tasks: Task[];           // The list of tasks
  isLoading: boolean;      // Is the app busy loading?
  error: string | null;    // If something goes wrong, we save the message here
  success: string | null;  // If something works, we save the message here
  
  isAdding: boolean;       // Is the "Add Task" form open?
  taskToEdit: Task | null; // Which task are we editing right now? (null means none)
  searchQuery: string;     // What is the user typing in the search bar?

  // The functions (Actions)
  refreshTasks: () => void;
  addNewTask: (data: any) => void;
  saveEditedTask: (id: string, data: any) => void;
  removeTask: (id: string) => void;
  
  // Simple "Toggles" to open/close forms
  setIsAdding: (val: boolean) => void;
  setTaskToEdit: (task: Task | null) => void;
  setSearchQuery: (query: string) => void;
  clearMessages: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// A simple hook to grab the tools from the box
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('Wrap your app in TaskProvider!');
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [isAdding, setIsAdding] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  const refreshTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTasks(searchQuery);
      setTasks(data);
    } catch (err: any) {
      setError("Oops! Could not get tasks.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);


  const addNewTask = async (data: any) => {
    try {
      await createTask(data);
      setSuccess("Task Added!");
      setIsAdding(false); 
      refreshTasks();      
    } catch (err: any) {
      setError("Failed to add task.");
    }
  };

  // 3. Function to Edit a Task
  const saveEditedTask = async (id: string, data: any) => {
    try {
      await updateTask(id, data);
      setSuccess("Task Updated!");
      setTaskToEdit(null); // Close the edit form
      refreshTasks();
    } catch (err: any) {
      setError("Failed to update task.");
    }
  };

  // 4. Function to Delete a Task
  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setSuccess("Task Deleted!");
      refreshTasks();
    } catch (err: any) {
      setError("Failed to delete task.");
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Load tasks automatically when the user searches
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  return (
    <TaskContext.Provider value={{
      tasks, isLoading, error, success,
      isAdding, taskToEdit, searchQuery,
      refreshTasks, addNewTask, saveEditedTask, removeTask,
      setIsAdding, setTaskToEdit, setSearchQuery, clearMessages
    }}>
      {children}
    </TaskContext.Provider>
  );
};
