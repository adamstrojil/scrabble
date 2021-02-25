import React from "react";

import { BoardField } from "../molecules";

import { BoardType, Coordinates } from "../../types";
import { BoardRowContainer } from "../atoms";

type Props = {
  fields: BoardType;
  moveLetter: (from: Coordinates, to: Coordinates) => void;
  moveLetterFromStand: (from: number, to: Coordinates) => void;
};

export function Board({ fields, moveLetter, moveLetterFromStand }: Props) {
  return (
    <>
      <div style={{ margin: "50px" }}>
        {fields.map((
          //Board
          row,
          rowIndex
        ) => (
          <BoardRowContainer key={rowIndex}>
            {row.map((
              //row
              letter,
              colIndex
            ) => (
              <BoardField
                canMove={false}
                key={colIndex}
                moveLetter={moveLetter}
                moveLetterFromStand={moveLetterFromStand}
                coordinates={{ row: rowIndex, col: colIndex }}
              >
                {letter}
              </BoardField>
            ))}
          </BoardRowContainer>
        ))}
      </div>
    </>
  );
}
