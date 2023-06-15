import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

import { BadRequestError } from '../../utils/ErrorHandler';
import { isValidUUID } from '../../utils/IsValid';

export class UserController {

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name, email, password } = req.body;

    const updatedUser = await UserModel.update({ id, name, email, password });

    res.status(200).json(updatedUser);
  }


  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!isValidUUID(id)) throw new BadRequestError('Invalid ID');

    await UserModel.delete(id);
    res.sendStatus(204);
  }
}
