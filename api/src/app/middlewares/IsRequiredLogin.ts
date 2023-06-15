// import * as cookie from 'cookie';

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../utils/ErrorHandler';
import config from '../config/dotenv';

interface RequestUser extends Request {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
}

interface Payload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export = (req: Request, res: Response, next: NextFunction) => {
  const request = req as RequestUser;

  const authorization = req.headers.authorization;

  if (!authorization) throw new UnauthorizedError('Login is required');

  const token = authorization.split(' ')[1];

  try {
    const payload = jwt.verify(token, config.secret) as Payload;

    request.userId = payload.id;
    request.userName = payload.name;
    request.userEmail = payload.email;
    request.userRole = payload.role;

    console.log(req);
    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid Token');
  }
}
