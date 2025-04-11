import { PrismaClient } from '@prisma';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordHash1 = await hash('password1', 10);
    const passwordHash2 = await hash('password2', 10);

    const max = await prisma.user.create({
        data: {
            email: 'maxweel@gmail.com',
            username: 'maxweel',
            passwordHash: passwordHash1,
            createdAt: new Date(),
        },
    });

    const max2 = await prisma.user.create({
        data: {
            email: 'maxweel2@gmail.com',
            username: 'maxweel2',
            passwordHash: passwordHash2,
            createdAt: new Date(),
        },
    });

    const maxTask = await prisma.task.create({
        data: {
            userId: max.id,
            title: 'Task 1',
            description: 'Task 1 description',
            dueDate: new Date('2025-04-10T18:00:00Z'),
            priority: 5,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
        },
    });

    const maxTask2 = await prisma.task.create({
        data: {
            userId: max.id,
            title: 'Task 2',
            description: 'Task 2 description',
            dueDate: new Date('2025-04-15T12:00:00Z'),
            priority: 5,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
        },
    });

    const max2Task = await prisma.task.create({
        data: {
            userId: max2.id,
            title: 'Task 1',
            description: 'Task 1 description',
            dueDate: new Date('2025-04-12T09:00:00Z'),
            priority: 5,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
        },
    });

    console.log({ max, maxTask, maxTask2, max2, max2Task });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });