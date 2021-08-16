import { Message } from "discord.js";
import dotenv from "dotenv";
import { start } from "./server";
import discordClient from "./discordClient";
import docClient from "./docClient";

dotenv.config();

discordClient.on("ready", () => {
  console.log(`Logged in as ${discordClient.user?.tag}!`);

  discordClient.on("message", (msg: Message) => {
    if (msg.author !== discordClient.user) {
      const params = {
        TableName: "channel-messages",
        Item: {
          id: msg.id,
          author: msg.author.username,
          message: msg.content,
          createdTimestamp: msg.createdTimestamp,
        },
      };

      console.log("Adding a new item...");
      docClient.put(params, function (err, data) {
        if (err) {
          console.error(
            "Unable to add item. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
        }
      });
    }
  });
});

start();
discordClient.login(process.env.TOKEN);
