import { sequelize } from '../db/db.js';
export const healthz = async (_req, res) => {
  try {
    await sequelize.query('SELECT 1');
    res.status(200).send('OK');
  } catch {
    res.status(503).send('ERROR');
  }
};
