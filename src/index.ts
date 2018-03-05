import { Server } from "./Server";

const host = process.env.HOST || "localhost";
const port = Number.parseInt(process.env.PORT || "2008", 10);

new Server().bootUp(host, port).catch(e => {
  console.error(e);
  process.exit(1);
});
