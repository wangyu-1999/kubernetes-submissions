import { Router } from 'express';

import { getGreeting } from '../controllers/greeting.controller.js';

const router = Router();

router.get('/greet', getGreeting);

export default router;
