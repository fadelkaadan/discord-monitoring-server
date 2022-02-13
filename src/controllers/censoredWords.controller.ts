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
        res.status(200).json(data.Items);
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  createOne = async (req: Request, res: Response) => {
    const newId = uuidv4();
    const params = {
      TableName: "censored-words",
      Item: {
        id: newId,
        word: req.body.word,
      },
    };

    try {
      docClient.put(params, (err, data) => {
        res.status(200).json({
          id: newId,
          word: req.body.word,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  getOne = async (req: Request, res: Response) => {
    var params = {
      TableName: "censored-words",
      Key: { KEY_NAME: req.params.id },
    };

    try {
      docClient.get(params, function (err, data) {
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

export const getCensoredWords = (callback: any) => {
  try {
    const params = {
      TableName: "censored-words",
    };

    docClient.scan(params, (err, data) => {
      callback(data.Items);
    });
  } catch (error) {
    console.error("ERROR");
  }
};

export default new CensoredWords();
