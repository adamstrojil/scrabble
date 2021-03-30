import { connect } from "react-redux";

import { Bonus, Letter } from "../../types";
import { pathToBoard, pathToLetterBag, pathToStand } from "../../redux/paths";
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
import { resetLetterBag,removeFirstLetterFromLetterBag } from "../../features/LetterBag/actions";
import { firstLetter, letters } from "../../features/LetterBag/selectors";

type StateProps = {
  boardFields: Array<Letter>;
  standFields: Array<Letter>;
  letterBagLetters: Array<Letter>;
  multipliers: Array<Bonus | null>
  firstLetterInBag: Letter;
};

type DispatchProps = {
  removeLetterFromBoard: (coordinate: number) => void;
  addLetterToBoard: (coordinate: number, letter: Letter) => void;
  removeLetterFromStand:(coordinate: number) => void;
  addLeterToStand: (coordinate: number, letter: Letter) => void;
  lockLettersOnBoard: () => void;
  updateLetterValues: () => void;
  resetLetterBag: () => void;
  removeFirstLetterFromLetterBag: () => void;
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
  updateLetterValues,
  resetLetterBag,
  letterBagLetters,
  removeFirstLetterFromLetterBag,
  firstLetterInBag,
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
      {letterBagLetters.map(letter => `${letter.letter}, `)}
      <br />
      <button
        onClick={lockLettersOnBoard}
      >
        Confirm
      </button>
      <button
        onClick={resetLetterBag}
      >
        resetLetterBag
      </button>
      <button
        onClick={removeFirstLetterFromLetterBag}
      >
        remove first letter from bag
      </button>
      <button
        onClick={()=>alert(firstLetterInBag.letter)}
      >
        give me letter from bag!
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
    letterBagLetters: letters(pathToLetterBag(state)),
    firstLetterInBag: firstLetter(pathToLetterBag(state)),
  };
};

const mapDispatchToProps: DispatchProps = {
  removeLetterFromBoard,
  addLetterToBoard,
  removeLetterFromStand,
  addLeterToStand,
  lockLettersOnBoard,
  updateLetterValues,
  resetLetterBag,
  removeFirstLetterFromLetterBag,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameBase);
