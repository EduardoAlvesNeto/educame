import { Router } from 'express';
import { RegisterController } from '../controllers/auth/RegisterController';
import IsRequiredLogin from '../middlewares/IsRequiredLogin';

const router = Router();

router.post('/register/institution', /*IsRequiredLogin,*/ new RegisterController().createInstitution); // create new institution
router.post('/register/teacher', new RegisterController().createTeacher); // create new teacher
router.post('/register/student', new RegisterController().createStudent); // create new student

export default router;
