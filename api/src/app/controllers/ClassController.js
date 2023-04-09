import ClassesRepository from '../repositories/ClassesRepository';
import { BadRequestError, UnauthorizedError } from '../utils/ErrorHandler';
import { validateUUID } from '../utils/Validation';

class ClassController{
    async index(req, res) {
        const { institution_id } = req.params;

        if(!validateUUID(institution_id)) throw new BadRequestError('Invalid ID');

        const classRooms = await ClassesRepository.findAll(institution_id);
        res.json(classRooms);
    }

    async show(req, res) {
        const { institution_id, id } = req.params;

        if(!validateUUID(institution_id) || !validateUUID(id)) throw new BadRequestError('Invalid ID');

        const classRoom = await ClassesRepository.findById(institution_id, id);

        res.json(classRoom);
    }

    async store(req, res) {
        const { institution_id } = req.params;

        if(!institution_id) throw new UnauthorizedError('ID is required');

        if(!validateUUID(institution_id)) throw new BadRequestError('Invalid ID');

        await ClassesRepository.create(institution_id);
        res.sendStatus(201);
    }

    async update(req, res) {
        const { institution_id, id } = req.params;
        const { teacher_id, subject_id } = req.body;

        if(!validateUUID(institution_id) || !validateUUID(id)) throw new BadRequestError('Invalid ID');

        const classRoom = await ClassesRepository.findByIdAndUpdate(institution_id, id, {teacher_id, subject_id});
        res.status(200).json(classRoom);
    }

    async delete(req, res) {
        const { institution_id, id } = req.params;

        if(!validateUUID(institution_id) || !validateUUID(id)) throw new BadRequestError('Invalid ID');

        await ClassesRepository.findByIdAndDelete(institution_id, id);
        res.sendStatus(204);
    }
}

export default new ClassController();
