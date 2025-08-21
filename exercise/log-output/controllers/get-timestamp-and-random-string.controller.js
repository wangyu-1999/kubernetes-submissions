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
const pingpongUrl = new URL("ping", process.env.PING_PONG_URL);
const messageUrl = new URL("greet", process.env.GREET_URL);
const getStringFromFile = async (_req, res) => {
  const data = await fs.readFile(outputFile, "utf-8");
  const response = await fetch(pingpongUrl);
  const pingpongData = await response.json();
  const [timestamp, randomString] = data.split(",");
  const configData = await fs.readFile("/etc/config/information.txt", "utf-8");
  const messageResponse = await fetch(messageUrl);
  const messageData = await messageResponse.json();
  res.json({
    data: {
      timestamp: timestamp,
      randomString: randomString,
      pingpong: pingpongData.pong,
      fileContent: configData,
      message: messageData.message,
    },
  });
};

export default getStringFromFile;
