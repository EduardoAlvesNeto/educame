import UsersRepository from '../repositories/UsersRepository';
import { BadRequestError, UnauthorizedError} from '../utils/ErrorHandler';
import { validateCPF, validateUUID } from '../utils/Validation';

class UserController{
    async index(req, res) {
        const users = await UsersRepository.findAll();
        res.json(users);
    }

    async show(req, res) {
        const { id } = req.params;

        if(!validateUUID(id)) throw new BadRequestError('Invalid ID');

        const user = await UsersRepository.findById(id);

        res.json(user);
    }

    async store(req, res) {
        const { name, cpf, email, password } = req.body;

        if (!name) throw new UnauthorizedError('Name is required');
        if (!cpf) throw new UnauthorizedError('CPF is required');
        if (!email) throw new UnauthorizedError('Email is required');
        if (!password) throw new UnauthorizedError('Password is required');

        if(validateCPF(cpf)) throw new BadRequestError('Invalid CPF');

        await UsersRepository.create(name, cpf, email, password);
        res.sendStatus(201);

    }

    async update(req, res) {
        const { id } = req.params;

        if(!validateUUID(id)) throw new BadRequestError('Invalid ID');

        const { name, email, password } = req.body;

        const user = await UsersRepository.findByIdAndUpdate(id, { name, email, password });
        res.json(user);
    }

    async delete(req, res) {
        const { id } = req.params;

        if(!validateUUID(id)) throw new BadRequestError('Invalid ID');

        await UsersRepository.findByIdAndDelete(id);
        res.sendStatus(204);
    }
}

export default new UserController;
