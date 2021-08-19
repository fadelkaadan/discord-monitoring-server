import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import messagesRoute from "./routes/messages.route";
import flaggedMessagesRoute from "./routes/flaggedMessages.route";
import censoredWordsRoute from "./routes/censoredWords.route";
import usersRoute from "./routes/users.route";
dotenv.config();

const server: Express = express();
server.use(cors());

server.use("/users/banned", usersRoute);
server.use("/messages/flagged", flaggedMessagesRoute);
server.use("/messages", messagesRoute);
server.use("/words", censoredWordsRoute);

server.all("/", (req: Request, res: Response) => {
  res.send("Bot is running...");
});

export function start() {
  server.listen(4000, () => {
    console.log("Server is ready...");
  });
}
