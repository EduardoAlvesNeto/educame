import bcrypt from 'bcrypt';

import { prisma, User } from '../config/database';

import { IUser } from '../interfaces/IUser';
import { BadRequestError } from '../utils/ErrorHandler';

class InstitutionModel {
  async create(institution: Omit<IUser, 'id' | 'role'>): Promise<User> {
    const emailExists = await prisma.user.findUnique({
      where: { email: institution.email }
    });

    if (emailExists) throw new BadRequestError('Email is already in use');

    const CNPJExists = await prisma.user.findUnique({
      where: { document: institution.document }
    });

    if (CNPJExists) throw new BadRequestError('CNPJ is already in use');

    const hashPassword = await bcrypt.hash(institution.password, 8);

    const createdInstitution = await prisma.user.create({
      data: {
        name: institution.name,
        email: institution.email,
        password: hashPassword,
        document: institution.document,
        role: 'INSTITUTION',
        Institution: {
          create: {}
        }
      },
    });



    return createdInstitution;
  }

}

export default new InstitutionModel();
