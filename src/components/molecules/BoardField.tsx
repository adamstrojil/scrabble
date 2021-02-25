import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../types/dragTypes";
import { Coordinates, Letter } from "../../types";
import { Field } from "../atoms";

type Props = {
  coordinates: Coordinates;
  children: Letter;
  moveLetter: (from: Coordinates, to: Coordinates) => void;
  moveLetterFromStand: (from: number, to: Coordinates) => void;
  canMove: boolean;
};

export function BoardField({
  moveLetter,
  moveLetterFromStand,
  coordinates,
  coordinates: { row, col },
  children: { letter, canMove },
}: Props) {
  const ref = useRef(null);

  const [{ isDragging, item }, drag] = useDrag({
    item: { type: ItemTypes.LETTER, coordinates, fromStand: false },
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
        ? moveLetterFromStand(item.index, { row, col })
        : moveLetter(item.coordinates, { row, col }),
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
