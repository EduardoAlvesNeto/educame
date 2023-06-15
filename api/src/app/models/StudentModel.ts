import bcrypt from 'bcrypt';

import { prisma, User } from '../config/database';

import { IUser } from '../interfaces/IUser';
import { BadRequestError } from '../utils/ErrorHandler';

class StudentModel {
  async create(student: Omit<IUser, 'id' | 'role'>): Promise<User> {
    const emailExists = await prisma.user.findUnique({
      where: { email: student.email }
    });

    if (emailExists) throw new BadRequestError('Email is already in use');

    const CPFExists = await prisma.user.findUnique({
      where: { document: student.document }
    });

    if (CPFExists) throw new BadRequestError('CNPJ is already in use');

    const hashPassword = await bcrypt.hash(student.password, 8);

    const generatedEnrollment = new Date().getFullYear().toString() + Math.floor(Math.random() * (9999999 - 1000000) + 9999999);

    const createdstudent = await prisma.user.create({
      data: {
        name: student.name,
        email: student.email,
        password: hashPassword,
        document: student.document,
        role: 'STUDENT',
        Student: {
          create: {
            enrollment: generatedEnrollment
          }
        }
      },
    });



    return createdstudent;
  }
}

export default new StudentModel();
