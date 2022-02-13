import { Message } from "discord.js";
import { monitorSys, start } from "./server";
import { discord } from "./providers/discord";
import flaggedMessagesController from "./controllers/flaggedMessages.controller";
import { STATUS_ENUM } from "./common/types/message.types";
import messagesController from "./controllers/messages.controller";

discord.client.on("ready", () => {
  console.log(`Logged in as ${discord.client.user?.tag}!`);

  discord.client.on("message", (msg: Message) => {
    const status = monitorSys.getScannedMessageStatus(msg.content);
    if (status === STATUS_ENUM.FLAG) {
      flaggedMessagesController.addFlaggedMessage(msg);
    } else if (status === STATUS_ENUM.HARMFUL) {
      messagesController.deleteHarmfulMessage(msg.id);
    } else {
      console.log("SAFE");
    }
  });
});

start();
discord.client.login(process.env.DISCORD_KEY);
