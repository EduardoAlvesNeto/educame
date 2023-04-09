import InstitutionsRepository from '../repositories/InstitutionsRepository';
import { UnauthorizedError, BadRequestError } from '../utils/ErrorHandler';
import { validateCNPJ, validateUUID } from '../utils/Validation';

class InstitutionController{
    async index(req, res) {
        const institutions = await InstitutionsRepository.findAll();
        res.json(institutions);
    }

    async show(req, res) {
        const { id } = req.params;

        if(!validateUUID(id)) throw new BadRequestError('Invalid ID');

        const institution = await InstitutionsRepository.findById(id);

        res.json(institution);
    }

    async store(req, res) {
        const { name, cnpj } = req.body;

        if(!name) throw new UnauthorizedError('Name is required');
        if(!cnpj) throw new UnauthorizedError('CNPJ is required');

        if(!validateCNPJ(cnpj)) throw new BadRequestError('Invalid CNPJ');

        await InstitutionsRepository.create(name, cnpj);
        res.sendStatus(201);
    }

    async update(req, res) {
        const { id } = req.params;

        if(!validateUUID(id)) throw new BadRequestError('Invalid ID');

        const { name } = req.body;

        const institution = await InstitutionsRepository.findByIdAndUpdate(id, { name });
        res.status(200).json(institution);
    }

    async delete(req, res) {
        const { id } = req.params;

        if(!validateUUID(id)) throw new BadRequestError('Invalid ID');

        await InstitutionsRepository.findByIdAndDelete(id);
        res.sendStatus(204);
    }
}

export default new InstitutionController();
