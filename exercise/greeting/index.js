import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/greet', (_req, res) => {
  res.json({ message: `Hello from version 2` });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});