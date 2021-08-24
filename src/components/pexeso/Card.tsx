import backside from "./cats/backside.jpg";
import styled from "styled-components";
import theme from "./theme";

type MyTdProps = {
  cat: string;
};

const MyTd = styled.td<MyTdProps>`
  width: ${theme.sizeOfCard};
  height: ${theme.sizeOfCard};
  background-image: url(${(props) => props.cat});
  padding: 5px;
`;

type Props = {
  handleClick: () => void;
  value: number;
  turned: boolean;
  cat: string;
};

function Card(props: Props) {
  const picture = props.turned ? props.cat : backside;
  return <MyTd cat={picture} onClick={props.handleClick}></MyTd>;
}

export default Card;
