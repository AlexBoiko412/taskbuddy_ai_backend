export default interface TaskResponseDTO {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    dueDate: string | null;
    priority: number;
    completed: boolean;
    createdAt: string;
    completedAt: string | null
}
