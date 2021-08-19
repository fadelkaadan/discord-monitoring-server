import { TextChannel, Message } from "discord.js";
import { Request, Response } from "express";
import { checkMessage } from "../utils/checkMessage";
import { discord } from "../providers/discord";
import docClient from "../docClient";

class flaggedMessagesController {
  getFlaggedMessages = async (req: Request, res: Response) => {
    try {
      const params = {
        TableName: "flagged-messages",
      };

      docClient.query(params, (err, data) => {
        res.status(200).json({
          status: "successfully fetched",
          data,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  deleteFlaggedMessage = async (req: Request, res: Response) => {
    try {
      const deletedMessage = discord.deleteMessage(req.params.id);

      res.status(200).json({
        status: "successfully deleted",
        data: deletedMessage,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  addFlaggedMessage = async (msg: Message) => {
    if (msg.author !== discord.client.user && checkMessage(msg.content)) {
      const params = {
        TableName: "flagged-messages",
        Item: {
          id: msg.id,
          author: msg.author.username,
          message: msg.content,
          createdTimestamp: msg.createdTimestamp,
        },
      };

      console.log("Adding a new item to flagged messages...");
      docClient.put(params, (err, data) => {
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
  };
}

export default new flaggedMessagesController();
