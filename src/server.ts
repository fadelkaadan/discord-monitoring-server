import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import messagesRoute from "./routes/messages.route";
import flaggedMessagesRoute from "./routes/flaggedMessages.route";
dotenv.config();

const server: Express = express();
server.use(cors());
server.use(express.json());

server.use("/messages/flagged", flaggedMessagesRoute);
server.use("/messages", messagesRoute);

server.all("/", (req: Request, res: Response) => {
  res.send("Bot is running...");
});

export function start() {
  server.listen(4000, () => {
    console.log("Server is ready...");
  });
}
