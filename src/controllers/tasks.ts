import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import TaskRequestDTO from '../models/taskRequestDTO';
import TaskResponseDTO from '../models/taskResponseDTO';

interface AuthenticatedRequest extends Request {
    user?: { id: string; email: string };
}

export async function createTask(req: AuthenticatedRequest, res: Response) {
    try {
        const taskRequestDTO: TaskRequestDTO = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated' });
            return;
        }

        if (taskRequestDTO.userId && taskRequestDTO.userId !== userId) {
            res.status(403).json({ error: 'Forbidden: Cannot create task for another user' });
            return;
        }

        const taskWithUserId: TaskRequestDTO = { ...taskRequestDTO, userId };

        const taskResponseDTO: TaskResponseDTO = await taskService.createTask(taskWithUserId);
        res.status(201).json(taskResponseDTO);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export async function getTasks(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated' });
            return;
        }

        const tasks: TaskResponseDTO[] = await taskService.getUserTasks(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function completeTask(req: AuthenticatedRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated' });
            return;
        }

        const taskResponseDTO = await taskService.completeTask(id, userId);

        res.json(taskResponseDTO);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export  async function deleteTask(req: AuthenticatedRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated' });
            return;
        }

        const taskResponseDTO = await taskService.deleteTask(id, userId);

        res.json(taskResponseDTO);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}