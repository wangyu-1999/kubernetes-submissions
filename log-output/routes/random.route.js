import { Router } from "express";

import getTimestampAndRandomString from "../controllers/get-timestamp-and-random-string.controller.js";

const router = Router();

router.get("/random", (_req, res) => {
  const result = getTimestampAndRandomString();
  res.json({ data: result });
});

export default router;
