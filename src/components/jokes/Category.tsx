import { ErrorDiv } from "./ErrorDiv";
import { Helmet } from "react-helmet";
import { Joke } from "./Joke";
import { URL_CATEGORY, URL_RANDOM } from "./config";
import { useEffect, useState } from "react";
import styled from "styled-components";

const NUMBER_OF_CATEGORY_JOKES = 5;
const NUMBER_OF_ATTEMPTS = 20;

export const Category = (props: { category: string }) => {
  const [catJokes, setCatJokes] = useState<string[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCatJokes = async () => {
      try {
        const jokesTemp: string[] = [];
        let counter = 0;
        while (jokesTemp.length < NUMBER_OF_CATEGORY_JOKES) {
          counter++;
          const response = await fetch(URL_CATEGORY + props.category);
          const responseJson = await response.json();
          if (counter > NUMBER_OF_ATTEMPTS) {
            return;
          }
          if (jokesTemp.includes(responseJson.value)) {
            return;
          } else {
            jokesTemp.push(responseJson.value);
            setCatJokes([...jokesTemp]);
          }
        }
      } catch {
        setError(true);
      }
    };
    getCatJokes();
  }, []);
  return (
    <>
      <WrapDiv>
        <h2>{props.category} jokes</h2>
        {error ? (
          <ErrorDiv>
            Unable to fetch data from ${URL_CATEGORY + props.category}
          </ErrorDiv>
        ) : null}
        <div>
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
