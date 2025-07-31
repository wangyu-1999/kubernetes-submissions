import { Router } from 'express';

import RandomRoute from './random.route.js';

const router = Router();

router.use('/', RandomRoute);

export default router;
