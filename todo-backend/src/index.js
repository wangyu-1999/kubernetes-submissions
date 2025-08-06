import app from './app.js';
import { connectToDatabase } from './db/db.js';
import { initializeDatabase } from './db/init.js';
import config from './utils/config.js';
import logger from './utils/logger.js';

await connectToDatabase();
await initializeDatabase();

app.listen(config.PORT, config.HOST, () => {
  logger.info(`Server is running on http://${config.HOST}:${config.PORT}`);
});
