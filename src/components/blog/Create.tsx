import { ArticleContext } from "./PostApp";
import { Helmet } from "react-helmet";
import React, { useContext, useState } from "react";
import styled from "styled-components";

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
        <title>Blog - Create new Article</title>
      </Helmet>
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <br></br>
        <Textarea
          placeholder="Enter your MD here"
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

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
`;
