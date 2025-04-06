import {PrismaClient, Task} from "@prisma";

const prisma = new PrismaClient();

export async function createTask(data: Omit<Task, "id">): Promise<Task> {
    return prisma.task.create({
        data
    });
}

export async function getTasksByUserId(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
        where: { userId },
    });
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
    return prisma.task.update({
        where: { id },
        data,
    });
}

export async function deleteTask(id: string): Promise<Task> {
    return prisma.task.delete({
        where: { id },
    });
}