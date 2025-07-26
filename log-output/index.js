import crypto from "crypto";

const randomString = crypto.randomUUID();

console.log(`Application started. The generated string is: ${randomString}`);

setInterval(() => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}:${randomString}`);
}, 5000);
