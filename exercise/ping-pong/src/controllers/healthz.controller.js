import { pool } from '../utils/db.js';
export const healthz = async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('OK');
  } catch {
    res.status(503).send('ERROR');
  }
};
