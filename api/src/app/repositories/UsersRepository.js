import { Operation } from '../../database/';
import { NotFoundError, UnauthorizedError } from '../utils/ErrorHandler';

class UsersRepository{
    async findAll() {
        const rows = await Operation('SELECT * FROM users');
        return rows;
    }

    async findById(id) {
        const [row] = await Operation('SELECT * FROM users WHERE id = $1', [id]);

        if(!row) throw new NotFoundError('User not found');

        return row;
    }

    async create(name, cpf, email, password) {
        const [userExists] = await Operation('SELECT * FROM users WHERE email = $1 OR cpf = $2', [email, cpf]);

        if(userExists?.cpf === cpf) throw new UnauthorizedError('CPF is already in use');
        if(userExists?.email === email) throw new UnauthorizedError('Email is already in use');

        const [row] = await Operation('INSERT INTO users(name, cpf, email, password) VALUES($1, $2, $3, $4)', [name, cpf, email, password]);
        return row;
    }

    async findByIdAndUpdate(id, { name, email, password }) {
        const [userExists] =  await Operation('SELECT * FROM users WHERE id = $1',[id]);

        if(!userExists) throw new NotFoundError('User not found');

        if(!name) name = userExists.name;
        if(!email) email = userExists.email;
        if(!password) password = userExists.password;

        const [row] = await Operation('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, password, id]);
        return row;
    }

    async findByIdAndDelete(id) {
        const [userExists] = await Operation('SELECT * FROM users WHERE id = $1', [id]);

        if(!userExists) throw new NotFoundError('User not found');

        const [row] = await Operation('DELETE FROM users WHERE id = $1', [id]);
        return row;
    }
}

export default new UsersRepository();
