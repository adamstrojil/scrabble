import React from "react";

import { BoardType, Bonus } from "../../types";
import { BoardField } from "../molecules";
import { BoardRowContainer } from "../atoms";

type Props = {
  fields: BoardType;
  moveLetterOnBoard: (from: number, to: number) => void;
  moveLetterFromStand: (from: number, to: number) => void;
  multipliers: Array<Bonus | null>;
  // moveLetterToStand: (from: number, to: number) => void;
};

const NUMBER_OF_ROWS = 15;
const FIELDS_PER_ROW = 15;
const ROWS = Array(NUMBER_OF_ROWS).fill(false);

export function Board({
  fields,
  moveLetterOnBoard,
  moveLetterFromStand,
  multipliers,
}: Props) {
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
                canMove={false}
                key={fieldIndex}
                moveLetterOnBoard={moveLetterOnBoard}
                moveLetterFromStand={moveLetterFromStand}
                coordinate={rowIndex * NUMBER_OF_ROWS + fieldIndex}
                bonus={multipliers[rowIndex * NUMBER_OF_ROWS + fieldIndex]}
              >
                {letter}
              </BoardField>
            ))}
        </BoardRowContainer>
      ))}
    </div>
  );
}
