import { STATUS_ENUM } from "../common/types/message.types";
import stringSimilarity from "string-similarity";

const seperateSentence = (content: string): string[] => {
  if (content.length > 0) {
    return content.match(/\b(\w+)\b/g);
  }
};

export const isMessageHarmful = (
  content: string,
  bannedWords: string[]
): STATUS_ENUM => {
  const wordsInContent = seperateSentence(content);
  let status = STATUS_ENUM.SAFE;

  for (const bannedWord of bannedWords) {
    for (const word of wordsInContent) {
      const similarityRate = stringSimilarity.compareTwoStrings(
        bannedWord,
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
