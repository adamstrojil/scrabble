import React from "react";

type Props = {
  value: string;
};

export const Letter = ({ value }: Props) => {

  return <span >{value}</span>
};
