import { ArticleContext } from "./PostApp";
import { ArticleState } from "./PostApp";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { URL_BASE } from "./Navbar";
import React, { useContext } from "react";

export const Overview = () => {
  const data = useContext(ArticleContext);
  const articles = data.articles;

  return (
    <>
      <h1>Overview of Blog Posts</h1>
      <Helmet>
        <title>Blog - Overview</title>
      </Helmet>
      {articles.map((article) => (
        <Link key={article.id} to={URL_BASE + "article/" + article.id}>
          {article.header}
        </Link>
      ))}
    </>
  );
};
