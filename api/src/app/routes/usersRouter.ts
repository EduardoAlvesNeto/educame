import { Router } from 'express';
import { UserController } from '../controllers/entities/UserController';
import IsRequiredLogin from '../middlewares/IsRequiredLogin';

const router = Router();

router.put('/users/:id', new UserController().update);
router.delete('/users/:id', new UserController().delete);


export default router;
