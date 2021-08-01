import { memo } from "react";
import styled from "styled-components";

type squareProps = {
  handleClick: () => void;
  value: string;
};

const MyTd = styled.td`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  &:hover {
    background-color: #d4c7c7;
  }
`;

const Square = memo((props: squareProps) => {
  return <MyTd onClick={props.handleClick}>{props.value}</MyTd>;
});

export default Square;
