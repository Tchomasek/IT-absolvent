import React, { useState } from "react";
import black from "./cats/black.jpg";
import styled from "styled-components";
import theme from "./theme";

type Props = {
  handleClick: () => void;
  value: number;
  turned: boolean;
  cat: string;
};

const MyTd = styled.td`
  width: ${theme.sizeOfCard};
  height: ${theme.sizeOfCard};
  background-image: url(${(props: Props) => props.cat});
`;

function Card(props: Props) {
  const picture = props.turned ? props.cat : black;
  //@ts-expect-error
  return <MyTd cat={picture} onClick={props.handleClick}></MyTd>;
}

export default Card;
