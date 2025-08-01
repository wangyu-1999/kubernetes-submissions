import { Router } from 'express';

import pingRoutes from './ping.routes.js';

const router = Router();

router.use('/', pingRoutes);

export default router;
