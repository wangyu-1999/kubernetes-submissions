import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const outputDir =process.env.OUTPUT_FILE_PATH || path.join(__dirname, 'data');
const outputFile = path.join(outputDir, 'output.txt');

setInterval(async () => {
  const randomString = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  console.log(`${timestamp},${randomString}`);
  await fs.writeFile(outputFile, `${timestamp},${randomString}`, "utf-8");
}, 5000);

