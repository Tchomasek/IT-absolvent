import { Helmet } from "react-helmet";
import { Navbar } from "./Navbar";
import { init_state } from "./init_state";
import { useLocalStorage } from "./UseLocalStorage";
import React from "react";
import styled from "styled-components";

export type ArticleState = {
  id: number;
  header: string;
  text: string;
};
export type ArticleContextState = {
  articles: ArticleState[];
  addNewArticle: (id: number, header: string, text: string) => void;
};

export const ArticleContext = React.createContext<ArticleContextState>(
  null as any
);

export const BlogApp = () => {
  const [articles, setArticle] = useLocalStorage(
    "articles",
    init_state as ArticleState[]
  );

  const addNewArticle = (newId: number, newHeader: string, newText: string) => {
    const newArticle: ArticleState = {
      id: newId,
      header: newHeader,
      text: newText,
    };
    setArticle((prevState) => [newArticle, ...prevState]);
  };
  return (
    <ArticleContext.Provider value={{ articles, addNewArticle }}>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <DivWrapper>
        <DivHeaderWrapper>
          <Navbar />
        </DivHeaderWrapper>
      </DivWrapper>
    </ArticleContext.Provider>
  );
};

const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DivHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
