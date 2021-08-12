import { ArticleContext } from "./PostApp";
import { Helmet } from "react-helmet";
import React, { useContext, useState } from "react";

export const Create = () => {
  const { articles, addNewArticle } = useContext(ArticleContext);
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (header === "") {
      return;
    }
    if (text === "") {
      return;
    }
    addNewArticle(articles.length, header, text);
    setHeader("");
    setText("");
  };
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Header"
          name="header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <br></br>
        <textarea
          placeholder="Text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br></br>
        <input type="submit" />
      </form>
    </>
  );
};
