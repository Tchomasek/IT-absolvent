import { Category } from "./Category";
import { Helmet } from "react-helmet";
import { Joke } from "./Joke";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
      body {
        overflow: visible
      }
      `;

export const Jokes = () => {
  const [jokes, setJokes] = useState<string[]>(["Loading jokes..."]);
  const [categories, setCategories] = useState<string[]>([
    "Loading categories...",
  ]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const jokesArray: string[] = [];
      while (jokesArray.length < 20) {
        await fetch("https://api.chucknorris.io/jokes/random").then(
          (response) =>
            response.json().then((data) => {
              if (jokesArray.includes(data.value)) {
                return;
              } else {
                jokesArray.push(data.value);
              }
            })
        );
      }
      setJokes(jokesArray);
      await fetch("https://api.chucknorris.io/jokes/categories").then(
        (response) =>
          response.json().then((data) => {
            setCategories(data);
          })
      );
    };
    fetchMyAPI();
  }, []);

  return (
    <>
      <Helmet>
        <title>Chuck Norris Jokes</title>
      </Helmet>
      <GlobalStyle />
      <div id="jokes">
        {jokes.map((joke, index) => {
          return <Joke key={index} joke={joke} />;
        })}
      </div>
      <Router>
        <ul>
          {categories.map((category, index) => (
            <>
              <li>
                <Link key={index} to={"/" + category}>
                  {category}
                </Link>
              </li>
            </>
          ))}
        </ul>

        <Switch>
          {categories.map((category, index) => (
            <Route key={index} path={"/" + category}>
              <Category category={category} />
            </Route>
          ))}
        </Switch>
      </Router>
    </>
  );
};
