import { Router } from "express";

import getTimestampAndRandomString from "../controllers/get-timestamp-and-random-string.controller.js";

const router = Router();

router.get("/random", getTimestampAndRandomString);

export default router;
