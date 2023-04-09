import { Operation } from '../../database';
import { NotFoundError } from '../utils/ErrorHandler';

class ClassesRepository {
    async findAll(institution_id) {
        const rows = await Operation('SELECT * FROM classrooms WHERE institution_id = $1',[institution_id]);
        return rows;
    }

    async findById(institution_id, id) {
        const [row] = await Operation('SELECT * FROM classrooms WHERE institution_id = $1 AND id = $2', [institution_id, id]);

        if(!row) throw new NotFoundError('Classroom not found');

        return row;
    }

    async create(institution_id) {
        const [institutionExists] = await Operation('SELECT * FROM institutions WHERE id = $1', [institution_id]);

        if(!institutionExists) throw new NotFoundError('Institution not found');

        const [row] = await Operation('INSERT INTO classrooms(institution_id) VALUES($1)', [institution_id]);
        return row;
    }

    async findByIdAndUpdate(institution_id, id, {teacher_id, subject_id}) {
        const [classRoomExists] = await Operation('SELECT * FROM classrooms WHERE institution_id = $1 AND id = $2', [institution_id, id]);

        if(!classRoomExists) throw new NotFoundError('Classroom not found');

        if(!teacher_id) teacher_id = classRoomExists.teacher_id;
        if(!subject_id) subject_id = classRoomExists.subject_id;

        const [row] = await Operation('UPDATE classrooms SET teacher_id = $1 subject_id = $2 WHERE institution_id = $3 AND id = $4 RETURNING *', [teacher_id, subject_id, institution_id, id]);
        return row;
    }

    async findByIdAndDelete(institution_id, id) {
        const [classRoomExists] = await Operation('SELECT * FROM classrooms WHERE institution_id = $1 AND id = $2', [institution_id, id]);

        if(!classRoomExists) throw new NotFoundError('User not found');

        const [row] = await Operation('DELETE FROM classrooms WHERE id = $1', [id]);
        return row;
    }
}

export default new ClassesRepository();
