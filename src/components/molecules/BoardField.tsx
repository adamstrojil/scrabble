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
  canMove: boolean;
  bonus?: Bonus | null;
};

export function BoardField({
  moveLetterOnBoard,
  moveLetterFromStand,
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

  const triple = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: " 1rem",
        color: "#7bca7e",
      }}
    >
      <span>3x</span>
      <span>letter</span>
    </div>
  );

  const tripleWord = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: " 1rem",
        color: "#00bb07",
      }}
    >
      <span>3x</span>
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
      {!currentValue && bonus === "triple-letter" ? triple : ""}
      {!currentValue && bonus === "triple-word" ? tripleWord : ""}
    </Field>
  );
}
