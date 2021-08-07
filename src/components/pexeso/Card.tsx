import backside from "./cats/backside.jpg";
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
  const picture = props.turned ? props.cat : backside;
  // i wasnt able fo figure out how to solve this ts error
  //@ts-ignore
  return <MyTd cat={picture} onClick={props.handleClick}></MyTd>;
}

export default Card;
