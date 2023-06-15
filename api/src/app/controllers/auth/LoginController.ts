import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UnauthorizedError } from '../../utils/ErrorHandler';
import config from '../../config/dotenv';

import UserModel from '../../models/UserModel';

class LoginController {
  async login(req: Request, res: Response) {
    const { document, password } = req.body;

    const userExists = await UserModel.findByDocument(document);

    const checkPassword = await bcrypt.compare(password, userExists.password);

    if (!checkPassword) throw new UnauthorizedError('Incorrect Password');

    const { id, name, email, role } = userExists;

    const token = jwt.sign({
      id,
      name,
      email,
      role,
    }, config.secret, { expiresIn: '1h' });

    res.json(token);
  }
}

export default LoginController;
