import { Router } from 'express';
import ClassController from '../controllers/ClassController';

const router = Router();

router.get('/:institution_id/classes', ClassController.index);
router.get('/:institution_id/classes/:id', ClassController.show);
router.post('/:institution_id/classes', ClassController.store);
router.put('/:institution_id/classes/:id', ClassController.update);
router.delete('/:institution_id/classes/:id', ClassController.delete);

export default router;
