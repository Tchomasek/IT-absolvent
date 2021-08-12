import { ArticleContext } from "./PostApp";
import { Helmet } from "react-helmet";
import React, { MouseEvent, useContext, useState } from "react";
import styled from "styled-components";

export const Create = () => {
  const { articles, addNewArticle } = useContext(ArticleContext);
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [headerError, setHeaderError] = useState("");
  const [textError, setTextError] = useState("");

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setHeaderError("");
    setTextError("");
    if (header.replace(/ /g, "") === "") {
      setHeaderError("Please enter a Title");
      setHeader("");
      setText("");
      if (text.replace(/ /g, "") === "") {
        setTextError("Please enter some text");
        setHeader("");
        setText("");
        return;
      }
      return;
    }
    if (text.replace(/ /g, "") === "") {
      setTextError("Please enter some text");
      setHeader("");
      setText("");
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
      <form>
        <input
          type="text"
          placeholder="Title"
          name="header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <ErrorP>{headerError}</ErrorP>
        <br></br>
        <Textarea
          placeholder="Enter your MD here"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ErrorP>{textError}</ErrorP>
        <br></br>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
`;

const ErrorP = styled.p`
  color: red;
`;
