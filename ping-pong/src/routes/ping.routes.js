import { Router } from 'express';

import {
  getPingPong,
  resetPing,
  getPing,
} from '../controllers/ping.controller.js';

const router = Router();

router.get('/pingpong', getPingPong);
router.get('/ping', getPing);
router.post('/ping/reset', resetPing);

export default router;
