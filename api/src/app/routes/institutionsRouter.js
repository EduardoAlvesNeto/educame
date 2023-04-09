import { Router } from 'express';
import InstitutionController from '../controllers/InstitutionController';

const router = Router();

router.get('/institutions', InstitutionController.index);
router.get('/institutions/:id', InstitutionController.show);
router.post('/institutions', InstitutionController.store);
router.put('/institutions/:id', InstitutionController.update);
router.delete('/institutions/:id', InstitutionController.delete);

export default router;
