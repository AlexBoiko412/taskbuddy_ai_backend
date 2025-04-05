import {PrismaClient} from "../generated/prisma";

const prisma = new PrismaClient()

async function main() {
    const max = await prisma.user.create({
        data: {
            email: "maxweel@gmail.com",
            createdAt: new Date(Date.now()),
            tasks: {
            },
            passwordHash: "asdawd"
        }
    })
    const max2 = await prisma.user.create({
        data: {
            email: "maxweel2@gmail.com",
            createdAt: new Date(Date.now()),
            tasks: {
            },
            passwordHash: "password"
        }
    })
    const maxTask = await prisma.task.create({
        data: {
            userId: max.id,
            createdAt: new Date(Date.now()),
            completed: false,
            dueDate: new Date(Date.now()),
            completedAt: null,
            description: "Task 1",
            title: "Task 1",
            priority: 5
        }
    })
    const maxTask2 = await prisma.task.create({
        data: {
            userId: max.id,
            createdAt: new Date(Date.now()),
            completed: false,
            dueDate: new Date(Date.now()),
            completedAt: null,
            description: "Task 2",
            title: "Task 2",
            priority: 5
        }
    })
    const max2Task = await prisma.task.create({
        data: {
            userId: max2.id,
            createdAt: new Date(Date.now()),
            completed: false,
            dueDate: new Date(Date.now()),
            completedAt: null,
            description: "Task 1",
            title: "Task 1",
            priority: 5
        }
    })
    console.log({ max, maxTask, max2Task })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })