import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  isDragging: boolean;
};

const FieldBox = styled.div`
  flex: 1 1 6%;
  margin: 5px;
  background: #262828;
  display: flex;
  font-size: 4vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: ${({ isDragging }: Props) => (isDragging ? "0.2" : "1")};
  min-width: 20wv;
  &:after {
    content: "";
    float: left;
    padding-bottom: 100%;
  }
`;

export const Field = React.forwardRef(
  ({ children, isDragging }: Props, ref: any) => {
    return (
      <FieldBox ref={ref} isDragging={isDragging}>
        {children}
      </FieldBox>
    );
  }
);
