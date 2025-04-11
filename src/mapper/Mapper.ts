import { Task } from '@prisma';
import TaskRequestDTO from '../models/taskRequestDTO';
import TaskResponseDTO from '../models/taskResponseDTO';

export function TaskRequestDtoToTask(taskRequestDTO: TaskRequestDTO): Omit<Task, 'id'> {
    return {
        userId: taskRequestDTO.userId,
        title: taskRequestDTO.title,
        description: taskRequestDTO.description || null,
        dueDate: taskRequestDTO.dueDate ? new Date(taskRequestDTO.dueDate) : null,
        priority: taskRequestDTO.priority || 5,
        completed: taskRequestDTO.completed || false,
        createdAt: taskRequestDTO.createdAt || new Date(),
        completedAt: taskRequestDTO.completedAt || null,
    };
}

export function TaskToResponseDto(task: Task): TaskResponseDTO {
    return {
        id: task.id,
        userId: task.userId,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? task.dueDate.toISOString() : null,
        priority: task.priority,
        completed: task.completed,
        createdAt: task.createdAt.toISOString(),
        completedAt: task.completedAt ? task.completedAt.toISOString() : null,
    };
}