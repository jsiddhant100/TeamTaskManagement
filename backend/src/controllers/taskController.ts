import { Request, Response } from "express";
import { tasks } from "../data/taskStore";
import { Task } from "../models/taskModel";
const { v4: uuidv4 } = require('uuid');

const sendSuccess = (res: Response, data: any, message: string = 'Success', status: number = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

const sendError = (res: Response, message: string, status: number = 400) => {
    return res.status(status).json({
        success: false,
        message
    });
};

export const getTasks = (req: Request, res: Response) => {
    const { search } = req.query;
    
    if (search) {
        const searchText = String(search).toLowerCase();
        const filteredTasks = tasks.filter((task) => 
            task.title.toLowerCase().includes(searchText) || 
            (task.description && task.description.toLowerCase().includes(searchText))
        );
        return sendSuccess(res, filteredTasks);
    }
    
    sendSuccess(res, tasks);
};

// export const getTaskById = (req: Request, res: Response) => {
//     const { id } = req.params;
//     const task = tasks.find(t => t.id === id);
    
//     if (!task) {
//         return sendError(res, 'Task Not Found', 404);
//     }
    
//     sendSuccess(res, task);
// };

export const createTask = (req: Request, res: Response) => {
    try {
        const { title, description, priority, status } = req.body;
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return sendError(res, 'Title is required and must be a non-empty string');
        }
        if (title.length > 100) {
            return sendError(res, 'Title must be 100 characters or less');
        }
        if (description && (typeof description !== 'string' || description.length > 500)) {
            return sendError(res, 'Description must be a string of 500 characters or less');
        }
        const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
        const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];

        if (priority && !validPriorities.includes(priority)) {
            return sendError(res, `Invalid Priority. Must be one of: ${validPriorities.join(', ')}`);
        }

        if (status && !validStatuses.includes(status)) {
            return sendError(res, `Invalid Status. Must be one of: ${validStatuses.join(', ')}`);
        }

        const newTask: Task = {
            id: uuidv4(),
            title: title.trim(),
            description: (description || '').trim(),
            priority: priority || 'MEDIUM',
            status: status || 'TODO'
        };

        tasks.push(newTask);
        sendSuccess(res, newTask, 'Task created successfully', 201);
    } catch (error) {
        sendError(res, 'Failed to create task', 500);
    }
};

export const updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
        return sendError(res, 'Task Not Found', 404);
    }

    const task = tasks[taskIndex];
    if (!task) return sendError(res, 'Task Not Found', 404);
    
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim().length === 0) {
            return sendError(res, 'Title must be a non-empty string');
        }
        if (title.length > 100) return sendError(res, 'Title too long');
        task.title = title.trim();
    }

    if (description !== undefined) {
        if (typeof description !== 'string' || description.length > 500) {
            return sendError(res, 'Description too long or invalid');
        }
        task.description = description.trim();
    }

    if (priority !== undefined) {
        const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
        if (validPriorities.includes(priority)) {
            task.priority = priority;
        } else {
            return sendError(res, 'Invalid Priority value');
        }
    }

    if (status !== undefined) {
        const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
        if (validStatuses.includes(status)) {
            task.status = status;
        } else {
            return sendError(res, 'Invalid Status value');
        }
    }

    sendSuccess(res, task, 'Task updated successfully');
};

export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return sendError(res, 'Task Not Found', 404);
    }

    tasks.splice(index, 1);
    sendSuccess(res, null, 'Task Deleted Successfully');
};
