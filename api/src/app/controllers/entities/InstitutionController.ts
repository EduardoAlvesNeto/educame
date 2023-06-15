import { Request, Response } from 'express';

import InstitutionModel from '../../models/InstitutionModel';

import { BadRequestError } from '../../utils/ErrorHandler';
import { isValidDocument } from '../../utils/IsValid';

class InstitutionController {
  async store(req: Request, res: Response): Promise<void> {
    const { name, email, password, document } = req.body;

    if (!name) throw new BadRequestError('Name is required');
    if (!document) throw new BadRequestError('CNPJ is required');
    if (!email) throw new BadRequestError('Email is required');
    if (!password) throw new BadRequestError('Password is required');

    if (!isValidDocument(document)) throw new BadRequestError('Invalid CNPJ');

    await InstitutionModel.create({ name, email, password, document });

    res.sendStatus(201);
  }
}

export default new InstitutionController();
