import { Request, Response } from "express";
import { discord } from "../providers/discord";
import { v4 as uuidv4 } from "uuid";
import docClient from "../docClient";

class censoredWordsController {
  getCensoredWords = async (req: Request, res: Response) => {
    try {
      const params = {
        TableName: "censored-words",
      };

      docClient.scan(params, (err, data) => {
        console.log(err);
        res.status(200).json({
          status: "successfully fetched",
          data,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  addCensoredWord = async (req: Request, res: Response) => {
    const params = {
      TableName: "censored-words",
      Item: {
        id: uuidv4(),
        word: req.body.word,
      },
    };

    try {
      docClient.put(params, (err, data) => {
        res.status(200).json({
          status: "successfully posted",
          data,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  deleteCensoredWord = async (req: Request, res: Response) => {
    try {
      const deletedWord = discord.deleteMessage(req.params.id);

      res.status(200).json({
        status: "successfully deleted",
        data: deletedWord,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

export default new censoredWordsController();
