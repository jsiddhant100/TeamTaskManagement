import express, { Request, Response, NextFunction } from 'express'
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController'

const taskRoute = express.Router()

const DELETE_AUTH_HEADER = 'x-delete-auth';
const DELETE_AUTH_SECRET = 'delete-task';

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers[DELETE_AUTH_HEADER];
    
    if (req.method === 'DELETE' && authHeader !== DELETE_AUTH_SECRET) {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized: Missing or invalid security header for deletion.'
        });
    }
    next();
}

taskRoute.get('/', getTasks)
taskRoute.get('/:id', getTaskById)
taskRoute.post('/', createTask)
taskRoute.put('/:id', verifyAuth, updateTask)
taskRoute.delete('/:id', verifyAuth, deleteTask)

export default taskRoute
