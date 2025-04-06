import {PrismaClient, User} from "@prisma";

const prisma = new PrismaClient();

export async function createUser(data: Omit<User, "id">): Promise<User> {
    return prisma.user.create({
        data,
    });
}

export async function getUserById(id: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
        where: { id },
    });
}

export async function findUserByEmail(email: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
        where: { email },
    });
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
        where: { id },
        data,
    });
}

export async function deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
        where: { id },
    });
}