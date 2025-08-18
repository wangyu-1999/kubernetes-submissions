import { connect, StringCodec } from "nats";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const NATS_URL = process.env.NATS_URL || "nats://localhost:4222";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const QUEUE_GROUP = process.env.QUEUE_GROUP || "broadcaster.workers";
const ENV = process.env.ENV || "staging";

const main = async () => {
  try {
    const nc = await connect({
      servers: NATS_URL,
    });

    const sc = StringCodec();
    const sub = nc.subscribe("todo.updated", {
      queue: QUEUE_GROUP,
    });

    for await (const m of sub) {
      try {
        const todo = JSON.parse(sc.decode(m.data));
        const task = todo.task;
        if (ENV === "production") {
          if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error(
              "TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set"
            );
            process.exit(1);
          }
          const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
          const payload = {
            chat_id: TELEGRAM_CHAT_ID,
            text: `New Todo has been created: ${task}`,
          };
          await axios.post(telegramApiUrl, payload);
        }
        console.log(`Published message to Telegram: ${task}`);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    }
  } catch (error) {
    console.error("Error connecting to NATS:", error);
  }
};

main();
