import { Router } from 'express';

import greetingRoutes from './greeting.routes.js';

const router = Router();

router.use('/', greetingRoutes);

export default router;
