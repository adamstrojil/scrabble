import React from "react";

import { BoardType, Bonus } from "../../types";
import { BoardField } from "../molecules";
import { BoardRowContainer } from "../atoms";

type Props = {
  fields: BoardType;
  moveLetterOnBoard: (from: number, to: number) => void;
  moveLetterFromStand: (from: number, to: number) => void;
  applyBonus: (coordinate: number, bonus: Bonus) => void;
  // moveLetterToStand: (from: number, to: number) => void;
};

const NUMBER_OF_ROWS = 15;
const FIELDS_PER_ROW = 15;
const ROWS = Array(NUMBER_OF_ROWS).fill(false);

export function Board({ fields, moveLetterOnBoard, moveLetterFromStand, applyBonus }: Props) {
  return (
    <div style={{ margin: "50px" }}>
      {ROWS.map((_row, rowIndex) => (
        <BoardRowContainer key={rowIndex}>
          {fields
            .slice(
              rowIndex * NUMBER_OF_ROWS,
              rowIndex * NUMBER_OF_ROWS + FIELDS_PER_ROW
            )
            .map((letter, fieldIndex) => (
              <BoardField
              applyBonus={applyBonus}
                canMove={false}
                key={fieldIndex}
                moveLetterOnBoard={moveLetterOnBoard}
                moveLetterFromStand={moveLetterFromStand}
                coordinate={rowIndex * NUMBER_OF_ROWS + fieldIndex}
                bonus={(rowIndex * NUMBER_OF_ROWS + fieldIndex) % 11 === 0 ? "double-letter" : (rowIndex * NUMBER_OF_ROWS + fieldIndex) === 2  ? "double-word" : "none"}
              >
                {letter}
              </BoardField>
            ))}
        </BoardRowContainer>
      ))}
    </div>
  );
}
