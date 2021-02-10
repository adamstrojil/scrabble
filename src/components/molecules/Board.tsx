import React from "react";

import styled from "styled-components";
import { BoardField } from "../molecules";

import { BoardType, Coordinates } from "../../types";

type Props = {
  fields: BoardType;
  moveLetter: (from: Coordinates, to: Coordinates) => void
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #191a1a; /*  */
`;

export function Board({fields,moveLetter}: Props) {
 
  return (
    <>
      <div style={{ margin: "50px" }}>
        {fields.map((
          row, rowIndex //Board
        ) => (
          <Container>
            {row.map((
              letter, colIndex  //row
            ) => (
              <BoardField moveLetter={moveLetter} coordinates={{row: rowIndex, col: colIndex}}>{letter}</BoardField>
            ))}
          </Container>
        ))}
      </div>
    </>
  );
}
