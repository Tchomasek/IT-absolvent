import { Category } from "./Category";
import { ErrorDiv } from "./ErrorDiv";
import { Helmet } from "react-helmet";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { RandomJokes } from "./RandomJokes";
import { URL_CATEGORIES } from "./config";
import { useEffect, useState } from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  display: flex;
`;

export const Jokes = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getJokes = async () => {
      try {
        const response = await fetch(URL_CATEGORIES);
        const responseJson = await response.json();
        setCategories(responseJson);
      } catch {
        setError(true);
      }
    };
    getJokes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Chuck Norris Jokes</title>
      </Helmet>
      {error ? (
        <ErrorDiv>Unable to fetch data from ${URL_CATEGORIES}</ErrorDiv>
      ) : null}
      <WrapperDiv>
        <Router>
          <ul>
            <li>
              <Link to={"/jokes"}>Random</Link>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={"/jokes/" + category}>{category}</Link>
              </li>
            ))}
          </ul>

          <Switch>
            <Route path={"/jokes"} exact>
              <RandomJokes />
            </Route>
            {categories.map((category, index) => (
              <Route key={index} path={"/jokes/" + category}>
                <Category category={category} />
              </Route>
            ))}
          </Switch>
        </Router>
      </WrapperDiv>
    </>
  );
};
