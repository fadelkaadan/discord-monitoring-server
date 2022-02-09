import { Request, Response } from "express";
import docClient from "../docClient";
import { v4 as uuidv4 } from "uuid";

class CensoredWords {
  getAll = async (req: Request, res: Response) => {
    try {
      const params = {
        TableName: "censored-words",
      };

      docClient.scan(params, (err, data) => {
        res.status(200).json({
          status: "successfully fetched",
          data,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  createOne = async (req: Request, res: Response) => {
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
          status: "successfully added",
          data,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const params = {
        TableName: "censored-words",
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
}

export default new CensoredWords();
