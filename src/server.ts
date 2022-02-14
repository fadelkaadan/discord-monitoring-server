import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import messagesRoute from "./routes/messages.route";
import flaggedMessagesRoute from "./routes/flaggedMessages.route";
import censoredWordsRoute from "./routes/censoredWords.route";
import MonitorSys from "./providers/monitoringSys";
dotenv.config();

const server: Express = express();
export const monitorSys = new MonitorSys();

server.use(cors());
server.use(express.json());

server.use("/flaggedMessages", flaggedMessagesRoute);
server.use("/messages", messagesRoute);
server.use("/censoredWords", censoredWordsRoute);

server.all("/", (req: Request, res: Response) => {
  res.send("Bot is running 3...");
});

export function start() {
  server.listen(4000, () => {
    console.log("Server is ready...");
  });
}
