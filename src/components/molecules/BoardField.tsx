import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../types/dragTypes";
import { Bonus, Letter } from "../../types";
import { Field } from "../atoms";

type Props = {
  coordinate: number;
  children: Letter;
  moveLetterOnBoard: (from: number, to: number) => void;
  moveLetterFromStand: (from: number, to: number) => void;
  applyBonus: (coordinate: number, bonus: Bonus) => void;
  canMove: boolean;
  bonus?: Bonus;
};

export function BoardField({
  moveLetterOnBoard,
  moveLetterFromStand,
  applyBonus,
  coordinate,
  children: { letter, canMove, currentValue },
  bonus = "none",
}: Props) {
  const ref = useRef(null);

  const [{ isDragging, item }, drag] = useDrag({
    item: { type: ItemTypes.LETTER, coordinate, fromStand: false },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
    canDrag: () => (letter === "" || !canMove ? false : true),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.LETTER,
    drop: () => {
      item.fromStand
        ? moveLetterFromStand(item.coordinate, coordinate)
        : moveLetterOnBoard(item.coordinate, coordinate);
        applyBonus(coordinate, bonus)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: () => (letter === "" ? true : false),
  });

  drag(drop(ref));

  const double = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: " 1rem",
        color: "#9c5c5c",
      }}
    >
      <span>2x</span>
      <span>letter</span>
    </div>
  );

  const doubleWord = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: " 1rem",
        color: "#Fc5c5c",
      }}
    >
      <span>2x</span>
      <span>word</span>
    </div>
  );

  return (
    <Field ref={ref} isDragging={isDragging}>
      <span style={{ ...(canMove ? { color: "white" } : { color: "gray" }) }}>
        {letter}
      </span>
      <div
        style={{
          position: "absolute",
          fontSize: ".8rem",
          marginTop: "2rem",
          marginLeft: "2.3rem",
        }}
      >
        {currentValue ? currentValue : ""}
      </div>
      {!currentValue && bonus === "double-letter" ? double : ""}
      {!currentValue && bonus === "double-word" ? doubleWord : ""}
    </Field>
  );
}
