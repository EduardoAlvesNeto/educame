import { Router } from 'express';

import institutionsRouter from './institutionsRouter';
import usersRouter from './usersRouter';
import classesRouter from './ClassesRouter';

const router = Router();

router.use('/', institutionsRouter);
router.use('/', usersRouter);
router.use('/institution', classesRouter);

export default router;
