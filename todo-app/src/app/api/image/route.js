import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();

const CACHE_DIR = process.env.OUTPUT_FILE_PATH ? path.join(process.env.OUTPUT_FILE_PATH, "cache") : path.resolve("cache");
const IMAGE_PATH = path.join(CACHE_DIR, "image.jpg");
const METADATA_PATH = path.join(CACHE_DIR, "metadata.json");
const CACHE_DURATION_MS = 10 * 60 * 1000;

const fetchImageAndSaveToCache = async () => {
  const response = await fetch("https://picsum.photos/1200");
  const imageBuffer = Buffer.from(await response.arrayBuffer());
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(IMAGE_PATH, imageBuffer);
  const metadata = { timestamp: Date.now() };
  await fs.writeFile(METADATA_PATH, JSON.stringify(metadata), "utf-8");
  console.log("Successfully cached new image and metadata.");
};

export const GET = async () => {
  try {
    const metadataFile = await fs.readFile(METADATA_PATH, "utf-8");
    const metadata = JSON.parse(metadataFile);
    const imageAge = Date.now() - metadata.timestamp;
    if (imageAge > CACHE_DURATION_MS) {
      fetchImageAndSaveToCache();
    }
  } catch (error) {
    console.error("Error reading cache:", error);
    await fetchImageAndSaveToCache();
  }
  const imageBuffer = await fs.readFile(IMAGE_PATH);
  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};
