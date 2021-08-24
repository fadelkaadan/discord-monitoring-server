import { Request, Response } from "express";
import { discord } from "../providers/discord";

class messagesController {
  getMessages = async (req: Request, res: Response) => {
    try {
      const messages = await discord.getMessages();

      res.status(200).json({
        status: "successfully fetched wtf",
        data: messages,
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  deleteMessage = async (req: Request, res: Response) => {
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
}

export default new messagesController();
