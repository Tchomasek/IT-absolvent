import { Category } from "./Category";
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

  useEffect(() => {
    const getJokes = async () => {
      await fetch(URL_CATEGORIES).then((response) =>
        response.json().then((data) => {
          setCategories(data);
        })
      );
    };
    getJokes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Chuck Norris Jokes</title>
      </Helmet>
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
