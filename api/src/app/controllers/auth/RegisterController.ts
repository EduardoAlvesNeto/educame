import { Request, Response } from 'express';

import InstitutionController from '../entities/InstitutionController';
import TeacherController from '../entities/TeacherController';
import StudentController from '../entities/StudentController';

export class RegisterController {
  async createInstitution(req: Request, res: Response): Promise<void> {
    await InstitutionController.store(req, res);
  }

  async createTeacher(req: Request, res: Response): Promise<void> {
    await TeacherController.store(req, res);
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    await StudentController.store(req, res);
  }

}
