import bcrypt from 'bcrypt';

import { prisma, User } from '../config/database';

import { IUser } from '../interfaces/IUser';
import { BadRequestError } from '../utils/ErrorHandler';

class TeacherModel {
  async create(teacher: Omit<IUser, 'id' | 'role'>): Promise<User> {
    const emailExists = await prisma.user.findUnique({
      where: { email: teacher.email }
    });

    if (emailExists) throw new BadRequestError('Email is already in use');

    const CPFExists = await prisma.user.findUnique({
      where: { document: teacher.document }
    });

    if (CPFExists) throw new BadRequestError('CNPJ is already in use');

    const hashPassword = await bcrypt.hash(teacher.password, 8);

    const createdTeacher = await prisma.user.create({
      data: {
        name: teacher.name,
        email: teacher.email,
        password: hashPassword,
        document: teacher.document,
        role: 'TEACHER',
        Teacher: {
          create: {}
        }
      },
    });

    return createdTeacher;
  }
}

export default new TeacherModel();
