import { pool } from '../utils/db.js';
export const getPingPong = async (_req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('SELECT counter FROM pings WHERE id = 1');
    const currentCounter = result.rows[0].counter;
    const newCounter = currentCounter + 1;
    await client.query('UPDATE pings SET counter = $1 WHERE id = 1', [
      newCounter,
    ]);
    await client.query('COMMIT');
    res.json({ pong: newCounter });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating counter:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  } finally {
    client.release();
  }
};

export const getPing = async (_req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('SELECT counter FROM pings WHERE id = 1');
    const currentCounter = result.rows[0].counter;
    await client.query('COMMIT');
    res.json({ pong: currentCounter });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating counter:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  } finally {
    client.release();
  }
};
export const resetPing = async (_req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE pings SET counter = $1 WHERE id = 1', [0]);
    await client.query('COMMIT');
    res.json({ pong: 0 });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating counter:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  } finally {
    client.release();
  }
};
