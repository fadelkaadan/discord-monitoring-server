import express, { Request, Response, Express } from "express";
import cors from "cors";

import channelRoute from "./routes/channel.route";

const server: Express = express();
server.use(cors());

server.use("/messages", channelRoute);

server.all("/", (req: Request, res: Response) => {
  res.send("Bot is running...");
});

export function start() {
  server.listen(4000, () => {
    console.log("Server is ready...");
  });
}
