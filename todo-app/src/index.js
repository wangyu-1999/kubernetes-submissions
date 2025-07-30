import app from './app.js';
import config from './utils/config.js';

app.listen(config.PORT, config.HOST, () => {
  console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});
