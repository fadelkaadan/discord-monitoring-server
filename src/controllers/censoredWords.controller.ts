import { Request, Response } from "express";
import { discord } from "../providers/discord";
import docClient from "../docClient";
import { v4 as uuidv4 } from "uuid";

class censoredWordsController {
  getCensoredWords = async (req: Request, res: Response) => {
    try {
      const params = {
        TableName: "censored-words",
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

  addCensoredWord = async (req: Request, res: Response) => {
    const params = {
      TableName: "flagged-messages",
      Item: {
        id: uuidv4(),
        word: req.body.word,
      },
    };

    console.log("Adding a new item to the censored words list...");
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
