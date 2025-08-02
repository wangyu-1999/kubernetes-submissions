import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictPath = process.env.OUTPUT_FILE_PATH || path.join('..', __dirname);
const filePath = path.join(dictPath, 'pingpong.txt');

const writeToFile = async (text) => {
  try {
    await fs.writeFile(filePath, text);
  } catch (error) {
    console.error(error);
  }
};

let pong = -1;
export const getPing = (_req, res) => {
  pong += 1;
  writeToFile(pong.toString());
  res.json({ pong });
};

export const resetPing = (_req, res) => {
  pong = -1;
  writeToFile(pong.toString());
  res.json({ pong });
};
