import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir =
  process.env.OUTPUT_FILE_PATH || path.join(__dirname, "..", "data");
const outputFile = path.join(outputDir, "output.txt");
const pingpongFile = path.join(outputDir, "pingpong.txt");
const getStringFromFile = async (_req, res) => {
  const data = await fs.readFile(outputFile, "utf-8");
  const pingpongData = await fs.readFile(pingpongFile, "utf-8");
  const [timestamp, randomString] = data.split(",");
  res.json({
    data: {
      timestamp: timestamp,
      randomString: randomString,
      pingpong: pingpongData,
    },
  });
};

export default getStringFromFile;
