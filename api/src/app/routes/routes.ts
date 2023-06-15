import { Router } from 'express';

import usersRouter from './usersRouter';
import registerRouter from './registerRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use('/', usersRouter);
router.use('/', registerRouter);
router.use('/', loginRouter);

export default router;
