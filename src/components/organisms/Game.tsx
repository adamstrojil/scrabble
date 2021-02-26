import React, { useState } from "react";

import { BoardType, Letter } from "../../types";
import { Board, Stand } from "../molecules";

type Props = {};

const createLetter = (letter: string, canMove: boolean): Letter => {
  return {
    letter,
    canMove,
    value: letter === "" ? 0 : 1,
  };
};

const STARTING_FIELDS: BoardType = Array(225).fill(createLetter("", false));

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

  const moveLetterOnBoard = (from: number, to: number) => {
    const letter = fields[from];
    let newBoard: BoardType = [...fields];
    newBoard[from] = createLetter("", false);
    newBoard[to] = letter;
    setFields(newBoard);
  };

  const moveLetterFromStand = (from: number, to: number) => {
    const letter = currentStandLetters[from];
    let newStand: BoardType = [...currentStandLetters];
    let newBoard: BoardType = [...fields];
    newStand[from] = createLetter("", false);
    newBoard[to] = letter;

    setCurrentStandLetters(newStand);
    setFields(newBoard);
  };

  const moveLetterToStand = (from: number, to: number) => {
    const letter = fields[from];
    let newStand: BoardType = [...currentStandLetters];
    let newBoard: BoardType = [...fields];
    newStand[to] = letter;
    newBoard[from] = createLetter("", false);

    setCurrentStandLetters(newStand);
    setFields(newBoard);
  };

  const moveLetterOnStand = (from: number, to: number) => {
    const letter = currentStandLetters[from];
    let newStand: BoardType = [...currentStandLetters];
    newStand[from] = createLetter("", false);
    newStand[to] = letter;
    setCurrentStandLetters(newStand);
  };

  const lockBoardLetters = () => {
    let lockedFields = [...fields];
    lockedFields.forEach((field) => {
      field.canMove = false;
    });
    setFields(lockedFields);
  };

  return (
    <>
      <Board
        fields={fields}
        moveLetterOnBoard={moveLetterOnBoard}
        moveLetterFromStand={moveLetterFromStand}
      />
      <Stand
        letters={currentStandLetters}
        moveLetterOnBoard={moveLetterFromStand}
        moveLetterToStand={moveLetterToStand}
        moveLetterOnStand={moveLetterOnStand}
      />
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
