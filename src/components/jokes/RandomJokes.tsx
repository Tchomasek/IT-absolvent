import { Category } from "./Category";
import { Helmet } from "react-helmet";
import { Joke } from "./Joke";
import { useEffect, useState } from "react";

export const RandomJokes = () => {
  const [jokes, setJokes] = useState<string[]>([]);

  useEffect(() => {
    const getJokes = async () => {
      while (jokes.length < 20) {
        await fetch("https://api.chucknorris.io/jokes/random").then(
          (response) =>
            response.json().then((data) => {
              if (jokes.includes(data.value)) {
                return;
              } else {
                setJokes([...jokes, data.value]);
                jokes.push(data.value);
              }
            })
        );
      }
    };
    getJokes();
  }, []);

  return (
    <>
      <div id="jokes">
        {jokes.map((joke, index) => {
          return <Joke key={index} joke={joke} />;
        })}
      </div>
    </>
  );
};
