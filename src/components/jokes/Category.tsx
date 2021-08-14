import { Helmet } from "react-helmet";
import { Joke } from "./Joke";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Category = (props: { category: string }) => {
  const [catJokes, setCatJokes] = useState<string[]>([]);
  useEffect(() => {
    const getCatJokes = async () => {
      var counter: number = 0;
      while (catJokes.length < 5) {
        counter++;
        await fetch(
          "https://api.chucknorris.io/jokes/random?category=" + props.category
        ).then((response) =>
          response.json().then((data) => {
            if (counter > 20) {
              return;
            }
            if (catJokes.includes(data.value)) {
              return;
            } else {
              setCatJokes([...catJokes, data.value]);
              catJokes.push(data.value);
            }
          })
        );
      }
    };
    getCatJokes();
  }, []);
  return (
    <>
      <WrapDiv>
        <h2>{props.category} jokes</h2>
        <div id="jokes">
          {catJokes.map((joke, index) => {
            return <Joke key={index} joke={joke} />;
          })}
        </div>
      </WrapDiv>
      <Helmet>
        <title>Chuck Norris Jokes - {props.category}</title>
      </Helmet>
    </>
  );
};

const WrapDiv = styled.div`
  display: flex;
  flex-flow: column;
`;
