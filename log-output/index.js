import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
