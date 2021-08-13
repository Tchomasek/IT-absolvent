import { Category } from "./Category";
import { Helmet } from "react-helmet";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
      body {
        overflow: visible
      }
      `;

const getJokes = async () => {
  const jokes: string[] = [];
  while (jokes.length < 20) {
    await fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        if (jokes.includes(data.value)) {
          return;
        } else {
          jokes.push(data.value);
        }
      });
  }
  const jokesHtml: string[] = [];
  jokes.map((x) => {
    jokesHtml.push(x + "<br>");
  });
  const notNull = window.document.getElementById("jokes")!;
  notNull.innerHTML = String(jokesHtml).replace(/,/g, "");
  return jokesHtml;
};

const getCategories = async () => {
  let categories: any = [];
  await fetch("https://api.chucknorris.io/jokes/categories")
    .then((response) => response.json())
    .then((data) => {
      categories = data;
    });
  let catHtml: any = [];
  categories.map((x: string) => {
    catHtml.push(
      "<a href=https://api.chucknorris.io/jokes/random?category=" +
        x +
        ">" +
        x +
        "<br>"
    );
  });

  const notNull = window.document.getElementById("categories")!;
  notNull.innerHTML = String(catHtml).replace(/,/g, "");
  return catHtml;
};

export const Jokes = () => {
  getJokes();
  // getCategories();
  const categories = [
    "animal",
    "career",
    "celebrity",
    "dev",
    "explicit",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "political",
    "religion",
    "science",
    "sport",
    "travel",
  ];
  return (
    <>
      <Helmet>
        <title>Chuck Norris Jokes</title>
      </Helmet>
      <GlobalStyle />
      <div id="jokes"></div>
      <div id="categories"></div>
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
