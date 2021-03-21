import { connect } from "react-redux";

import { Bonus, Letter } from "../../types";
import { pathToBoard, pathToStand } from "../../redux/paths";
import { StoreState } from "../../types/StoreState";
import { createLetter } from "../../utils/gameUtils";
import {
  boardFields, multipliers,
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
  multipliers: Array<Bonus | null>
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
  multipliers,
  updateLetterValues
}: Props) {

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
        onClick={lockLettersOnBoard}
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
        multipliers={multipliers}
        moveLetterOnBoard={moveLetterOnBoard}
        moveLetterFromStand={moveLetterFromStand}
      />
    </>
  );
}

const mapStateToProps = (state: StoreState): StateProps => {
  return {
    boardFields: boardFields(pathToBoard(state)),
    multipliers: multipliers(pathToBoard(state)),
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
