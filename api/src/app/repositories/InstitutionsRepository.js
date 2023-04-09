import { Operation } from '../../database/index';
import { NotFoundError, UnauthorizedError } from '../utils/ErrorHandler';

class InstitutionsRepository{
    async findAll() {
        const rows = await Operation('SELECT * FROM institutions');
        return rows;
    }

    async findById(id) {
        const [row] = await Operation('SELECT * FROM institutions WHERE id = $1', [id]);

        if(!row) throw new NotFoundError('Institution not found');

        return row;
    }

    async create(name, cnpj) {
        const [institutionExists] = await Operation('SELECT * FROM institutions WHERE cnpj = $1', [cnpj]);

        if(institutionExists?.cnpj === cnpj) throw new UnauthorizedError('CNPJ is already in use');


        const [row] = await Operation('INSERT INTO institutions(name, cnpj) VALUES($1, $2)',[name, cnpj]);
        return row;
    }

    async findByIdAndUpdate(id, { name }) {
        const [institutionExists] = await Operation('SELECT * FROM institution WHERE id = $1', [id]);

        if(!institutionExists) throw new NotFoundError('Institution not found');

        const [row] = await Operation('UPDATE institutions SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        return row;
    }

    async findByIdAndDelete(id) {
        const [institutionExists] = await Operation('SELECT * FROM institutions WHERE id = $1', [id]);

        if(!institutionExists) throw new NotFoundError('Institution not found');

        const [row] = await Operation('DELETE FROM institutions WHERE id = $1', [id]);
        return row;
    }
}

export default new InstitutionsRepository();
