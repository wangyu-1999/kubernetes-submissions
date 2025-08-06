import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

console.log({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pings (
        id SERIAL PRIMARY KEY,
        counter INTEGER NOT NULL
      );
    `);

    const result = await pool.query('SELECT COUNT(*) FROM pings');
    if (result.rows[0].count === '0') {
      await pool.query('INSERT INTO pings (counter) VALUES (0)');
      console.log('Database initialized with counter at 0.');
    } else {
      console.log('Database already initialized.');
    }
  } catch (err) {
    console.error('Error initializing database:', err.stack);
    process.exit(1);
  }
};
