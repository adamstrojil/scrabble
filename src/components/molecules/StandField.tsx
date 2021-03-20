import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../types/dragTypes";
import { Letter } from "../../types";
import { Field } from "../atoms";

type Props = {
  index: number;
  children: Letter;
  moveLetterOnBoard: (from: number, to: number) => void;
  moveLetterToStand: (from: number, to: number) => void;
  moveLetterOnStand: (from: number, to: number) => void;
};

export function StandField({
  index,
  children: {baseValue, letter},
  moveLetterToStand,
  moveLetterOnStand,
}: Props) {
  const ref = useRef(null);

  const [{ isDragging, item }, drag] = useDrag({
    item: { type: ItemTypes.LETTER, coordinate: index, fromStand: true },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
    canDrag: () => (letter === "" ? false : true),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.LETTER,
    drop: () =>
      item.fromStand
        ? moveLetterOnStand(item.coordinate, index)
        : moveLetterToStand(item.coordinate, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: () => (letter === "" ? true : false),
  });

  drag(drop(ref));

  return (
    <Field ref={ref} isDragging={isDragging}>
      {letter}
       <div
        style={{
          position: "absolute",
          fontSize: ".8rem",
          marginTop: "2rem",
          marginLeft: "2.3rem",
        }}
      >
        {baseValue ? baseValue : ""}
      </div>
    </Field>
  );
}
