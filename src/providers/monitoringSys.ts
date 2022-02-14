import { seperateSentence } from "../utils/handleMessageContent";
import { IBannedWord, STATUS_ENUM } from "../common/types/message.types";
import stringSimilarity from "string-similarity";
import { getCensoredWords } from "../controllers/censoredWords.controller";

class MonitorSys {
  private bannedWords: IBannedWord[] = [];

  constructor() {
    getCensoredWords((data: any) => {
      this.bannedWords = data;
    });
  }

  addNewWord = (word: IBannedWord) => {
    this.bannedWords.push(word);
    console.log("ADD NEW BANNED WORD");
  };

  removeWord = (wordId: string) => {
    this.bannedWords = this.bannedWords.filter((word) => word.id !== wordId);
    console.log("REMOVE A BANNED WORD");
  };

  getScannedMessageStatus = (content: string) => {
    const wordsInContent = seperateSentence(content);
    let status = STATUS_ENUM.SAFE;

    for (const bannedWord of this.bannedWords) {
      for (const word of wordsInContent) {
        const similarityRate = stringSimilarity.compareTwoStrings(
          bannedWord.word,
          word
        );
        if (similarityRate >= 0.9) {
          return STATUS_ENUM.HARMFUL;
        } else if (similarityRate >= 0.7) {
          status = STATUS_ENUM.FLAG;
        }
      }
    }

    return status;
  };
}

export default MonitorSys;
