import { Server } from "./Server";

if (!process.env.HOST) {
  throw new Error("environment variable HOST is required.");
}
if (!process.env.PORT) {
  throw new Error("environment variable PORT is required.");
}

new Server()
  .bootUp(process.env.HOST, Number.parseInt(process.env.PORT, 10))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
