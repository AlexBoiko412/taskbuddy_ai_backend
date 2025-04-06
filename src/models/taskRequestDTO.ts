export default interface TaskRequestDTO {
    userId: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority?: number;
    completed?: boolean;
    createdAt?: Date;
    completedAt?: Date | null
}