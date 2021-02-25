import React, { ReactNode, useRef } from "react";

import { ItemTypes } from "../../types/dragTypes";
import { Coordinates, Letter } from "../../types";
import { Field } from "../atoms";
import { useDrag } from "react-dnd";

type Props = {
  index: number;
  children: Letter; 
   moveLetter: (from: number, to: Coordinates) => void;
};

export function StandField({
  // moveLetter,
  index,
  children,
}: Props) {
  const ref = useRef(null);

  const [{ isDragging, /*item*/ }, drag] = useDrag({
    item: { type: ItemTypes.LETTER, index, fromStand: true},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
    canDrag: () => children.letter === "" ? false : true
  });

  //TODO:
  // const [{ isOver }, drop] = useDrop({
  //   accept: ItemTypes.LETTER,
  //   drop: () => moveLetter(item.index, { row:1, col:1 }),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
//  canDrop: () => children === "" ? true : false
  // });
  


  // drag(drop(ref));
  drag(ref);

  return <Field ref={ref} isDragging={isDragging}>{children.letter}</Field>;
  
}
