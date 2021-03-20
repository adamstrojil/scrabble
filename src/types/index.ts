
export type Letter = {
  letter: string;
  canMove: boolean;
  baseValue: number;
  currentValue: number;
};

export type BoardType = Array<Letter>;


export type Bonus = "double-letter" | "triple-letter" | "double-word" | "triple-word" | "none"