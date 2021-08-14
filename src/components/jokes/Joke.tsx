import styled from "styled-components";

const JokeDiv = styled.div`
  padding: 2px;
`;

export const Joke = (props: { joke: string }) => {
  return (
    <>
      <JokeDiv>{props.joke}</JokeDiv>
    </>
  );
};
