import cors from 'cors';
import express from 'express';

import requestLogger from './middleware/request-logger.js';
import unknownEndpoint from './middleware/unknown-endpoint.js';
import apiRoutes from './routes/api.routes.js';
import healthzRoutes from './routes/healthz.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, World!' });
});
app.use('/api', apiRoutes);
app.use('/', healthzRoutes);

app.use(unknownEndpoint);

export default app;
