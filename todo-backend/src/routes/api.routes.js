import { Router } from 'express';

import todoRoutes from './todo.routes.js';

const router = Router();

router.use('/', todoRoutes);

export default router;
