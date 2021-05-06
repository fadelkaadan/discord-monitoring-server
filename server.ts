import express, { Request, Response, Express } from "express";

const server: Express = express();

server.all("/", (req: Request, res: Response) => {
  res.send("Bot is running...");
});

export function start() {
  server.listen(3000, () => {
    console.log("Server is ready...");
  });
}
