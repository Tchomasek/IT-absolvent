import { memo } from "react";
import styled from "styled-components";
import theme from "./theme";

type squareProps = {
  handleClick: () => void;
  value: string;
};

const MyTd = styled.td`
  width: ${theme.widthOfCell};
  height: ${theme.heightOfCell};
  border: 1px solid black;
  &:hover {
    background-color: ${theme.hoverColor};
  }
`;

const Square = memo((props: squareProps) => {
  return <MyTd onClick={props.handleClick}>{props.value}</MyTd>;
});

export default Square;
