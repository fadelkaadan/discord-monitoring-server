import { Message } from "discord.js";
import { Request, Response } from "express";
import docClient from "../docClient";

class flaggedMessagesController {
  getFlaggedMessages = async (req: Request, res: Response) => {
    try {
      const params = {
        TableName: "flagged-messages",
      };

      docClient.scan(params, (err, data) => {
        res.status(200).json(data.Items);
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  deleteFlaggedMessage = async (req: Request, res: Response) => {
    try {

      const params = {
        TableName: "flagged-messages",
        Key: {
          id: req.params.id,
        },
      };

      docClient.delete(params, (err, data) => {
        res.status(200).json({
          status: "successfully deleted",
          data: data,
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  addFlaggedMessage = async (msg: Message) => {
    const params = {
      TableName: "flagged-messages",
      Item: {
        id: msg.id,
        author: msg.author.username,
        content: msg.content,
        createdTimestamp: msg.createdAt.toString(),
      },
    };

    docClient.put(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added a new item to flagged messages");
      }
    });
  };
}

export default new flaggedMessagesController();
