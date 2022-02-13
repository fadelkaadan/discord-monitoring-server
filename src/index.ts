import { Message } from "discord.js";
import { start } from "./server";
import { discord } from "./providers/discord";
import flaggedMessagesController from "./controllers/flaggedMessages.controller";
import { isMessageHarmful } from "./utils/checkMessage";
import { STATUS_ENUM } from "./common/types/message.types";
import messagesController from "./controllers/messages.controller";
import { getCensoredWords } from "./controllers/censoredWords.controller";

let censoredWords: any[] = [];

discord.client.on("ready", () => {
  console.log(`Logged in as ${discord.client.user?.tag}!`);

  getCensoredWords((data: any) => (censoredWords = data));

  discord.client.on("message", (msg: Message) => {
    if (censoredWords.length > 0) {
      const status = isMessageHarmful(msg.content, censoredWords);
      if (status === STATUS_ENUM.FLAG) {
        flaggedMessagesController.addFlaggedMessage(msg);
      } else if (status === STATUS_ENUM.HARMFUL) {
        messagesController.deleteHarmfulMessage(msg.id);
      } else {
        console.log("SAFE");
      }
    }
  });
});

start();
discord.client.login(process.env.DISCORD_KEY);
