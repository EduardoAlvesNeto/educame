import { Request, Response } from 'express';

import StudentModel from '../../models/StudentModel';

import { BadRequestError } from '../../utils/ErrorHandler';
import { isValidDocument } from '../../utils/IsValid';

class StudentController {
  async store(req: Request, res: Response): Promise<void> {
    const { name, email, password, document } = req.body;

    if (!name) throw new BadRequestError('Name is required');
    if (!document) throw new BadRequestError('CPF is required');
    if (!email) throw new BadRequestError('Email is required');
    if (!password) throw new BadRequestError('Password is required');

    if (!isValidDocument(document)) throw new BadRequestError('Invalid CPF');

    await StudentModel.create({ name, email, password, document });

    res.sendStatus(201);
  }
}

export default new StudentController();
