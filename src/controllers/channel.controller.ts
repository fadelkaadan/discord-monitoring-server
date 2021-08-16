import { constants } from "buffer";
import { TextChannel } from "discord.js";
import { Request, Response } from "express";
import discordClient from "../discordClient";
import docClient from "../docClient";

class channelController {
  getMessages = async (req: Request, res: Response) => {
    try {
      const channel = await discordClient.channels.fetch(
        `${process.env.CHANNEL_ID}`
      );

      const textChannel: TextChannel = <TextChannel>channel;
      const messages = await textChannel.messages.fetch({ limit: 25 });

      res.status(200).json({
        status: "successfully fetched",
        data: messages,
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

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

  deleteMessage = async (req: Request, res: Response) => {
    try {
      const channel = await discordClient.channels.fetch(
        `${process.env.CHANNEL_ID}`
      );

      const textChannel: TextChannel = <TextChannel>channel;
      const message = await textChannel.messages.delete(req.params.id);

      res.status(200).json({
        status: "successfully deleted",
        data: message,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

export default new channelController();
