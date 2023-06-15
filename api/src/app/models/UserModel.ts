import { prisma, User } from '../config/database';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/IUser';
import { BadRequestError, NotFoundError } from '../utils/ErrorHandler';

class UserModel {

  async findByDocument(document: string) {
    const user = await prisma.user.findUnique({
      where: { document }
    });

    if (!user) throw new NotFoundError('User not found');

    return user;
  }

  async update(user: Omit<IUser, 'document' | 'role'>): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!userExists) throw new NotFoundError('User not found');

    if (!user.email) {
      user.email = userExists.email;
    } else {
      const emailExists = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (emailExists) throw new BadRequestError('Email is already in use');
    }

    if (!user.name) user.name = userExists.name;

    if (!user.password) {
      user.password = userExists.password;
    } else {
      user.password = await bcrypt.hash(user.password, 8);
    }

    const updatedUser = await prisma.user.update({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      },
      where: { id: user.id },
    });



    return updatedUser;
  }

  async delete(id: string) {
    const userExists = await prisma.user.findFirst({
      where: { id }
    });

    if (!userExists) throw new NotFoundError('User not found');

    await prisma.user.delete({
      where: { id }
    });
  }
}

export default new UserModel();
