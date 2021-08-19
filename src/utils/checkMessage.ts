export const checkMessage = (content: string): Boolean => {
  const words: string[] = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
  ];

  for (let i = 0; i < words.length; i++) {
    if (content.includes(words[i])) return true;
  }

  return false;
};
