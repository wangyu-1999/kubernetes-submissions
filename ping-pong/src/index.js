import app from './app.js';
import config from './utils/config.js';
import { initializeDatabase } from './utils/db.js';

initializeDatabase().then(() => {
  app.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
  });
});
