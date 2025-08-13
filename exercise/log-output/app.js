import express from 'express';
import cors from 'cors';

import router from './routes/index.js';
import healthzRoute from "./routes/healthz.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",router);
app.get('/', (_req, res) => {
  res.json({ message: 'Hello, World!' });
});
app.use("/", healthzRoute);

export default app;