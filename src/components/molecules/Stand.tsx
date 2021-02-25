import React from "react";

import { StandField } from "../molecules";

import { BoardRow, Coordinates } from "../../types";
import { BoardRowContainer } from "../atoms";

type Props = {
  letters: BoardRow;
  moveLetter: (from: number, to: Coordinates) => void;
};

export function Stand({ letters, moveLetter }: Props) {
  return (
    <div style={{ margin: "50px" }}>
      <BoardRowContainer>
        {letters.map((letter, index) => (
          <StandField key={index} moveLetter={moveLetter} index={index}>
            {letter}
          </StandField>
        ))}
      </BoardRowContainer>
    </div>
  );
}
