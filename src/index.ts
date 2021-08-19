import { Message } from "discord.js";
import { start } from "./server";
import { discord } from "./providers/discord";
import flaggedMessagesController from "./controllers/flaggedMessages.controller";

discord.client.on("ready", () => {
  console.log(`Logged in as ${discord.client.user?.tag}!`);

  discord.client.on("message", (msg: Message) => {
    flaggedMessagesController.addFlaggedMessage(msg);
  });
});

start();
discord.client.login(process.env.TOKEN);
