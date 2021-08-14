import { ErrorDiv } from "./ErrorDiv";
import { Joke } from "./Joke";
import { URL_RANDOM } from "./config";
import { useEffect, useState } from "react";

export const RandomJokes = () => {
  const [jokes, setJokes] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const NUMBER_OF_RANDOM_JOKES = 20;

  useEffect(() => {
    const getJokes = async () => {
      const jokesTemp: string[] = [];
      while (jokesTemp.length < NUMBER_OF_RANDOM_JOKES) {
        try {
          const response = await fetch(URL_RANDOM);
          const responseJson = await response.json();
          if (jokes.includes(responseJson.value)) {
            return;
          } else {
            jokesTemp.push(responseJson.value);
            setJokes([...jokesTemp]);
          }
        } catch {
          setError(true);
        }
      }
    };
    getJokes();
  }, []);

  return (
    <>
      <div>
        {error ? (
          <ErrorDiv>Unable to fetch data from ${URL_RANDOM}</ErrorDiv>
        ) : null}
        {jokes.map((joke, index) => {
          return <Joke key={index} joke={joke} />;
        })}
      </div>
    </>
  );
};
