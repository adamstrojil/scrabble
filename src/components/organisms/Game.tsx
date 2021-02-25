import React, { useState } from "react";

import { BoardRow, BoardType, Coordinates, Letter } from "../../types";
import { Board, Stand } from "../molecules";

type Props = {};

const createLetter = (letter: string, canMove: boolean): Letter => {
  return {
    letter,
    canMove,
    value: letter === "" ? 0 : 1,
  };
};

const STARTING_FIELDS: BoardType = Array(15)
  .fill(false)
  .map((_row, index) =>
    index === 7
      ? [
          ...Array(5).fill(createLetter("", false)),
          createLetter("B", false),
          createLetter("I", false),
          createLetter("X", false),
          createLetter("S", false),
          createLetter("O", false),
          ...Array(5).fill(createLetter("", false)),
        ]
      : new Array(15).fill(createLetter("", false))
  );

const DEFAULT_STAND_LETTERS = [
  createLetter("O", true),
  createLetter("Z", true),
  createLetter("I", true),
  createLetter("U", true),
  createLetter("K", true),
  createLetter("Y", true),
  createLetter("Č", true),
];

export function Game(props: Props) {
  const [fields, setFields] = useState<BoardType>(STARTING_FIELDS);
  const [currentStandLetters, setCurrentStandLetters] = useState<Array<Letter>>(
    DEFAULT_STAND_LETTERS
  );

  const moveLetter = (from: Coordinates, to: Coordinates) => {
    const letter = fields[from.row][from.col];

    let newBoard: BoardType = [...fields];
    newBoard[from.row][from.col] = createLetter("", false);
    newBoard[to.row][to.col] = letter;

    setFields(newBoard);
  };

  const moveLetterFromStand = (from: number, to: Coordinates) => {
    const letter = currentStandLetters[from];

    let newStand: BoardRow = [...currentStandLetters];
    let newBoard: BoardType = [...fields];
    newStand[from] = createLetter("", false);
    newBoard[to.row][to.col] = letter;

    setCurrentStandLetters(newStand);
    setFields(newBoard);
  };

  const lockBoardLetters = () => {
    let lockedFields = [...fields]
    lockedFields.forEach((row) => {
      row.forEach((field) => {
        field.canMove = false;
      });
    });
    setFields(lockedFields);
  };

  return (
    <>
      <Board
        fields={fields}
        moveLetter={moveLetter}
        moveLetterFromStand={moveLetterFromStand}
      />
      <Stand letters={currentStandLetters} moveLetter={moveLetterFromStand} />
      <button
        onClick={() => {
          lockBoardLetters();
        }}
      >
        Confirm
      </button>
    </>
  );
}
