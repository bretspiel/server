import { Server as HttpServer } from "http";
import * as express from "express";
import * as cors from "cors";
import * as SocketIo from "socket.io";
import { StatusController } from "./controllers/StatusController";
import { LoungeChatController } from "./controllers/LoungeChatController";
import { User } from "./models/User";
import { CounterController } from "./controllers/CounterController";

export class Server {
  bootUp(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const app = express();
      const http = new HttpServer(app);
      const io = SocketIo(http);

      app.use(cors());

      // status routes
      app.get("/status", new StatusController().getStatus);

      const counterNamespace = io.of("/counter");
      counterNamespace.on("connect", async socket => {
        const controller = new CounterController();

        socket.emit("update", await controller.get());
        socket.on("get", async () => {
          counterNamespace.emit("update", await controller.get());
        });
        socket.on("patch", async (delta: number) => {
          counterNamespace.emit("update", await controller.patch(delta));
        });
        socket.on("delete", async () => {
          counterNamespace.emit("update", await controller.delete());
        });
      });

      // lounge-chat routes
      const loungeChatNamespace = io.of("/chat/lounge");
      loungeChatNamespace.on("connect", async socket => {
        const controller = new LoungeChatController();

        socket.emit("update", await controller.get());
        socket.on("add", async (user: User, message: string) => {
          const chatMessages = await controller.add(user, message);
          loungeChatNamespace.emit("update", chatMessages);
        });
      });

      try {
        http.listen(port, host, () => {
          console.log(`running server ${host}:${port}`);
          resolve();
        });
      } catch {
        reject();
      }
    });
  }
}
