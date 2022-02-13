export const seperateSentence = (content: string): string[] => {
  if (content.length > 0) {
    return content.match(/\b(\w+)\b/g);
  }
};
