import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../types/dragTypes";
import { Letter } from "../../types";
import { Field } from "../atoms";

type Props = {
  coordinate: number;
  children: Letter;
  moveLetterOnBoard: (from: number, to: number) => void;
  moveLetterFromStand: (from: number, to: number) => void;
  canMove: boolean;
};

export function BoardField({
  moveLetterOnBoard,
  moveLetterFromStand,
  coordinate,
  children: { letter, canMove },
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
    drop: () =>
      item.fromStand
        ? moveLetterFromStand(item.coordinate, coordinate)
        : moveLetterOnBoard(item.coordinate, coordinate),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: () => (letter === "" ? true : false),
  });

  drag(drop(ref));

  return (
    <Field ref={ref} isDragging={isDragging}>
      <span style={{ ...(canMove ? { color: "white" } : { color: "gray" }) }}>
        {letter}
      </span>
    </Field>
  );
}
