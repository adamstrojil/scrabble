import React, { ReactNode, useRef } from "react";

import { ItemTypes } from "../../types/dragTypes";
import { Coordinates } from "../../types";
import { Field } from "../atoms";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  coordinates: Coordinates;
  children: ReactNode;
  moveLetter: (from: Coordinates, to: Coordinates) => void;
};

export function BoardField({
  moveLetter,
  coordinates,
  coordinates: { row, col },
  children,
}: Props) {
  const ref = useRef(null);

  const [{ isDragging, item }, drag] = useDrag({
    item: { type: ItemTypes.LETTER, coordinates: coordinates },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.LETTER,
    drop: () => moveLetter(item.coordinates, { row, col }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return <Field ref={ref} isDragging={isDragging}>{children}</Field>;
}
