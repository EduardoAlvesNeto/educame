import { Request, Response } from 'express';

import UserModel from '../models/UserModel';

import { BadRequestError} from '../utils/ErrorHandler';
import { isValidCPF, isValidUUID } from '../utils/Validation';

class UserController{
    async index(req: Request, res: Response) {
        const users = await UserModel.findAll();
        res.json(users);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        if(!isValidUUID(id)) throw new BadRequestError('Invalid ID');

        const user = await UserModel.findById(id);

        res.json(user);
    }

    async store(req: Request, res: Response) {
        const { name, email, password, cpf } = req.body;

        if (!name) throw new BadRequestError('Name is required');
        if (!cpf) throw new BadRequestError('CPF is required');
        if (!email) throw new BadRequestError('Email is required');
        if (!password) throw new BadRequestError('Password is required');

        if(!isValidCPF(cpf)) throw new BadRequestError('Invalid CPF');

        await UserModel.checkIfUserExists(email, cpf);

        await UserModel.create(name, email, password, cpf);
        res.sendStatus(201);

    }

    async update(req: Request, res: Response) {
        const { id } = req.params;

        if(!isValidUUID(id)) throw new BadRequestError('Invalid ID');

        const { name, email } = req.body;

        const user = await UserModel.update(id, name, email);
        res.json(user);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if(!isValidUUID(id)) throw new BadRequestError('Invalid ID');

        await UserModel.delete(id);
        res.sendStatus(204);
    }
}

export default new UserController;
