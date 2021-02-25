
export type Coordinates = {
  row: number,
  col: number,
}

export type Letter = {
  letter: string;
  canMove: boolean;
  value: number;
}

export type BoardRow = Array<Letter>;
export type BoardType = Array<BoardRow>;