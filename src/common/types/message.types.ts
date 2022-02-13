export enum STATUS_ENUM {
  SAFE,
  FLAG,
  HARMFUL,
}

export interface IBannedWord {
  id: string;
  word: string;
}