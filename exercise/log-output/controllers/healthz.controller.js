import dotenv from "dotenv";

dotenv.config();

const pingpongUrl = new URL("ping", process.env.PING_PONG_URL);
export const healthz = async (_req, res) => {
  try {
    const response = await fetch(pingpongUrl);
    if (!response.ok) {
      res.status(500).send("ERROR");
      return;
    }
    res.status(200).send("OK");
  } catch {
    res.status(500).send("ERROR");
  }
};
