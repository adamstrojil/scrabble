import React, { ReactNode } from "react";

import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #191a1a; /*  */
`;

export function BoardRowContainer({ children }: Props) {
  return <Container>{children}</Container>;
}
