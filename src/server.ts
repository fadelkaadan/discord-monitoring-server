import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import messagesRoute from "./routes/messages.route";
import flaggedMessagesRoute from "./routes/flaggedMessages.route";
import censoredWordsRoute from "./routes/censoredWords.route";
dotenv.config();

const server: Express = express();
server.use(cors());
server.use(express.json());

server.use("/flaggedMessages", flaggedMessagesRoute);
server.use("/messages", messagesRoute);
server.use("/censoredWords", censoredWordsRoute);

server.all("/", (req: Request, res: Response) => {
  res.send("Bot is running...");
});

export function start() {
  server.listen(process.env.PORT, () => {
    console.log("Server is ready...");
  });
}
