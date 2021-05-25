import Discord, { Channel, Client, Message, TextChannel } from "discord.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { start } from "./server";

dotenv.config();
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create the service used to connect to DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();
const client: Client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  client.on("message", (msg: Message) => {
    if (msg.author !== client.user) {
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
client.login(process.env.TOKEN);
