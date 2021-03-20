import { connect } from "react-redux";

import { Bonus, Letter } from "../../types";
import { pathToBoard, pathToStand } from "../../redux/paths";
import { StoreState } from "../../types/StoreState";
import { createLetter } from "../../utils/gameUtils";
import {
  boardFields,
} from "../../features/Board/selectors";
import {
  removeLetterFromBoard,
  addLetterToBoard,
  updateLetterValues,
  lockLettersOnBoard
} from "../../features/Board/actions";
import { addLeterToStand, removeLetterFromStand } from "../../features/Stand/actions";
import { fields as standFields} from "../../features/Stand/selectors";
import { Board, Stand } from "../molecules";

type StateProps = {
  boardFields: Array<Letter>;
  standFields: Array<Letter>;
};

type DispatchProps = {
  removeLetterFromBoard: (coordinate: number) => void;
  addLetterToBoard: (coordinate: number, letter: Letter) => void;
  removeLetterFromStand:(coordinate: number) => void;
  addLeterToStand: (coordinate: number, letter: Letter) => void;
  lockLettersOnBoard: () => void;
  updateLetterValues: () => void;
};

type Props = StateProps & DispatchProps;

function GameBase({
  boardFields,
  standFields,
  removeLetterFromBoard,
  addLetterToBoard,
  removeLetterFromStand,
  addLeterToStand,
  lockLettersOnBoard,
  updateLetterValues
}: Props) {
  const applyBonus = (originCoordinate: number, bonus: Bonus) => {
  //   console.log(
  //     `---------------field ${originCoordinate} would like to apply ${bonus} bonus--------------`
  //   );

  //   const doubleLetter = (fields: any, coordinate: any): any => {
  //     const value = fields[coordinate].currentValue;
  //     const doubleValue = value * 2;
  //     fields[coordinate].currentValue = doubleValue;
  //     return fields;
  //   };

  //   switch (bonus) {
  //     case "double-letter":
  //       setFields((fields) => doubleLetter(fields, originCoordinate));
  //       break;
  //     case "double-word":
  //       setFields((fields) => doubleLetter(fields, originCoordinate));
  //       let i = 1;
  //       while (fields[originCoordinate - i]?.letter) {
  //         setFields((fields) => doubleLetter(fields, originCoordinate - i));
  //         i++;
  //       }
  //       i = 1;
  //       while (fields[originCoordinate + i]?.letter) {
  //         setFields((fields) => doubleLetter(fields, originCoordinate + i));
  //         i++;
  //       }
  //       break;
  //     case "none":
  //     default:
  //       setFields((fields) => {
  //         let newfields = [...fields];
  //         const value = newfields[originCoordinate].baseValue;
  //         newfields[originCoordinate].currentValue = value;
  //         return newfields;
  //       });
  //       break;
  //   }
   };

  const moveLetterOnBoard = (from: number, to: number) => {
    const letter = {...boardFields[from]};
    removeLetterFromBoard(from);
    addLetterToBoard(to,letter);
  };

  const moveLetterFromStand = (from: number, to: number) => {
    const letter = {...standFields[from]};
    removeLetterFromStand(from);
    addLetterToBoard(to,letter);
  };

  const moveLetterToStand = (from: number, to: number) => {
    const letter = {...boardFields[from]};
    removeLetterFromBoard(from);
    addLeterToStand(to,letter);
  };

  const moveLetterOnStand = (from: number, to: number) => {
    const letter = {...standFields[from]};
    removeLetterFromStand(from);
    addLeterToStand(to,letter);
  };

  return (
    <>
      {/* <h1>SCRABBLE</h1> */}
      <button
        onClick={updateLetterValues}
        // onClick={lockLettersOnBoard}
      >
        Confirm
      </button>
      <Stand
        letters={standFields}
        moveLetterOnBoard={moveLetterFromStand}
        moveLetterToStand={moveLetterToStand}
        moveLetterOnStand={moveLetterOnStand}
      />
      <Board
        fields={boardFields}
        moveLetterOnBoard={moveLetterOnBoard}
        moveLetterFromStand={moveLetterFromStand}
        applyBonus={applyBonus}
      />
    </>
  );
}

const mapStateToProps = (state: StoreState): StateProps => {
  return {
    boardFields: boardFields(pathToBoard(state)),
    standFields: standFields(pathToStand(state)),
  };
};

const mapDispatchToProps: DispatchProps = {
  removeLetterFromBoard,
  addLetterToBoard,
  removeLetterFromStand,
  addLeterToStand,
  lockLettersOnBoard,
  updateLetterValues
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameBase);
