import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../utils/ErrorHandler';

const prisma = new PrismaClient();

class UserModel {
    async findAll() {
        const users = await prisma.user.findMany();
        return users;
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {id}
        });

        if(!user) throw new NotFoundError('User not found');
        return user;
    }

    async checkIfUserExists(email: string, cpf: string) {
        const userWithEmail = await prisma.user.findFirst({
            where: { email }
        });

        if (userWithEmail) {
            throw new BadRequestError('Email is already in use');
        }

        const userWithCpf = await prisma.user.findFirst({
            where: { cpf }
        });

        if (userWithCpf) {
            throw new BadRequestError('CPF is already in use');
        }

        return null;
    }

    async create(name: string, email: string, password: string, cpf: string) {
        password = await bcrypt.hash(password, 8);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                cpf
            },
        });

        return { newUser: { id: newUser.id, name: newUser.name, email: newUser.email, cpf: newUser.cpf } };
    }

    async update(id: string, name: string, email: string) {
        const updatedUser = await prisma.user.update({
            data: {
                name,
                email
            },
            where: {id}
        });

        if(!updatedUser) throw new NotFoundError('User not found');

        return updatedUser;
    }

    async delete(id: string) {
        const userExists = await prisma.user.findFirst({
            where: {id}
        });

        if(!userExists) throw new NotFoundError('User not found');

        await prisma.user.delete({
            where: {id}
        });
    }
}

export default new UserModel();
