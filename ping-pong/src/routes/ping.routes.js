import { Router } from 'express';

import { getPing, resetPing } from '../controllers/ping.controller.js';

const router = Router();

router.get('/ping', getPing);
router.post('/ping/reset', resetPing);

export default router;
