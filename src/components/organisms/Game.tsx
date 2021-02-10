import React, { useState } from "react";

import { BoardType, Coordinates } from "../../types";
import { Letter } from "../atoms";
import { Board } from "../molecules";

type Props = {};

const STARTING_FIELDS = Array(15)
  .fill(false)
  .map((_v, index) =>
    index === 7
      ? [...Array(5).fill(<Letter value=""/>), <Letter value="Z"/>, <Letter value="A"/>, "D", "E", "K", ...Array(5).fill(<Letter value=""/>)]
      : new Array(15).fill(<Letter value=""/>)
  );

export function Game(props: Props) {
  const [fields, setFields] = useState<BoardType>(STARTING_FIELDS);

  const moveLetter = (from: Coordinates, to: Coordinates) => {
    const letter = fields[from.row][from.col];

    let newBoard: BoardType = [...fields];
    newBoard[from.row][from.col] = "";
    newBoard[to.row][to.col] = letter;

    setFields(newBoard);
  };

  return (
    <>
      <Board fields={fields} moveLetter={moveLetter}/>
    </>
  );
}