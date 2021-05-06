import Discord, { Channel, Client, Message, TextChannel } from "discord.js";
import dotenv from "dotenv";
import { start } from "./server";

dotenv.config();
const client: Client = new Discord.Client();

const minutes: number = 1000 * 60;

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  setInterval(() => {
    const channel: Channel | undefined = client.channels.cache.get(
      `839657921553236020`
    );
    (channel as TextChannel)?.send("test");
  }, minutes);

  client.on("message", (msg: Message) => {
    if (msg.author !== client.user) {
      msg.reply(msg.author.username);
    }
  });
});

start();
client.login(process.env.TOKEN);
