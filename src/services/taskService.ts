import * as tf from '@tensorflow/tfjs';
import { Task} from '@prisma';
import * as taskData from '../data/taskData';
import TaskRequestDTO from "../models/taskRequestDTO";
import * as Mapper from "../mapper/Mapper";
import TaskResponseDTO from "../models/taskResponseDTO";

export async function createTask(taskRequestDTO: TaskRequestDTO): Promise<TaskResponseDTO> {
    const task: Omit<Task, "id"> = Mapper.TaskRequestDtoToTask(taskRequestDTO);
    if (!task.title || task.title.length < 3) {
        throw new Error('Title must be at least 3 characters long');
    }

    const newTask = await taskData.createTask(task);

    return Mapper.TaskToResponseDto(newTask);
}

export async function getUserTasks(userId: string): Promise<TaskResponseDTO[]> {
    const tasks = await taskData.getTasksByUserId(userId);
    console.log(tasks, userId);

    return tasks.map(t => Mapper.TaskToResponseDto(t));
}

export async function completeTask(id: string, userId: string): Promise<TaskResponseDTO> {
    const tasks = await taskData.getTasksByUserId(userId);

    if (!tasks.find(t => t.id === id)) {
        throw new Error('Task not found or not owned by user');
    }

    const newTask = await taskData.updateTask(id, {
        completed: true,
        completedAt: new Date(),
    })

    return Mapper.TaskToResponseDto(newTask);
}