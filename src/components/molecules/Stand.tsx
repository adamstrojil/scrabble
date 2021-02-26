import React from "react";

import { StandField } from "../molecules";

import { Letter } from "../../types";
import { BoardRowContainer } from "../atoms";

type Props = {
  letters: Array<Letter>;
  moveLetterOnBoard: (from: number, to: number) => void;
  moveLetterToStand: (from: number, to: number) => void;
  moveLetterOnStand: (from: number, to: number) => void;
};

export function Stand({
  letters,
  moveLetterOnBoard,
  moveLetterToStand,
  moveLetterOnStand,
}: Props) {
  return (
    <div style={{ margin: "50px" }}>
      <BoardRowContainer>
        {letters.map((letter, index) => (
          <StandField
            key={index}
            moveLetterOnBoard={moveLetterOnBoard}
            moveLetterToStand={moveLetterToStand}
            moveLetterOnStand={moveLetterOnStand}
            index={index}
          >
            {letter}
          </StandField>
        ))}
      </BoardRowContainer>
    </div>
  );
}
